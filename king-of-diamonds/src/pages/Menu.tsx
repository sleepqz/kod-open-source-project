import { DiamondIcon } from "../components/DiamondIcon";

interface MenuProps {
  onStart: () => void;
}

export function Menu({ onStart }: MenuProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 90% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 90% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating diamonds background */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-5"
          style={{
            top: `${10 + i * 11}%`,
            left: `${5 + ((i * 13) % 90)}%`,
            transform: `rotate(${i * 45}deg) scale(${0.5 + (i % 3) * 0.4})`,
          }}
        >
          <DiamondIcon size={60} color="hsl(0 90% 50%)" />
        </div>
      ))}

      <div className="relative z-10 max-w-lg w-full text-center animate-fade-in-up">
        {/* Card symbol */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <DiamondIcon size={80} color="hsl(0 90% 50%)" className="animate-heartbeat" />
            <span
              className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white"
              style={{ textShadow: "0 0 10px rgba(0,0,0,0.8)" }}
            >
              K
            </span>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tight mb-1 text-white">
          KING OF
        </h1>
        <h1
          className="text-6xl font-black tracking-tight mb-6"
          style={{ color: "hsl(0 90% 55%)", textShadow: "0 0 30px hsl(0 90% 50% / 0.5)" }}
        >
          DIAMONDS
        </h1>

        <div className="w-16 h-px bg-red-600 mx-auto mb-6 opacity-60" />

        <p className="text-base text-gray-400 mb-2 leading-relaxed">
          A game of intellect. Choose a number between{" "}
          <span className="text-white font-bold">0 and 100</span>.
        </p>
        <p className="text-base text-gray-400 mb-2 leading-relaxed">
          The winner is whoever picks closest to{" "}
          <span className="text-red-400 font-bold">⅔ of the average</span> of all picks.
        </p>
        <p className="text-sm text-gray-600 mb-10 leading-relaxed">
          Losers lose one life. Lose all three — you're eliminated.
          <br />
          Last one standing wins.
        </p>

        {/* Players preview */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {[
            { name: "Nagase", title: "Economist", color: "#f97316" },
            { name: "Banda", title: "Gambler", color: "#a855f7" },
            { name: "Chinchilla", title: "Analyst", color: "#3b82f6" },
            { name: "Kyuma", title: "Philosopher", color: "#10b981" },
          ].map((p) => (
            <div
              key={p.name}
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs"
            >
              <div className="font-bold" style={{ color: p.color }}>
                {p.name}
              </div>
              <div className="text-gray-500">{p.title}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="relative group px-12 py-4 text-lg font-black tracking-widest uppercase text-white rounded-lg transition-all duration-200 glow-red"
          style={{
            background: "hsl(0 90% 42%)",
            border: "1px solid hsl(0 90% 60%)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "hsl(0 90% 50%)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "hsl(0 90% 42%)";
          }}
        >
          ENTER THE VENUE
        </button>

        <p className="mt-6 text-xs text-gray-700">
          Based on the K♦ game from Alice in Borderland
        </p>
      </div>
    </div>
  );
}
