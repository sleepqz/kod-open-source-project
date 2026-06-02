export function HeartLives({
  lives,
  maxLives,
  size = "md",
}: {
  lives: number;
  maxLives: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

  return (
    <div className={`flex gap-1 ${sizeClass}`}>
      {Array.from({ length: maxLives }).map((_, i) => (
        <span
          key={i}
          className={`transition-all duration-500 ${
            i < lives ? "life-heart" : "life-heart lost"
          }`}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
