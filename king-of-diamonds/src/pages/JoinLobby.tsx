import { useState } from "react";

interface JoinLobbyProps {
  onBack: () => void;
  onSubmit: (code: string, nickname: string) => void;
  error: string | null;
}

export function JoinLobby({ onBack, onSubmit, error }: JoinLobbyProps) {
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");

  function handleSubmit() {
    if (code.trim().length >= 6 && nickname.trim()) {
      onSubmit(code.trim().toUpperCase(), nickname.trim());
    }
  }

  return (
    <div className="screen">
      <div style={{ width: "100%", maxWidth: 360, animation: "fadeUp 0.4s ease" }}>
        <button className="back-btn" onClick={onBack}>← Retour</button>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>
            Rejoindre un salon
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Entrez le code de l'hôte
          </div>
        </div>

        <div style={{ marginBottom: "1.2rem" }}>
          <div className="label">Code du salon</div>
          <input
            className="input-field input-code"
            placeholder="· · · · · ·"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
            maxLength={6}
            autoFocus
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div className="label">Votre pseudo</div>
          <input
            className="input-field"
            placeholder="Entrez un nom…"
            value={nickname}
            onChange={e => setNickname(e.target.value.slice(0, 20))}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            maxLength={20}
          />
        </div>

        {error && <div className="error-box">{error}</div>}

        <button
          className="btn btn-primary"
          style={{ width: "100%", fontSize: "0.95rem" }}
          onClick={handleSubmit}
          disabled={code.length < 6 || !nickname.trim()}
        >
          Entrer dans la salle →
        </button>
      </div>
    </div>
  );
}
