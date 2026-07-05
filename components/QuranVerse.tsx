"use client";

import Image from "next/image";

export default function QuranVerse() {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-44"
      aria-label="Quran verse"
    >
      {/* candlelit night hall */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/verse-night.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* soft candle-glow lift behind the calligraphy */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(212,175,55,0.14),transparent_72%)]" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(2,10,8,0.35),transparent_80%)]" aria-hidden />
        {/* seamless blends into the neighbouring sections */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#140b04] to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0b0805] from-10% via-[#0b0805]/60 to-transparent" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div data-reveal className="mb-12 flex items-center justify-center gap-4 text-gold/80" aria-hidden>
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
          <svg viewBox="0 0 40 40" className="h-6 w-6 animate-spin-very-slow">
            <path
              d="M20 3l4 9 9-4-4 9 9 3-9 4 4 9-9-4-4 9-4-9-9 4 4-9-9-3 9-4-4-9 9 4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.7" />
          </svg>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </div>
        <p
          data-reveal
          data-reveal-delay="0.1"
          lang="ar"
          dir="rtl"
          className="font-[family-name:var(--font-arabic)] text-5xl leading-[1.9] text-gold-pale drop-shadow-[0_0_36px_rgba(212,175,55,0.45)] sm:text-6xl md:text-7xl"
        >
          وَخَلَقْنَاكُمْ أَزْوَاجًا
        </p>
        <p
          data-reveal
          data-reveal-delay="0.25"
          className="mt-10 font-[family-name:var(--font-heading)] text-xl font-light italic text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-2xl"
        >
          “And We created you in pairs.”
        </p>
        <p
          data-reveal
          data-reveal-delay="0.35"
          className="mt-4 text-sm uppercase tracking-[0.4em] text-gold/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
        >
          — Quran 78:8
        </p>
      </div>
    </section>
  );
}
