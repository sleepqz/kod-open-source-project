import { useState, useEffect, useRef, useCallback } from "react";

export type Screen =
  | "home"
  | "bot-lobby"
  | "lobby-wait"
  | "rules"
  | "game"
  | "round-result"
  | "game-over";

export interface PlayerInfo {
  id: string;
  name: string;
  lives: number;
  isBot: boolean;
  eliminated: boolean;
}

export interface PickResult {
  playerId: string;
  playerName: string;
  pick: number;
  isWinner: boolean;
  distance: number;
}

export interface RoundResult {
  round: number;
  picks: PickResult[];
  target: number;
  average: number;
  winnerIds: string[];
  players: PlayerInfo[];
}

export interface GameOverInfo {
  winnerId: string | null;
  winnerName: string;
  players: PlayerInfo[];
}

export interface GameState {
  screen: Screen;
  connected: boolean;
  lobbyCode: string | null;
  playerId: string | null;
  players: PlayerInfo[];
  round: number;
  timerSeconds: number;
  pickProgress: { submitted: number; total: number } | null;
  roundResult: RoundResult | null;
  roundLost: boolean;
  gameOver: GameOverInfo | null;
  error: string | null;
}

function getWsUrl(): string {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${location.host}/api/ws`;
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    screen: "home",
    connected: false,
    lobbyCode: null,
    playerId: null,
    players: [],
    round: 0,
    timerSeconds: 45,
    pickProgress: null,
    roundResult: null,
    roundLost: false,
    gameOver: null,
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerIdRef = useRef<string | null>(null);

  function patch(partial: Partial<GameState>) {
    setState(s => ({ ...s, ...partial }));
  }

  const connect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState <= 1) return;

    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;

    ws.onopen = () => patch({ connected: true, error: null });

    ws.onclose = () => {
      patch({ connected: false });
      reconnectTimer.current = setTimeout(connect, 2000);
    };

    ws.onerror = () => patch({ error: "Erreur de connexion. Nouvelle tentative..." });

    ws.onmessage = (ev) => {
      let msg: Record<string, unknown>;
      try { msg = JSON.parse(ev.data); } catch { return; }

      const { type } = msg;

      if (type === "LOBBY_CREATED" || type === "LOBBY_JOINED") {
        const pid = msg.playerId as string;
        playerIdRef.current = pid;
        patch({
          screen: "lobby-wait",
          lobbyCode: msg.code as string,
          playerId: pid,
          players: (msg.players as PlayerInfo[]) ?? [],
          error: null,
        });

      } else if (type === "LOBBY_UPDATED") {
        patch({ players: (msg.players as PlayerInfo[]) ?? [] });

      } else if (type === "GAME_STARTING") {
        patch({ screen: "rules", error: null });

      } else if (type === "ROUND_START") {
        patch({
          screen: "game",
          round: msg.round as number,
          timerSeconds: (msg.timerSeconds as number) ?? 45,
          pickProgress: null,
          roundResult: null,
          roundLost: false,
          error: null,
        });

      } else if (type === "PICK_PROGRESS") {
        patch({
          pickProgress: {
            submitted: msg.submitted as number,
            total: msg.total as number,
          },
        });

      } else if (type === "ROUND_RESULT") {
        const result: RoundResult = {
          round: msg.round as number,
          picks: msg.picks as PickResult[],
          target: msg.target as number,
          average: msg.average as number,
          winnerIds: msg.winnerIds as string[],
          players: msg.players as PlayerInfo[],
        };
        const pid = playerIdRef.current;
        const roundLost = pid ? !result.winnerIds.includes(pid) : false;
        patch({
          screen: "round-result",
          roundResult: result,
          roundLost,
          players: result.players,
        });

      } else if (type === "GAME_OVER") {
        patch({
          screen: "game-over",
          gameOver: {
            winnerId: msg.winnerId as string | null,
            winnerName: msg.winnerName as string,
            players: msg.players as PlayerInfo[],
          },
          players: msg.players as PlayerInfo[],
          roundLost: false,
        });

      } else if (type === "ERROR") {
        patch({ error: msg.message as string });
      }
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  function send(msg: object) {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }

  const actions = {
    goHome: () => {
      playerIdRef.current = null;
      patch({ screen: "home", error: null, lobbyCode: null, playerId: null, players: [], roundLost: false });
    },
    goBotLobby: () => patch({ screen: "bot-lobby", error: null }),
    createBotLobby: (opts: {
      nickname: string;
      botCount: number;
      difficulty: "easy" | "medium" | "hard";
      deathThreshold: number;
    }) => send({ type: "CREATE_BOT_LOBBY", ...opts }),
    submitPick: (pick: number) => send({ type: "SUBMIT_PICK", pick }),
  };

  return { state, actions };
}
