"use client";

import { Crescent, MosqueSilhouette } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pb-12 pt-24" aria-label="Footer">
      <MosqueSilhouette className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-none -translate-x-1/2 text-[#031310] sm:w-full" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020d0b] to-transparent" aria-hidden />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <div data-reveal>
          <Crescent className="h-12 w-12 animate-float" glow />
        </div>

        <p
          data-reveal
          data-reveal-delay="0.1"
          className="mt-8 font-[family-name:var(--font-heading)] text-2xl text-ivory sm:text-3xl"
        >
          Muhammad Akram{" "}
          <span className="animate-glow-pulse inline-block text-[#c96a6a]" aria-hidden>
            ❤
          </span>{" "}
          Mahara Aysha
        </p>

        <p
          data-reveal
          data-reveal-delay="0.2"
          className="mt-4 max-w-md text-lg italic text-ivory/70"
        >
          “Thank you for being part of our special journey.”
        </p>

        {/* gold divider */}
        <div
          data-reveal
          data-reveal-delay="0.3"
          className="mt-10 flex w-full items-center justify-center gap-3"
          aria-hidden
        >
          <span className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.35em] text-ivory/40">
          01 August 2026 · Nerlakatte, Mani
        </p>
        <p className="mt-2 font-[family-name:var(--font-arabic)] text-sm text-gold/50" lang="ar" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        </p>
      </div>
    </footer>
  );
}
