export type PlayerType = "human" | "ai";

export type AIStrategy = "random" | "anchor" | "iterated" | "adaptive" | "extreme";

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  strategy?: AIStrategy;
  lives: number;
  maxLives: number;
  eliminated: boolean;
  color: string;
  title: string;
}

export interface RoundPick {
  playerId: string;
  pick: number;
  isWinner: boolean;
  distanceFromTarget: number;
}

export interface RoundResult {
  round: number;
  picks: RoundPick[];
  average: number;
  target: number;
  winnerIds: string[];
  eliminatedThisRound: string[];
}

export type GamePhase =
  | "menu"
  | "picking"
  | "reveal"
  | "gameover";

export interface GameState {
  phase: GamePhase;
  round: number;
  players: Player[];
  humanPick: number | null;
  currentRoundResult: RoundResult | null;
  history: RoundResult[];
  winnerId: string | null;
}
