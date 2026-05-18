"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  color: string;
  symbol: string;
}

const SYMBOLS = ["✧", "✦", "✫"];
const COLORS = ["#C4B5E8", "#b8d4f0", "#f0bce8", "#d4b8f0", "#c8f0e0"];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastPos = useRef({ x: -999, y: -999 });
  const activeRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReduced || !hasHover) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function spawn(x: number, y: number) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(5, Math.max(1, Math.floor(speed / 10)));

      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.9,
          vy: -(Math.random() * 1.4 + 0.5),
          opacity: Math.random() * 0.45 + 0.35,
          size: Math.random() * 9 + 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        });
      }
      lastPos.current = { x, y };
    }

    function onMouseMove(e: MouseEvent) {
      activeRef.current = true;
      spawn(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.015);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.975;
        p.vx *= 0.98;
        p.opacity -= 0.016;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[200]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
