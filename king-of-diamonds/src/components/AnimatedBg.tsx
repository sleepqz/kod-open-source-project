import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  char: string;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface Streak {
  x: number; y: number;
  width: number;
  speed: number;
  opacity: number;
}

const SUITS = ["♦", "♣", "♠", "♥"];

export function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Particles (floating card suits)
    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      char: SUITS[Math.floor(Math.random() * SUITS.length)],
      size: Math.random() * 18 + 6,
      speed: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.18 + 0.04,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    // Wind streaks
    const streaks: Streak[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: Math.random() * 120 + 40,
      speed: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.07 + 0.02,
    }));

    function drawSpeedBurst(
      cx: number, cy: number,
      numLines: number, innerR: number, outerBase: number,
      alpha: number, timeOffset: number,
    ) {
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        const wave = Math.sin(t * 0.6 + timeOffset + i * 0.3) * 0.5 + 0.5;
        const r2 = outerBase + wave * outerBase * 0.35;
        const r1 = innerR + wave * 20;
        const lineAlpha = alpha * (0.4 + wave * 0.6);

        ctx!.beginPath();
        ctx!.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx!.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx!.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
        ctx!.lineWidth = 0.35 + (i % 3) * 0.15;
        ctx!.stroke();
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      t += 0.012;

      // Background
      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Main speed burst — upper right quadrant (character running in)
      drawSpeedBurst(
        canvas.width * 0.72, canvas.height * 0.28,
        80, 55, 220,
        0.09 + Math.sin(t * 0.7) * 0.03,
        0,
      );

      // Secondary burst — lower left
      drawSpeedBurst(
        canvas.width * 0.18, canvas.height * 0.72,
        50, 35, 130,
        0.055 + Math.sin(t * 0.5 + 2) * 0.02,
        1.5,
      );

      // Subtle central burst
      drawSpeedBurst(
        canvas.width * 0.5, canvas.height * 0.5,
        40, 80, 200,
        0.025 + Math.sin(t * 0.4 + 1) * 0.01,
        0.8,
      );

      // Diagonal "slash" lines — manga action lines
      ctx.save();
      ctx.globalAlpha = 0.04 + Math.sin(t * 0.3) * 0.015;
      for (let i = 0; i < 8; i++) {
        const x = (i / 7) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x - canvas.height * 0.5, 0);
        ctx.lineTo(x + canvas.height * 0.5, canvas.height);
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = 0.5 + i * 0.1;
        ctx.stroke();
      }
      ctx.restore();

      // Wind streaks
      for (const s of streaks) {
        s.x += s.speed;
        if (s.x > canvas.width + s.width) {
          s.x = -s.width;
          s.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.width, s.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.3, `rgba(255,255,255,${s.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.width, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating suit particles
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -p.size * 2) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      // Manga halftone dots (corner texture)
      ctx.save();
      ctx.globalAlpha = 0.06;
      const dotSpacing = 18;
      for (let dx = 0; dx < 200; dx += dotSpacing) {
        for (let dy = 0; dy < 200; dy += dotSpacing) {
          ctx.beginPath();
          ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
        }
      }
      ctx.restore();

      // Deep vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.15,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.88,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.6, "rgba(0,0,0,0.3)");
      vignette.addColorStop(1, "rgba(0,0,0,0.88)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
