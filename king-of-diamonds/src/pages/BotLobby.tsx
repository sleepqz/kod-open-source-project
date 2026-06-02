import { useState } from "react";
import { useLang } from "../i18n";
import { LanguageSelector } from "../components/LanguageSelector";

interface BotLobbyProps {
  onBack: () => void;
  onStart: (opts: {
    nickname: string;
    botCount: number;
    difficulty: "easy" | "medium" | "hard";
    deathThreshold: number;
  }) => void;
  error: string | null;
}

const BOT_NAMES_PREVIEW: Record<number, string[]> = {
  1: ["Nagase"],
  2: ["Nagase", "Banda"],
  3: ["Nagase", "Banda", "Chinchilla"],
  4: ["Nagase", "Banda", "Chinchilla", "Kyuma"],
  5: ["Nagase", "Banda", "Chinchilla", "Kyuma", "Arisu"],
};

const LIVES_VALUES = [-3, -5, -10, -20];

export function BotLobby({ onBack, onStart, error }: BotLobbyProps) {
  const { t } = useLang();
  const bl = t.botLobby;

  const [nickname, setNickname] = useState(bl.nicknamePlaceholder);
  const [botCount, setBotCount] = useState(5);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [deathThreshold, setDeathThreshold] = useState(-5);

  const difficultyLabels = {
    easy:   { label: bl.easy,   desc: bl.easyDesc },
    medium: { label: bl.medium, desc: bl.mediumDesc },
    hard:   { label: bl.hard,   desc: bl.hardDesc },
  };

  const livesLabels: Record<number, string> = {
    [-3]: bl.fast, [-5]: bl.standard, [-10]: bl.long, [-20]: bl.marathon,
  };

  function handleStart() {
    const name = nickname.trim() || bl.nicknamePlaceholder;
    onStart({ nickname: name, botCount, difficulty, deathThreshold });
  }

  return (
    <div style={{
      minHeight: "100svh", background: "var(--bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "clamp(1rem, 4vh, 2rem) clamp(1rem, 4vw, 2rem)",
    }}>
      {/* top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        padding: "14px 18px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        zIndex: 10,
      }}>
        <div className="mac-lights">
          <div className="mac-light mac-light-red" />
          <div className="mac-light mac-light-yellow" />
          <div className="mac-light mac-light-green" />
        </div>
        <LanguageSelector />
      </div>

      <div style={{
        width: "100%",
        maxWidth: "min(520px, 100%)",
        animation: "fadeUp 0.3s ease",
      }}>
        <button className="back-btn" onClick={onBack}>{bl.back}</button>

        <div style={{ marginBottom: "1.6rem" }}>
          <div style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {bl.title}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-2)" }}>{bl.desc}</div>
        </div>

        {/* Nickname */}
        <div style={{ marginBottom: "1.3rem" }}>
          <label className="label">{bl.nickname}</label>
          <input
            className="input-field"
            value={nickname}
            onChange={e => setNickname(e.target.value.slice(0, 20))}
            onKeyDown={e => e.key === "Enter" && handleStart()}
            maxLength={20}
            autoFocus
            placeholder={bl.nicknamePlaceholder}
          />
        </div>

        {/* Bot count */}
        <div style={{ marginBottom: "1.3rem" }}>
          <label className="label">{bl.botCount}</label>
          <div style={{ display: "flex", gap: 5 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setBotCount(n)} style={{
                flex: 1, height: 38,
                background: botCount === n ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${botCount === n ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 7, color: botCount === n ? "#fff" : "var(--text-2)",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.9rem", fontWeight: botCount === n ? 600 : 400,
                cursor: "pointer", transition: "all 0.12s",
              }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginTop: "0.45rem" }}>
            {BOT_NAMES_PREVIEW[botCount]?.join(", ")}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: "1.3rem" }}>
          <label className="label">{bl.difficulty}</label>
          <div style={{ display: "flex", gap: 5 }}>
            {(["easy", "medium", "hard"] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{
                flex: 1, height: 52,
                background: difficulty === d ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${difficulty === d ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 8, color: difficulty === d ? "#fff" : "var(--text-2)",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.82rem", fontWeight: difficulty === d ? 600 : 400,
                cursor: "pointer", transition: "all 0.12s",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
              }}>
                <span>{difficultyLabels[d].label}</span>
                <span style={{ fontSize: "0.63rem", color: difficulty === d ? "rgba(255,255,255,0.42)" : "var(--text-3)", fontWeight: 400 }}>
                  {difficultyLabels[d].desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lives threshold */}
        <div style={{ marginBottom: "1.8rem" }}>
          <label className="label">{bl.threshold}</label>
          <div style={{ display: "flex", gap: 5 }}>
            {LIVES_VALUES.map(v => (
              <button key={v} onClick={() => setDeathThreshold(v)} style={{
                flex: 1, height: 52,
                background: deathThreshold === v ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${deathThreshold === v ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 8, color: deathThreshold === v ? "#fff" : "var(--text-2)",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.88rem", fontWeight: deathThreshold === v ? 700 : 400,
                cursor: "pointer", transition: "all 0.12s",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                fontVariantNumeric: "tabular-nums",
              }}>
                <span>{v}</span>
                <span style={{ fontSize: "0.63rem", color: deathThreshold === v ? "rgba(255,255,255,0.4)" : "var(--text-3)", fontWeight: 400 }}>
                  {livesLabels[v]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-box" style={{ marginBottom: "1rem" }}>{error}</div>}

        <button
          className="btn btn-primary"
          style={{ width: "100%", fontSize: "0.93rem", fontWeight: 600, padding: "0.75rem" }}
          onClick={handleStart}
        >
          {bl.start}
        </button>

        <div style={{ marginTop: "0.75rem", fontSize: "0.68rem", color: "var(--text-3)", textAlign: "center" }}>
          {bl.summary(botCount, difficultyLabels[difficulty].label, deathThreshold)}
        </div>
      </div>
    </div>
  );
}
