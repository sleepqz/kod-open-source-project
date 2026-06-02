import { useEffect, useState } from "react";
import type { PlayerInfo } from "../ws/useGame";
import { useLang } from "../i18n";

interface LobbyWaitProps {
  code: string;
  players: PlayerInfo[];
  myId: string | null;
}

export function LobbyWait({ code, players, myId }: LobbyWaitProps) {
  const { t } = useLang();
  const lb = t.lobby;
  const [dots, setDots] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tm = setInterval(() => setDots(d => d.length >= 3 ? "" : d + "."), 500);
    return () => clearInterval(tm);
  }, []);

  const isBotGame = players.some(p => p.isBot);

  if (isBotGame) {
    return (
      <div className="screen">
        <div style={{ width: "100%", maxWidth: "min(440px, 100%)", textAlign: "center", animation: "fadeUp 0.4s ease" }}>
          <div className="mac-lights" style={{ justifyContent: "center", marginBottom: "1.8rem" }}>
            <div className="mac-light mac-light-red" />
            <div className="mac-light mac-light-yellow" />
            <div className="mac-light mac-light-green" />
          </div>

          <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.5rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {lb.preparing}
          </div>
          <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 700, color: "var(--text)", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
            {lb.ready}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-2)", marginBottom: "2rem" }}>
            {lb.botsWaiting(players.filter(p => p.isBot).length)}
          </div>

          <div className="panel" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
            {players.map((p, i) => (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                padding: "0.52rem 0",
                borderBottom: i < players.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{ fontSize: "0.65rem", color: "var(--text-3)", minWidth: "1.2rem", fontWeight: 500 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{
                  flex: 1, fontSize: "0.85rem",
                  fontWeight: p.id === myId ? 600 : 400,
                  color: p.id === myId ? "rgba(255,255,255,0.9)" : "var(--text-2)",
                }}>
                  {p.name}
                  {p.id === myId && (
                    <span style={{ fontSize: "0.68rem", color: "var(--text-3)", marginInlineStart: "0.4rem", fontWeight: 400 }}>{lb.you}</span>
                  )}
                </span>
                <span style={{ fontSize: "0.68rem", color: p.isBot ? "var(--text-3)" : "rgba(100,220,120,0.55)" }}>
                  {p.isBot ? lb.bot : lb.connected}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "0.78rem", color: "var(--text-3)", animation: "pulse 2s ease-in-out infinite" }}>
            {lb.rulesLoading}{dots}
          </div>
        </div>
      </div>
    );
  }

  // Human multiplayer lobby (legacy)
  const MAX_PLAYERS = 6;
  const filled = players.length;
  const remaining = MAX_PLAYERS - filled;

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="screen">
      <div style={{ width: "100%", maxWidth: "min(440px, 100%)", animation: "fadeUp 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {lb.lobbyCode}
          </div>
          <div
            style={{ fontSize: "3.2rem", fontWeight: 800, color: "#fff", letterSpacing: "0.4em", cursor: "pointer", paddingInlineStart: "0.4em", userSelect: "all" }}
            onClick={copyCode}
          >
            {code}
          </div>
          <div style={{ fontSize: "0.72rem", color: copied ? "rgba(100,220,120,0.7)" : "var(--text-3)", marginTop: "0.4rem", transition: "color 0.2s" }}>
            {copied ? lb.copied : lb.clickToCopy}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            <span style={{ color: "var(--danger)" }}>{filled}</span>
            <span style={{ color: "var(--text-3)", fontWeight: 300 }}> / {MAX_PLAYERS}</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.3rem" }}>{lb.players}</div>
        </div>

        <div className="progress-bar" style={{ marginBottom: "1.5rem" }}>
          <div className="progress-fill" style={{ width: `${(filled / MAX_PLAYERS) * 100}%` }} />
        </div>

        <div className="panel" style={{ marginBottom: "1.5rem" }}>
          {Array.from({ length: MAX_PLAYERS }).map((_, i) => {
            const player = players[i];
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.65rem",
                padding: "0.52rem 0",
                borderBottom: i < MAX_PLAYERS - 1 ? "1px solid var(--border)" : "none",
                opacity: player ? 1 : 0.28,
                animation: player ? "slideIn 0.3s ease" : "none",
              }}>
                <span style={{ fontSize: "0.65rem", color: "var(--text-3)", minWidth: "1.2rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {player ? (
                  <>
                    <span style={{ flex: 1, fontSize: "0.85rem", fontWeight: player.id === myId ? 600 : 400, color: player.id === myId ? "rgba(255,255,255,0.9)" : "var(--text-2)" }}>
                      {player.name}
                      {player.id === myId && <span style={{ fontSize: "0.68rem", color: "var(--text-3)", marginInlineStart: "0.4rem" }}>{lb.you}</span>}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "rgba(100,220,120,0.55)" }}>{lb.connected}</span>
                  </>
                ) : (
                  <span style={{ flex: 1, color: "var(--text-3)", fontSize: "0.82rem" }}>
                    {i === filled ? `${lb.waitingFor(1)}${dots}` : "…"}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-3)", animation: "pulse 2s ease-in-out infinite" }}>
          {remaining > 0 ? `${lb.waitingFor(remaining)}${dots}` : `${lb.starting}${dots}`}
        </div>
      </div>
    </div>
  );
}
