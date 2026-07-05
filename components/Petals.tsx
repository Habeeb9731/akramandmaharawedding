"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page ambient canvas: tiny golden dust motes drifting slowly
 * down the page with a gentle sway and twinkle.
 */
export default function Petals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number; y: number;
      size: number;
      speed: number;
      sway: number;
      swaySpeed: number;
      phase: number;
    };

    const isMobile = w < 768;
    const count = isMobile ? 26 : 55;

    const make = (seedY = true): P => ({
      x: Math.random() * w,
      y: seedY ? Math.random() * h : -20,
      size: 0.6 + Math.random() * 1.6,
      speed: 0.08 + Math.random() * 0.2,
      sway: 10 + Math.random() * 25,
      swaySpeed: 0.0018 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
    });

    const parts: P[] = Array.from({ length: count }, () => make());

    const drawDust = (p: P, t: number) => {
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 + p.phase * 4));
      ctx.save();
      ctx.globalAlpha = 0.7 * tw;
      ctx.fillStyle = "#f0d97c";
      ctx.shadowColor = "rgba(212,175,55,0.9)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x + Math.sin(p.phase) * p.sway * 0.4, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.speed;
        p.phase += p.swaySpeed * 16;
        if (p.y > h + 20) {
          Object.assign(p, make(false));
        }
        drawDust(p, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40]"
      aria-hidden
    />
  );
}
