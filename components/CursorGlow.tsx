"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A warm golden light that follows the pointer, plus a sparkle trail
 * of tiny gold motes. Desktop (fine pointer) only.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const glow = glowRef.current;
    const canvas = canvasRef.current;
    if (!glow || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

    type Mote = { x: number; y: number; vx: number; vy: number; life: number; size: number };
    const motes: Mote[] = [];

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (motes.length < 90) {
        motes.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.3 - Math.random() * 0.5,
          life: 1,
          size: 0.8 + Math.random() * 1.6,
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.016;
        if (m.life <= 0) {
          motes.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * m.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 217, 124, ${0.7 * m.life})`;
        ctx.shadowColor = "rgba(212,175,55,0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 mix-blend-screen [@media(pointer:fine)]:block"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.06) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[61] hidden [@media(pointer:fine)]:block"
        aria-hidden
      />
    </>
  );
}
