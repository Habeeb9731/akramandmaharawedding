"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let onOpen: (() => void) | null = null;
    const ctx = gsap.context(() => {
      // Entrance choreography — begins once the envelope is opened.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-bismillah", { opacity: 0, scale: 0.92, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8 })
        .fromTo(".hero-name", { opacity: 0, y: 60, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, stagger: 0.25 }, "-=0.9")
        .fromTo(".hero-heart", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(2.5)" }, "-=1.2")
        .fromTo(".hero-invite", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2 }, "-=0.5")
        .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.3");

      if ((window as unknown as { __inviteOpened?: boolean }).__inviteOpened) {
        tl.play();
      } else {
        onOpen = () => tl.play();
        window.addEventListener("invite-opened", onOpen, { once: true });
      }

      // Cinematic drift while scrolling away from the hero.
      const scrub = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true } as const;
      gsap.to(".hero-content", { y: -140, opacity: 0.08, filter: "blur(6px)", scrollTrigger: scrub });
      gsap.fromTo(".hero-bg", { scale: 1.06 }, { scale: 1.18, y: 60, ease: "none", scrollTrigger: scrub });
    }, rootRef);
    return () => {
      if (onOpen) window.removeEventListener("invite-opened", onOpen);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      aria-label="Wedding invitation opening"
    >
      {/* ── Palace courtyard photograph ── */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <Image
          src="/backgrounds/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* legibility scrims — kept soft so the artwork glows through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1006]/55 via-transparent to-[#140b04]/78" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_47%,rgba(20,11,4,0.52),transparent_74%)]" aria-hidden />
      </div>

      {/* solid fade outside the parallax layer so the next section merges seamlessly */}
      <div className="absolute inset-x-0 bottom-0 z-[2] h-44 bg-gradient-to-t from-[#140b04] via-[#140b04]/60 to-transparent" aria-hidden />

      {/* ── Content ── */}
      <div className="hero-content relative z-[5] mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-24 text-center">
        <p
          className="hero-bismillah font-[family-name:var(--font-arabic)] text-3xl leading-loose text-gold-pale drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] sm:text-4xl md:text-5xl"
          lang="ar"
          dir="rtl"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <div className="mt-10 flex flex-col items-center gap-2 sm:mt-12">
          <h1 className="sr-only">Muhammad Akram and Mahara Aysha wedding invitation</h1>
          <span className="hero-name gold-text script-medium font-[family-name:var(--font-names)] text-6xl leading-[1.15] drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl">
            Muhammad Akram
          </span>
          <span className="hero-heart -my-1 sm:my-0" aria-hidden>
            <span className="gold-text-static inline-block animate-glow-pulse font-[family-name:var(--font-names)] text-7xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-8xl">
              &amp;
            </span>
          </span>
          <span className="hero-name gold-text script-medium font-[family-name:var(--font-names)] text-6xl leading-[1.15] drop-shadow-[0_3px_14px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl">
            Mahara Aysha
          </span>
        </div>

        <p className="hero-invite mt-10 max-w-xl text-lg font-light italic leading-relaxed text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-xl">
          Together with their families, joyfully invite you to celebrate their
          wedding.
        </p>

        <div className="hero-invite mt-6 flex items-center gap-4 text-gold-light" aria-hidden>
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-light/80" />
          <span className="font-[family-name:var(--font-script)] text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            01 · 08 · 2026
          </span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-light/80" />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-hint absolute bottom-7 left-1/2 z-[6] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-[family-name:var(--font-heading)] text-[0.6rem] uppercase tracking-[0.45em] text-ivory/75">
          Scroll
        </span>
        <span className="relative block h-12 w-[26px] rounded-full border border-gold/60">
          <span className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 animate-[scrollDot_2s_ease-in-out_infinite] rounded-full bg-gold-light" />
        </span>
      </div>
      <style jsx>{`
        @keyframes scrollDot {
          0% { transform: translate(-50%, 0); opacity: 1; }
          70% { transform: translate(-50%, 22px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
