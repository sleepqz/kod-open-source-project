export function DiamondIcon({
  size = 24,
  color = "currentColor",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      <polygon points="12,2 22,12 12,22 2,12" fill={color} />
    </svg>
  );
}
