import { useEffect, useState } from "react";
import { useLang } from "../i18n";

const LINE_META: { highlight?: boolean; danger?: boolean; big?: boolean; ellipsis?: boolean }[] = [
  {},             // 0 welcome
  {},             // 1 pure intellect
  {},             // 2 choose number
  {},             // 3 0 to 100
  {},             // 4 target calculated
  { highlight: true }, // 5 ⅔ formula
  {},             // 6 closest wins
  {},             // 7 losers lose
  { danger: true }, // 8 elimination
  {},             // 9 last survivor
  { ellipsis: true }, // 10 ...
  {},             // 11 don't think correct
  { highlight: true }, // 12 think others
  { big: true },  // 13 game begins
];

const DELAYS = [300, 1100, 2100, 3100, 4200, 5000, 6200, 7200, 8200, 9400, 10600, 11400, 12600, 14200];

export function Rules() {
  const { t } = useLang();
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    setVisible([]);
    const timers = DELAYS.map((delay, i) =>
      setTimeout(() => setVisible(v => [...v, i]), delay)
    );
    return () => timers.forEach(tm => clearTimeout(tm));
  }, [t]); // re-run when language changes

  return (
    <div style={{
      minHeight: "100svh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflowY: "auto",
    }}>
      <div className="mac-lights" style={{ position: "fixed", top: 18, left: 18 }}>
        <div className="mac-light mac-light-red" />
        <div className="mac-light mac-light-yellow" />
        <div className="mac-light mac-light-green" />
      </div>

      <div style={{
        maxWidth: "min(560px, 100% - 3rem)", width: "100%",
        padding: "4rem 0",
        display: "flex", flexDirection: "column", gap: "0.9rem",
      }}>
        {t.rules.map((text, i) => {
          const meta = LINE_META[i] ?? {};
          const isVisible = visible.includes(i);
          return (
            <div key={i} style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              fontSize: meta.big ? "clamp(1.4rem, 4vw, 1.7rem)" : "clamp(0.9rem, 1.5vw, 1rem)",
              fontWeight: meta.big ? 700 : meta.highlight ? 600 : 400,
              color: meta.highlight ? "#fff" : meta.danger ? "rgba(232,100,100,0.85)" : meta.big ? "#fff" : "var(--text-2)",
              paddingInlineStart: (meta.highlight || meta.danger) ? "1rem" : 0,
              borderInlineStart: meta.highlight
                ? "2px solid rgba(255,255,255,0.28)"
                : meta.danger
                ? "2px solid rgba(232,53,53,0.45)"
                : "none",
              marginTop: (meta.big || meta.ellipsis) ? "1.2rem" : 0,
              lineHeight: 1.5,
              letterSpacing: meta.big ? "-0.025em" : 0,
            }}>
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
