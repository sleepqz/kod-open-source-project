import { useWallpaper } from "../WallpaperContext";

interface BgLayerProps {
  /** Extra darkness 0–1, stacked on top of the theme overlay */
  darkness?: number;
}

export function BgLayer({ darkness = 0 }: BgLayerProps) {
  const { active } = useWallpaper();

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}>
      {/* Wallpaper image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${active.file})`,
        backgroundSize: "cover",
        backgroundPosition: active.bgPosition,
        filter: active.bgFilter,
      }} />

      {/* Theme overlay gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: active.overlayGradient,
      }} />

      {/* Accent tint */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: active.tintColor,
      }} />

      {/* Extra darkness layer (for game screens needing better readability) */}
      {darkness > 0 && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: `rgba(0,0,0,${darkness})`,
        }} />
      )}
    </div>
  );
}
