export interface WallpaperTheme {
  id: string;
  file: string;
  // Palette
  accent: string;
  accentRgb: string;
  accent2: string;
  // Typography  
  titleFont: string;
  titleSize: string;
  titleWeight: number;
  titleLetterSpacing: string;
  titleTransform: string;
  titleColor: string;
  titleStyle: string;
  subtitle: string;
  subtitleColor: string;
  // Background processing
  bgFilter: string;
  bgPosition: string;
  // Overlay
  overlayGradient: string;
  tintColor: string;
}

export const WALLPAPERS: WallpaperTheme[] = [
  {
    id: 'ocean',
    file: '/bg-ocean.png',
    accent: '#2a7fd4',
    accentRgb: '42,127,212',
    accent2: '#5ab4ff',
    titleFont: '"Bebas Neue", sans-serif',
    titleSize: 'clamp(3.8rem, 11vw, 7.5rem)',
    titleWeight: 400,
    titleLetterSpacing: '0.12em',
    titleTransform: 'uppercase',
    titleColor: 'rgba(190,220,255,0.96)',
    titleStyle: 'normal',
    subtitle: 'Survivez ou mourez',
    subtitleColor: 'rgba(120,180,255,0.65)',
    bgFilter: 'grayscale(0.35) brightness(0.5) contrast(1.15)',
    bgPosition: 'center 35%',
    overlayGradient: 'linear-gradient(170deg, rgba(2,8,28,0.5) 0%, rgba(4,14,45,0.82) 100%)',
    tintColor: 'rgba(20,60,160,0.18)',
  },
  {
    id: 'borderland',
    file: '/bg-borderland.png',
    accent: '#cc1a1a',
    accentRgb: '204,26,26',
    accent2: '#ff5555',
    titleFont: '"Creepster", cursive',
    titleSize: 'clamp(3.2rem, 9vw, 6rem)',
    titleWeight: 400,
    titleLetterSpacing: '0.05em',
    titleTransform: 'none',
    titleColor: 'rgba(255,180,180,0.97)',
    titleStyle: 'normal',
    subtitle: 'Alice in Borderland',
    subtitleColor: 'rgba(255,140,140,0.6)',
    bgFilter: 'brightness(0.4) saturate(0.7)',
    bgPosition: 'center center',
    overlayGradient: 'linear-gradient(170deg, rgba(20,3,3,0.6) 0%, rgba(10,2,2,0.82) 100%)',
    tintColor: 'rgba(160,10,10,0.2)',
  },
  {
    id: 'city',
    file: '/bg-city.png',
    accent: '#6a9ec0',
    accentRgb: '106,158,192',
    accent2: '#9ac8e8',
    titleFont: '"Cinzel Decorative", serif',
    titleSize: 'clamp(2rem, 6vw, 3.8rem)',
    titleWeight: 700,
    titleLetterSpacing: '0.06em',
    titleTransform: 'none',
    titleColor: 'rgba(200,220,240,0.95)',
    titleStyle: 'normal',
    subtitle: "L'abandon mène à la victoire",
    subtitleColor: 'rgba(140,185,220,0.6)',
    bgFilter: 'grayscale(0.5) brightness(0.45) contrast(1.1)',
    bgPosition: 'center 60%',
    overlayGradient: 'linear-gradient(170deg, rgba(4,10,20,0.55) 0%, rgba(6,12,22,0.82) 100%)',
    tintColor: 'rgba(30,80,120,0.18)',
  },
  {
    id: 'pink',
    file: '/bg4-pink.png',
    accent: '#c83070',
    accentRgb: '200,48,112',
    accent2: '#f070aa',
    titleFont: '"Playfair Display", serif',
    titleSize: 'clamp(2.8rem, 8vw, 5.5rem)',
    titleWeight: 900,
    titleLetterSpacing: '-0.01em',
    titleTransform: 'none',
    titleColor: 'rgba(255,200,225,0.97)',
    titleStyle: 'italic',
    subtitle: 'La beauté trahit sa vérité',
    subtitleColor: 'rgba(255,160,200,0.62)',
    bgFilter: 'brightness(0.42) saturate(0.8)',
    bgPosition: 'center 30%',
    overlayGradient: 'linear-gradient(170deg, rgba(20,3,10,0.55) 0%, rgba(15,4,8,0.82) 100%)',
    tintColor: 'rgba(160,20,80,0.22)',
  },
  {
    id: 'king',
    file: '/bg5-king.png',
    accent: '#7a3fcc',
    accentRgb: '122,63,204',
    accent2: '#b070ff',
    titleFont: '"Orbitron", sans-serif',
    titleSize: 'clamp(1.8rem, 5vw, 3.5rem)',
    titleWeight: 900,
    titleLetterSpacing: '0.08em',
    titleTransform: 'uppercase',
    titleColor: 'rgba(210,180,255,0.97)',
    titleStyle: 'normal',
    subtitle: 'Calculate your fate',
    subtitleColor: 'rgba(175,130,255,0.6)',
    bgFilter: 'brightness(0.38) saturate(0.75)',
    bgPosition: 'center center',
    overlayGradient: 'linear-gradient(170deg, rgba(6,2,20,0.58) 0%, rgba(8,4,22,0.82) 100%)',
    tintColor: 'rgba(80,20,160,0.22)',
  },
  {
    id: 'chaos',
    file: '/bg6-chaos.png',
    accent: '#c0a018',
    accentRgb: '192,160,24',
    accent2: '#f8d040',
    titleFont: '"Black Han Sans", sans-serif',
    titleSize: 'clamp(3.5rem, 10vw, 7rem)',
    titleWeight: 400,
    titleLetterSpacing: '0.04em',
    titleTransform: 'uppercase',
    titleColor: 'rgba(255,240,180,0.97)',
    titleStyle: 'normal',
    subtitle: '⅔ of madness',
    subtitleColor: 'rgba(240,210,100,0.6)',
    bgFilter: 'grayscale(0.3) brightness(0.42) contrast(1.2)',
    bgPosition: 'center 45%',
    overlayGradient: 'linear-gradient(170deg, rgba(10,8,2,0.55) 0%, rgba(12,10,2,0.82) 100%)',
    tintColor: 'rgba(120,90,0,0.22)',
  },
];

export function randomWallpaper(): WallpaperTheme {
  return WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];
}
