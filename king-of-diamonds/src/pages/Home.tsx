import { useEffect, useState } from "react";
import { VideoBg } from "../components/VideoBg";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLang } from "../i18n";

interface HomeProps {
  onBotLobby: () => void;
  connected: boolean;
}

const GITHUB_URL = "https://github.com/sleepqz";

export function Home({ onBotLobby, connected }: HomeProps) {
  const { t } = useLang();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 450);
    const t3 = setTimeout(() => setPhase(3), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      position: "relative", minHeight: "100svh",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <VideoBg />

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 10, padding: "14px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Traffic lights */}
        <div className="mac-lights">
          <div className="mac-light mac-light-red" />
          <div className="mac-light mac-light-yellow" />
          <div className="mac-light mac-light-green" />
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LanguageSelector />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vh, 5rem)",
        maxWidth: "100%",
      }}>
        {/* Title block */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "clamp(2rem, 5vh, 3.5rem)",
        }}>
          <div style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "rgba(255,255,255,0.96)",
            lineHeight: 1,
            maxWidth: "clamp(340px, 55vw, 760px)",
            marginBottom: "0.7rem",
          }}>
            {t.home.title}
          </div>
          <div style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.38)",
          }}>
            {t.home.subtitle}
          </div>
        </div>

        {/* Play button */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
        }}>
          <button
            className="btn btn-primary"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              fontWeight: 600,
              padding: "0.78rem clamp(1.4rem, 3vw, 2.2rem)",
              minWidth: "clamp(180px, 22vw, 240px)",
            }}
            onClick={onBotLobby}
            disabled={!connected}
          >
            {connected ? t.home.play : t.home.connecting}
          </button>
        </div>

        {/* Archive notice */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 7, padding: "0.48rem 0.8rem",
            fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
            color: "rgba(255,255,255,0.28)",
          }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="rgba(255,255,255,0.28)">
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <span>
              {t.home.archivedNotice}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.48)", textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.18)", paddingBottom: 1,
                  transition: "color 0.12s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
              >
                {t.home.viewGithub}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "0.9rem clamp(1.5rem, 6vw, 7rem)",
        fontSize: "0.68rem", color: "rgba(255,255,255,0.14)",
      }}>
        © {new Date().getFullYear()} {t.home.copyright}
      </div>
    </div>
  );
}
