import type { Player, RoundResult, RoundPick, AIStrategy } from "./types";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAIPick(
  player: Player,
  history: RoundResult[],
  playerCount: number
): number {
  const strategy = player.strategy ?? "random";
  const lastRound = history[history.length - 1];

  switch (strategy) {
    case "random": {
      return randomInt(30, 70);
    }

    case "anchor": {
      // Level-1 thinker: assumes others pick ~50, so targets 2/3 of 50 ≈ 33
      const base = 33;
      const noise = randomInt(-8, 8);
      return clamp(base + noise, 0, 100);
    }

    case "iterated": {
      // Level-2: assumes others are level-1 (pick ~33), so targets 2/3 of 33 ≈ 22
      const base = 22;
      const noise = randomInt(-6, 6);
      return clamp(base + noise, 0, 100);
    }

    case "adaptive": {
      if (!lastRound) {
        return randomInt(25, 45);
      }
      // Look at last target and nudge toward it
      const prevTarget = lastRound.target;
      const nextGuess = Math.floor(prevTarget * (2 / 3));
      const noise = randomInt(-5, 5);
      return clamp(nextGuess + noise, 0, 100);
    }

    case "extreme": {
      // Plays mind games — picks very low or occasionally very high
      const r = Math.random();
      if (r < 0.55) return randomInt(0, 10);
      if (r < 0.75) return randomInt(90, 100);
      return randomInt(20, 40);
    }
  }
}

export function resolveRound(
  round: number,
  picks: Map<string, number>
): Omit<RoundResult, "eliminatedThisRound"> {
  const entries = Array.from(picks.entries());
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const average = total / entries.length;
  const target = Math.floor((2 / 3) * average);

  let minDist = Infinity;
  const roundPicks: RoundPick[] = entries.map(([playerId, pick]) => {
    const dist = Math.abs(pick - target);
    if (dist < minDist) minDist = dist;
    return { playerId, pick, isWinner: false, distanceFromTarget: dist };
  });

  const winners = roundPicks.filter((p) => p.distanceFromTarget === minDist);
  const winnerIds = winners.map((w) => w.playerId);
  roundPicks.forEach((p) => {
    p.isWinner = winnerIds.includes(p.playerId);
  });

  return {
    round,
    picks: roundPicks,
    average: Math.round(average * 100) / 100,
    target,
    winnerIds,
  };
}

export function applyRoundToPlayers(
  players: Player[],
  result: Omit<RoundResult, "eliminatedThisRound">
): { updatedPlayers: Player[]; eliminatedThisRound: string[] } {
  const loserIds = players
    .filter((p) => !p.eliminated && !result.winnerIds.includes(p.id))
    .map((p) => p.id);

  const updatedPlayers = players.map((p) => {
    if (p.eliminated) return p;
    if (loserIds.includes(p.id)) {
      const newLives = p.lives - 1;
      return { ...p, lives: newLives, eliminated: newLives <= 0 };
    }
    return p;
  });

  const eliminatedThisRound = updatedPlayers
    .filter((p) => p.eliminated && loserIds.includes(p.id))
    .map((p) => p.id);

  return { updatedPlayers, eliminatedThisRound };
}

export function checkGameOver(players: Player[]): {
  isOver: boolean;
  winnerId: string | null;
} {
  const alive = players.filter((p) => !p.eliminated);
  if (alive.length <= 1) {
    return { isOver: true, winnerId: alive[0]?.id ?? null };
  }
  const human = players.find((p) => p.type === "human");
  if (human?.eliminated) {
    const lastAIAlive = alive[0];
    return { isOver: true, winnerId: lastAIAlive?.id ?? null };
  }
  return { isOver: false, winnerId: null };
}

export function createInitialPlayers(): Player[] {
  return [
    {
      id: "human",
      name: "You",
      type: "human",
      lives: 3,
      maxLives: 3,
      eliminated: false,
      color: "#ef4444",
      title: "The Contender",
    },
    {
      id: "ai1",
      name: "Nagase",
      type: "ai",
      strategy: "anchor" as AIStrategy,
      lives: 3,
      maxLives: 3,
      eliminated: false,
      color: "#f97316",
      title: "The Economist",
    },
    {
      id: "ai2",
      name: "Banda",
      type: "ai",
      strategy: "extreme" as AIStrategy,
      lives: 3,
      maxLives: 3,
      eliminated: false,
      color: "#a855f7",
      title: "The Gambler",
    },
    {
      id: "ai3",
      name: "Chinchilla",
      type: "ai",
      strategy: "adaptive" as AIStrategy,
      lives: 3,
      maxLives: 3,
      eliminated: false,
      color: "#3b82f6",
      title: "The Analyst",
    },
    {
      id: "ai4",
      name: "Kyuma",
      type: "ai",
      strategy: "iterated" as AIStrategy,
      lives: 3,
      maxLives: 3,
      eliminated: false,
      color: "#10b981",
      title: "The Philosopher",
    },
  ];
}
