import { useEffect, useState } from "react";
import type { GameOverInfo } from "../ws/useGame";
import { useLang } from "../i18n";

interface GameOverProps {
  info: GameOverInfo;
  myId: string | null;
  onRestart: () => void;
}

const PLAYER_COLORS = ["#60c896","#4aa8f0","#c8d450","#f0a050","#b060e8","#e85090"];

export function GameOver({ info, myId, onRestart }: GameOverProps) {
  const { t } = useLang();
  const go = t.gameOver;
  const [phase, setPhase] = useState(0);
  const iWon = info.winnerId === myId;
  const sorted = [...info.players].sort((a, b) => b.lives - a.lives);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 250);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      minHeight: "100svh", background: "var(--bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "clamp(1.5rem, 4vh, 2.5rem) clamp(1rem, 4vw, 2rem)",
      overflowY: "auto",
    }}>
      <div className="mac-lights" style={{ position: "fixed", top: 18, left: 18 }}>
        <div className="mac-light mac-light-red" />
        <div className="mac-light mac-light-yellow" />
        <div className="mac-light mac-light-green" />
      </div>

      {/* Big result */}
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vh, 3.5rem)" }}>
        <div style={{
          fontSize: "clamp(3.5rem, 10vw, 6rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em",
          color: iWon ? "rgba(96,200,150,0.95)" : "rgba(232,80,80,0.9)",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1)" : "scale(0.75)",
          transition: "opacity 0.6s cubic-bezier(0.34,1.4,0.64,1), transform 0.6s cubic-bezier(0.34,1.4,0.64,1)",
          marginBottom: "0.7rem",
        }}>
          {iWon ? go.won : go.died}
        </div>
        <div style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-2)", opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          {iWon ? go.wonDesc : go.lostDesc(info.winnerName)}
        </div>
      </div>

      {/* Player axis */}
      <div style={{ width: "100%", maxWidth: "min(560px, 100%)", marginBottom: "clamp(1.5rem, 4vh, 2.5rem)", opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", gap: "0.2rem" }}>
          {sorted.map((player, i) => {
            const color = PLAYER_COLORS[i % PLAYER_COLORS.length];
            const isWinner = player.id === info.winnerId;
            const isMe = player.id === myId;
            return (
              <div key={player.id} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(-18px)",
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.07}s`,
              }}>
                <div style={{ fontSize: "0.58rem", fontWeight: 600, color: isWinner ? color : "transparent", height: 13, animation: isWinner ? "pulse 2s infinite" : "none" }}>
                  {isWinner ? go.victory : ""}
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: isWinner ? `${color}14` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${isWinner ? color : player.eliminated ? "rgba(232,53,53,0.2)" : color + "50"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 700,
                  color: isWinner ? color : player.eliminated ? "rgba(232,80,80,0.32)" : color + "90",
                  boxShadow: isWinner ? `0 0 16px ${color}40` : "none",
                  animation: isWinner ? "winnerGlow 2s ease-in-out infinite" : "none",
                  filter: player.eliminated && !isWinner ? "grayscale(0.8)" : "none",
                }}>
                  {player.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: "0.58rem", fontWeight: isMe ? 600 : 400, color: isMe ? "rgba(255,200,200,0.9)" : "var(--text-2)", textAlign: "center", maxWidth: 56, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {player.name}
                </div>
                <div style={{ width: 1, height: 10, background: isWinner ? color : "rgba(255,255,255,0.08)" }} />
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 5%, rgba(255,255,255,0.1) 95%, transparent)", width: phase >= 2 ? "100%" : "0%", transition: "width 0.55s ease 0.2s" }} />

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {sorted.map((player, i) => {
            const color = PLAYER_COLORS[i % PLAYER_COLORS.length];
            const isWinner = player.id === info.winnerId;
            return (
              <div key={player.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ width: 1, height: 10, background: isWinner ? color : "rgba(255,255,255,0.08)" }} />
                <div style={{
                  fontSize: "1.4rem", fontWeight: 700,
                  color: isWinner ? color : player.eliminated ? "rgba(232,80,80,0.28)" : "rgba(232,80,80,0.62)",
                  textDecoration: player.eliminated && !isWinner ? "line-through" : "none",
                  opacity: phase >= 2 ? 1 : 0, transition: `opacity 0.4s ease ${0.18 + i * 0.06}s`,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {player.eliminated && !isWinner ? "✕" : player.lives}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theory note */}
      <div style={{
        width: "100%", maxWidth: "min(480px, 100%)",
        opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div className="panel" style={{ marginBottom: "1.1rem" }}>
          <div style={{ fontSize: "0.66rem", fontWeight: 600, color: "var(--text-3)", marginBottom: "0.55rem", letterSpacing: "0.03em" }}>
            {go.nashNote}
          </div>
          <div style={{ fontSize: "0.83rem", fontWeight: 400, color: "var(--text-2)", lineHeight: 1.7 }}>
            {go.nashText("0", "33–36", "22–24")}
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", fontSize: "0.92rem", fontWeight: 600 }} onClick={onRestart}>
          {go.backToMenu}
        </button>
      </div>
    </div>
  );
}
