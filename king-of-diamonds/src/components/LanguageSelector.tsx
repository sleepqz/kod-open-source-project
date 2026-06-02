import { useState } from "react";
import { useLang } from "../i18n";
import { LANG_OPTIONS, type LangCode } from "../i18n/translations";

export function LanguageSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find(o => o.code === lang)!;

  function pick(code: LangCode) {
    setLang(code);
    setOpen(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          padding: "0.3rem 0.65rem",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 7,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.72rem", fontWeight: 500,
          fontFamily: "'Inter', system-ui, sans-serif",
          cursor: "pointer",
          transition: "all 0.12s",
          height: 28,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.11)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>▾</span>
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0,
            background: "rgba(18,18,18,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 9,
            backdropFilter: "blur(20px)",
            padding: "4px",
            zIndex: 101,
            minWidth: 120,
            boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
            animation: "fadeIn 0.1s ease",
          }}>
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.code}
                onClick={() => pick(opt.code)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  width: "100%", padding: "0.45rem 0.7rem",
                  background: opt.code === lang ? "rgba(255,255,255,0.09)" : "none",
                  border: "none",
                  borderRadius: 6,
                  color: opt.code === lang ? "#fff" : "rgba(255,255,255,0.65)",
                  fontSize: "0.8rem", fontWeight: opt.code === lang ? 600 : 400,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => {
                  if (opt.code !== lang)
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={e => {
                  if (opt.code !== lang)
                    (e.currentTarget as HTMLButtonElement).style.background = "none";
                }}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
                <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)" }}>
                  {LANG_OPTIONS.find(o => o.code === opt.code)?.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
