"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flourish } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export default function Blessings() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark calligraphy drifts slowly with the scroll.
      gsap.fromTo(
        ".blessing-watermark",
        { y: 90, scale: 0.96 },
        {
          y: -90,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-36 sm:py-48"
      aria-label="Blessings"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(91,31,43,0.3),transparent_70%)]" aria-hidden />

      {/* Arabic calligraphy watermark — “Barakallahu lakuma” (may Allah bless you both) */}
      <div
        className="blessing-watermark pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          lang="ar"
          dir="rtl"
          className="select-none whitespace-nowrap font-[family-name:var(--font-arabic)] text-[22vw] leading-none text-gold/[0.07] sm:text-[16vw]"
        >
          بَارَكَ ٱللَّٰهُ لَكُمَا
        </span>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div data-reveal>
          <Flourish center="floral" className="mb-12" />
        </div>
        <p
          data-reveal
          data-reveal-delay="0.15"
          className="font-[family-name:var(--font-heading)] text-2xl font-light leading-relaxed text-ivory sm:text-3xl md:text-[2.1rem] md:leading-[1.6]"
        >
          May Allah bless this union with endless{" "}
          <span className="gold-text-static">love</span>,{" "}
          <span className="gold-text-static">mercy</span>,{" "}
          <span className="gold-text-static">barakah</span>, and{" "}
          <span className="gold-text-static">happiness</span>.
        </p>
        <p
          data-reveal
          data-reveal-delay="0.3"
          className="mt-8 font-[family-name:var(--font-arabic)] text-2xl text-gold/80 sm:text-3xl"
          lang="ar"
          dir="rtl"
        >
          آمين يا رب العالمين
        </p>
        <div data-reveal data-reveal-delay="0.4">
          <Flourish center="crescent" className="mt-12" />
        </div>
      </div>
    </section>
  );
}
