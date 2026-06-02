import { useState, useEffect, useRef } from "react";
import type { PlayerInfo } from "../ws/useGame";
import { useLang } from "../i18n";

interface GameProps {
  round: number;
  timerSeconds: number;
  players?: PlayerInfo[];
  myId: string | null;
  pickProgress: { submitted: number; total: number } | null;
  onSubmit: (pick: number) => void;
  onLeave: () => void;
  spectating: boolean;
}

export function Game({ round, timerSeconds, players = [], myId, pickProgress, onSubmit, onLeave, spectating }: GameProps) {
  const { t } = useLang();
  const g = t.game;

  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [tabletVisible, setTabletVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const lockedRef = useRef(false);

  const me = players.find(p => p.id === myId);
  const isEliminated = me?.eliminated ?? false;
  const canPlay = !isEliminated && !spectating;

  useEffect(() => {
    setSelected(null);
    setLocked(false);
    lockedRef.current = false;
    setTimeLeft(timerSeconds);
    setTabletVisible(false);
    const tm = setTimeout(() => setTabletVisible(true), 400);
    return () => clearTimeout(tm);
  }, [round, timerSeconds]);

  useEffect(() => {
    if (!canPlay) return;
    const tm = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(tm);
          if (!lockedRef.current) {
            setSelected(33); setLocked(true); lockedRef.current = true;
            onSubmit(33);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tm);
  }, [round, canPlay]);

  const timerPct = (timeLeft / timerSeconds) * 100;
  const urgency = timeLeft <= 10 ? "danger" : timeLeft <= Math.floor(timerSeconds * 0.4) ? "amber" : "normal";
  const timerColor =
    urgency === "danger" ? "#e83535" :
    urgency === "amber"  ? "#f0b429" :
    "rgba(255,255,255,0.7)";

  const alivePlayers = players.filter(p => !p.eliminated);
  const submitted = pickProgress?.submitted ?? 0;
  const total = pickProgress?.total ?? alivePlayers.length;
  const speedLabel = timerSeconds < 35 ? (timerSeconds < 25 ? g.critical : g.sped) : null;

  return (
    <div style={{
      minHeight: "100svh", background: "var(--bg)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{
        padding: "0.75rem 1.2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(16px)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div className="mac-lights">
            <div className="mac-light mac-light-red" />
            <div className="mac-light mac-light-yellow" />
            <div className="mac-light mac-light-green" />
          </div>
          <div style={{ width: 1, height: 12, background: "var(--border)" }} />
          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--text-2)" }}>
            {g.round} <span style={{ color: "var(--text)", fontWeight: 600 }}>{round}</span>
          </div>
          {speedLabel && (
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: urgency === "danger" ? "rgba(255,130,130,0.8)" : "rgba(240,180,41,0.85)", animation: "pulse 1s ease-in-out infinite" }}>
              {speedLabel}
            </div>
          )}
          {spectating && (
            <div style={{
              fontSize: "0.65rem", fontWeight: 600, color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.06em", padding: "2px 7px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
            }}>
              {g.spectatorMode.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{
          fontSize: "1.8rem", fontWeight: 700, color: timerColor,
          minWidth: "2.6rem", textAlign: "end",
          transition: "color 0.3s",
          animation: timeLeft <= 10 ? "pulse 0.5s ease-in-out infinite" : "none",
          fontVariantNumeric: "tabular-nums",
        }}>
          {String(timeLeft).padStart(2, "0")}
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{
          height: "100%", width: `${timerPct}%`,
          background: timerColor, transition: "width 1s linear, background 0.3s",
          boxShadow: `0 0 6px ${timerColor}`,
        }} />
      </div>

      {/* Players strip */}
      <div style={{
        padding: "0.4rem 1.2rem",
        display: "flex", gap: "0.8rem", flexWrap: "wrap",
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.7)", backdropFilter: "blur(12px)",
        flexShrink: 0,
      }}>
        {players.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "0.28rem", opacity: p.eliminated ? 0.2 : 1, transition: "opacity 0.3s" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: p.id === myId ? 600 : 400, color: p.id === myId ? "rgba(255,255,255,0.9)" : "var(--text-2)", textDecoration: p.eliminated ? "line-through" : "none" }}>
              {p.name}
            </span>
            <span style={{ fontSize: "0.63rem", color: "var(--text-3)", fontVariantNumeric: "tabular-nums" }}>
              {p.eliminated ? "✕" : p.lives}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        {spectating ? (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease", maxWidth: 320 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--text-2)", marginBottom: "1.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {g.spectatorMode}
            </div>
            <div style={{ fontSize: "0.88rem", color: "var(--text-2)", marginBottom: "2rem", lineHeight: 1.6 }}>
              {g.spectatorDesc}
            </div>
            {pickProgress && submitted > 0 && (
              <div style={{ marginBottom: "1.8rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-3)", marginBottom: "0.5rem" }}>
                  {g.submitted(submitted, total)}
                </div>
                <div className="progress-bar" style={{ width: 200, margin: "0 auto" }}>
                  <div className="progress-fill" style={{ width: `${(submitted / total) * 100}%` }} />
                </div>
              </div>
            )}
            <button className="btn" onClick={onLeave}>{g.leave}</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "0.73rem", color: "var(--text-3)", marginBottom: "1rem", textAlign: "center" }}>
              {g.choose}
            </div>

            <div className="panel" style={{
              width: "100%", maxWidth: "min(460px, 100%)", padding: "1rem",
              opacity: tabletVisible ? 1 : 0, transition: "opacity 0.25s",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: "0.75rem", paddingBottom: "0.65rem", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ fontSize: "0.73rem", fontWeight: 500, color: "var(--text-3)" }}>{g.yourChoice}</div>
                <div style={{
                  fontSize: "1.7rem", fontWeight: 700,
                  color: selected !== null ? "rgba(255,255,255,0.9)" : "var(--text-3)",
                  transition: "color 0.2s", minWidth: "2.2rem", textAlign: "end",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {selected !== null ? selected : "—"}
                </div>
              </div>

              <div className="num-grid" style={{ marginBottom: "0.9rem" }}>
                {Array.from({ length: 101 }, (_, i) => (
                  <div
                    key={i}
                    className={`num-cell${selected === i ? " selected" : ""}`}
                    onClick={() => !locked && canPlay && setSelected(i)}
                    style={{
                      opacity: locked && selected !== i ? 0.1 : 1,
                      cursor: locked ? "default" : "pointer",
                      pointerEvents: locked ? "none" : "auto",
                      transition: "opacity 0.15s",
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>

              <button
                className={`btn${locked ? "" : " btn-primary"}`}
                style={{
                  width: "100%", fontSize: "0.9rem", fontWeight: 600,
                  opacity: selected === null && !locked ? 0.3 : 1,
                  cursor: selected === null || locked ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (locked || selected === null || !canPlay) return;
                  setLocked(true); lockedRef.current = true;
                  onSubmit(selected);
                }}
                disabled={selected === null || locked}
              >
                {locked ? g.locked : g.lock}
              </button>
            </div>

            {pickProgress && submitted > 0 && (
              <div style={{ marginTop: "1rem", textAlign: "center", animation: "fadeIn 0.3s ease" }}>
                <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginBottom: "0.4rem" }}>
                  {g.submitted(submitted, total)}
                </div>
                <div className="progress-bar" style={{ width: 160, margin: "0 auto" }}>
                  <div className="progress-fill" style={{ width: `${(submitted / total) * 100}%` }} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lives footer */}
      {me && (
        <div style={{
          padding: "0.65rem 1.2rem", borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(8,8,8,0.92)", backdropFilter: "blur(16px)", flexShrink: 0,
        }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-3)" }}>{g.lives}</div>
          <div style={{
            fontSize: "1.4rem", fontWeight: 700,
            color: me.eliminated ? "#e83535" : me.lives < -3 ? "#e83535" : "var(--text)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {me.eliminated ? g.eliminated : me.lives}
          </div>
        </div>
      )}
    </div>
  );
}
