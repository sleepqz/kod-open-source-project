import { useState } from "react";

interface CreateLobbyProps {
  onBack: () => void;
  onSubmit: (nickname: string) => void;
  error: string | null;
}

export function CreateLobby({ onBack, onSubmit, error }: CreateLobbyProps) {
  const [nickname, setNickname] = useState("");

  return (
    <div className="screen">
      <div style={{ width: "100%", maxWidth: 360, animation: "fadeUp 0.4s ease" }}>
        <button className="back-btn" onClick={onBack}>← Retour</button>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>
            Créer un salon
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Un code à 6 caractères sera généré
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div className="label">Votre pseudo</div>
          <input
            className="input-field"
            placeholder="Entrez un nom…"
            value={nickname}
            onChange={e => setNickname(e.target.value.slice(0, 20))}
            onKeyDown={e => e.key === "Enter" && nickname.trim() && onSubmit(nickname.trim())}
            autoFocus
            maxLength={20}
          />
          <div style={{ fontSize: "0.72rem", color: "var(--text-faint)", marginTop: "0.35rem" }}>
            20 caractères maximum
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        <button
          className="btn btn-primary"
          style={{ width: "100%", fontSize: "0.95rem" }}
          onClick={() => nickname.trim() && onSubmit(nickname.trim())}
          disabled={!nickname.trim()}
        >
          Générer le code →
        </button>
      </div>
    </div>
  );
}
