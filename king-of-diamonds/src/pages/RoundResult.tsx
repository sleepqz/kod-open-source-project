import { useEffect, useState } from "react";
import type { RoundResult as RoundResultType, PlayerInfo } from "../ws/useGame";
import { useLang } from "../i18n";

interface RoundResultProps {
  result: RoundResultType;
  myId: string | null;
  players: PlayerInfo[];
}

const PLAYER_COLORS = ["#60c896","#4aa8f0","#c8d450","#f0a050","#b060e8","#e85090"];

export function RoundResult({ result, myId }: RoundResultProps) {
  const { t } = useLang();
  const rr = t.roundResult;

  const [cardsVisible, setCardsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);

  const myPick = result.picks.find(p => p.playerId === myId);
  const iWon = myPick?.isWinner ?? false;

  useEffect(() => {
    const t1 = setTimeout(() => setCardsVisible(true), 300);
    const t2 = setTimeout(() => setStatsVisible(true), 900);
    const t3 = setTimeout(() => setListVisible(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [result.round]);

  const sortedPicks = [...result.picks].sort((a, b) => {
    if (a.isWinner && !b.isWinner) return -1;
    if (!a.isWinner && b.isWinner) return 1;
    return a.distance - b.distance;
  });

  const colorMap = new Map<string, string>();
  result.picks.forEach((p, i) => colorMap.set(p.playerId, PLAYER_COLORS[i % PLAYER_COLORS.length]));

  const playerLifeMap = new Map<string, number>();
  const playerEliminatedMap = new Map<string, boolean>();
  result.players.forEach(p => { playerLifeMap.set(p.id, p.lives); playerEliminatedMap.set(p.id, p.eliminated); });

  return (
    <div style={{ minHeight: "100svh", background: "var(--bg)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Header */}
      <div style={{
        padding: "0.85rem 1.2rem", borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(16px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div className="mac-lights">
            <div className="mac-light mac-light-red" />
            <div className="mac-light mac-light-yellow" />
            <div className="mac-light mac-light-green" />
          </div>
          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-3)" }}>
            {t.game.round} {result.round}
          </span>
        </div>
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: iWon ? "rgba(96,200,150,0.9)" : "rgba(232,100,100,0.9)" }}>
          {iWon ? rr.survived : rr.lifeLost}
        </div>
      </div>

      {/* Player cards */}
      <div style={{ padding: "1.6rem 1rem 1.4rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {sortedPicks.map((pick, idx) => {
            const color = colorMap.get(pick.playerId) ?? "#888";
            const isMe = pick.playerId === myId;
            const isWinner = pick.isWinner;
            const lives = playerLifeMap.get(pick.playerId) ?? 0;
            const eliminated = playerEliminatedMap.get(pick.playerId) ?? false;
            return (
              <div key={pick.playerId} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0) scale(1)" : "translateY(-18px) scale(0.88)",
                transition: `opacity 0.45s ease ${idx * 0.07}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${idx * 0.07}s`,
                minWidth: 58, padding: "0.7rem 0.4rem", borderRadius: 12,
                background: isWinner ? `${color}0d` : "transparent",
                border: `1px solid ${isWinner ? color + "30" : "transparent"}`,
              }}>
                <div style={{ fontSize: "0.58rem", fontWeight: 700, color: isWinner ? color : "transparent", height: 13 }}>
                  {isWinner ? rr.victory : "·"}
                </div>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: isWinner ? `${color}18` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${isWinner ? color : eliminated ? "rgba(255,255,255,0.08)" : color + "50"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", fontWeight: 800,
                  color: isWinner ? color : eliminated ? "rgba(255,255,255,0.16)" : color + "cc",
                  boxShadow: isWinner ? `0 0 20px ${color}40` : "none",
                  filter: eliminated ? "grayscale(1)" : "none",
                  opacity: eliminated ? 0.3 : 1,
                  animation: isWinner ? "winnerGlow 2s ease-in-out infinite" : "none",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {pick.pick}
                </div>
                <div style={{ fontSize: "0.63rem", fontWeight: isMe ? 600 : 400, color: isMe ? "rgba(255,200,200,0.9)" : "var(--text-2)", textAlign: "center", maxWidth: 68, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {pick.playerName}
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: eliminated ? "rgba(232,80,80,0.35)" : isWinner ? color : "rgba(232,80,80,0.78)", textDecoration: eliminated ? "line-through" : "none", fontVariantNumeric: "tabular-nums" }}>
                  {eliminated ? "✕" : lives}
                </div>
                <div style={{ fontSize: "0.58rem", color: "var(--text-3)" }}>Δ {pick.distance}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        padding: "1.1rem 1.2rem",
        display: "flex", justifyContent: "center", gap: "clamp(1.5rem, 5vw, 3rem)",
        borderBottom: "1px solid var(--border)",
        opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        {[
          { label: rr.average, value: result.average },
          { label: rr.target, value: result.target, highlight: true },
          { label: rr.myChoice, value: myPick?.pick ?? "—", win: iWon },
        ].map(({ label, value, highlight, win }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.66rem", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.3rem" }}>{label}</div>
            <div style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700,
              color: highlight ? "rgba(232,80,80,0.9)" : win ? "rgba(96,200,150,0.9)" : "var(--text-2)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Picks list */}
      <div style={{ padding: "0.9rem 1.2rem", opacity: listVisible ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
        <div style={{ fontSize: "0.66rem", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.75rem" }}>
          {rr.rankByDistance}
        </div>
        {sortedPicks.map((pick, i) => {
          const color = colorMap.get(pick.playerId) ?? "#888";
          const isMe = pick.playerId === myId;
          return (
            <div key={pick.playerId} style={{
              display: "flex", alignItems: "center", gap: "0.55rem",
              padding: "0.45rem 0.7rem", marginBottom: 3, borderRadius: 7,
              background: pick.isWinner ? `${color}0a` : "rgba(255,255,255,0.02)",
              borderInlineStart: `2px solid ${pick.isWinner ? color + "70" : "transparent"}`,
              animation: `slideIn ${0.05 + i * 0.05}s ease`,
            }}>
              <span style={{ fontSize: "0.63rem", color: pick.isWinner ? color : "var(--text-3)", minWidth: "1.1rem", fontWeight: 600 }}>
                {pick.isWinner ? "★" : String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ flex: 1, fontSize: "0.85rem", fontWeight: isMe ? 600 : 400, color: isMe ? "rgba(255,200,200,0.9)" : "var(--text)" }}>
                {pick.playerName}
                {isMe && <span style={{ fontSize: "0.63rem", color: "var(--text-3)", marginInlineStart: "0.35rem" }}>{rr.you}</span>}
              </span>
              <span style={{ fontSize: "1.15rem", fontWeight: 700, color: pick.isWinner ? color : "var(--text-2)", minWidth: "2rem", textAlign: "end", fontVariantNumeric: "tabular-nums" }}>
                {pick.pick}
              </span>
              <span style={{ fontSize: "0.63rem", color: "var(--text-3)", minWidth: "2.4rem", textAlign: "end" }}>Δ {pick.distance}</span>
            </div>
          );
        })}
      </div>

      <div style={{
        textAlign: "center", padding: "0.9rem 1.2rem 2.5rem",
        fontSize: "0.72rem", color: "var(--text-3)",
        animation: "pulse 2.5s ease-in-out infinite",
        opacity: listVisible ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
      }}>
        {rr.nextRound}
      </div>
    </div>
  );
}
