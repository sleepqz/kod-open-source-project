import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { WALLPAPERS, randomWallpaper, type WallpaperTheme } from './wallpapers';

interface WallpaperContextValue {
  active: WallpaperTheme;
  setActive: (theme: WallpaperTheme) => void;
}

const WallpaperContext = createContext<WallpaperContextValue>({
  active: WALLPAPERS[0],
  setActive: () => {},
});

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<WallpaperTheme>(() => randomWallpaper());

  // Sync CSS custom properties when theme changes
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--accent', active.accent);
    r.setProperty('--accent-rgb', active.accentRgb);
    r.setProperty('--accent2', active.accent2);
    r.setProperty('--accent-dim', `rgba(${active.accentRgb},0.55)`);
    r.setProperty('--accent-glow', `rgba(${active.accentRgb},0.28)`);
    r.setProperty('--accent-glass', `rgba(${active.accentRgb},0.09)`);
    r.setProperty('--accent-border', `rgba(${active.accentRgb},0.32)`);
    // Override the red accent variables to match the theme
    r.setProperty('--red', active.accent);
    r.setProperty('--red-dim', `rgba(${active.accentRgb},0.55)`);
    r.setProperty('--red-glow', `rgba(${active.accentRgb},0.32)`);
  }, [active]);

  return (
    <WallpaperContext.Provider value={{ active, setActive }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  return useContext(WallpaperContext);
}
