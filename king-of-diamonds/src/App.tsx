import { useEffect, useRef, useState } from "react";
import { useGame } from "./ws/useGame";
import { useLang } from "./i18n";
import { Home } from "./pages/Home";
import { BotLobby } from "./pages/BotLobby";
import { LobbyWait } from "./pages/LobbyWait";
import { Rules } from "./pages/Rules";
import { Game } from "./pages/Game";
import { RoundResult } from "./pages/RoundResult";
import { GameOver } from "./pages/GameOver";

export default function App() {
  const { state, actions } = useGame();
  const { t } = useLang();
  const {
    screen, connected, lobbyCode, playerId, players,
    round, timerSeconds, pickProgress, roundResult,
    roundLost, gameOver, error,
  } = state;

  const [wastedVisible, setWastedVisible] = useState(false);
  const [wastedPhase, setWastedPhase] = useState(0);
  const [spectating, setSpectating] = useState(false);
  const eliminatedRef = useRef(false);

  const me = players.find(p => p.id === playerId);
  const isEliminated = Boolean(me?.eliminated);

  useEffect(() => {
    if (isEliminated && !eliminatedRef.current) {
      eliminatedRef.current = true;
      setWastedVisible(true);
      setWastedPhase(1);
      const tm = setTimeout(() => setWastedPhase(2), 1400);
      return () => clearTimeout(tm);
    }
  }, [isEliminated]);

  useEffect(() => {
    if (screen === "home" || screen === "game-over") {
      eliminatedRef.current = false;
      setWastedVisible(false);
      setWastedPhase(0);
      setSpectating(false);
    }
  }, [screen]);

  const screens = ["home","bot-lobby","lobby-wait","rules","game","round-result","game-over"];

  return (
    <>
      {roundLost && (screen === "round-result" || screen === "game") && (
        <div className="heartbeat-aura" />
      )}

      {screen === "home" && (
        <Home onBotLobby={actions.goBotLobby} connected={connected} />
      )}
      {screen === "bot-lobby" && (
        <BotLobby onBack={actions.goHome} onStart={actions.createBotLobby} error={error} />
      )}
      {screen === "lobby-wait" && lobbyCode && (
        <LobbyWait code={lobbyCode} players={players} myId={playerId} />
      )}
      {screen === "rules" && <Rules />}
      {screen === "game" && (
        <Game
          round={round}
          timerSeconds={timerSeconds}
          players={players}
          myId={playerId}
          pickProgress={pickProgress}
          onSubmit={actions.submitPick}
          onLeave={actions.goHome}
          spectating={spectating}
        />
      )}
      {screen === "round-result" && roundResult && (
        <RoundResult result={roundResult} myId={playerId} players={players} />
      )}
      {screen === "game-over" && gameOver && (
        <GameOver info={gameOver} myId={playerId} onRestart={actions.goHome} />
      )}

      {!screens.includes(screen) && (
        <div className="screen">
          <div style={{ fontSize: "0.82rem", color: "var(--text-3)" }}>
            {connected ? "…" : t.home.connecting}
          </div>
        </div>
      )}

      {/* ── WASTED OVERLAY ─────────────────────────────────────────────────── */}
      {wastedVisible && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          backgroundColor: "rgba(6,0,0,0.95)",
          animation: "wastedBg 0.8s ease forwards",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            background: "linear-gradient(to bottom, rgba(160,0,0,0.32) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {wastedPhase >= 1 && (
            <div style={{
              fontSize: "clamp(3.5rem, 14vw, 8rem)",
              fontWeight: 800,
              color: "#cc1010",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              animation: "wastedReveal 0.9s cubic-bezier(0.34,1.1,0.64,1) forwards",
              textShadow: "0 0 30px rgba(220,10,10,0.9), 0 0 80px rgba(200,0,0,0.35)",
              userSelect: "none",
              marginBottom: "0.4rem",
            }}>
              {t.wasted.title}
            </div>
          )}
          {wastedPhase >= 1 && (
            <div style={{
              fontSize: "0.82rem", fontWeight: 400,
              color: "rgba(255,255,255,0.25)",
              marginBottom: "3.5rem",
              animation: "wastedButtons 0.5s ease 0.6s both",
            }}>
              {t.wasted.subtitle}
            </div>
          )}
          {wastedPhase >= 2 && (
            <div style={{
              display: "flex", flexDirection: "column", gap: "0.65rem",
              width: "100%", maxWidth: 240,
              animation: "wastedButtons 0.5s ease forwards",
            }}>
              <button className="btn" style={{ width: "100%", fontWeight: 600 }}
                onClick={() => { setWastedVisible(false); setSpectating(true); }}>
                {t.wasted.spectate}
              </button>
              <button className="btn btn-danger" style={{ width: "100%", fontWeight: 600 }}
                onClick={() => actions.goHome()}>
                {t.wasted.quit}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
