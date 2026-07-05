"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NIKAH_DATE_ISO } from "@/lib/events";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(): Parts | null {
  const ms = new Date(NIKAH_DATE_ISO).getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass gold-frame flex w-[4.6rem] flex-col items-center rounded-xl px-2 py-5 sm:w-28 sm:py-7">
      <span className="gold-text font-[family-name:var(--font-heading)] text-3xl tabular-nums sm:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-[0.55rem] uppercase tracking-[0.3em] text-ivory/75 sm:text-[0.65rem]">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  // undefined until mounted → server and client first paint agree ("--")
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    setParts(diff());
    const id = setInterval(() => setParts(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n?: number) =>
    n === undefined ? "--" : String(n).padStart(2, "0");

  return (
    <section
      className="relative overflow-hidden py-36 sm:py-44"
      aria-label="Countdown to the Nikah"
    >
      {/* starry night with crescent moon */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/countdown.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_52%_at_50%_55%,rgba(7,12,26,0.45),transparent_75%)]" aria-hidden />
        {/* seamless blends into the neighbouring sections */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050c18] to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-abyss to-transparent" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div data-reveal>
          <span className="font-[family-name:var(--font-script)] text-3xl text-gold-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-4xl">
            Counting the moments
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-light text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-3xl">
            Until we say <em className="gold-text-static not-italic">Qubool Hai</em>
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.35em] text-ivory/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Nikah · 01 August 2026 · 11:30 AM
          </p>
        </div>

        {parts === null ? (
          <p data-reveal className="mt-14 font-[family-name:var(--font-heading)] text-3xl text-gold-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            ٱلْحَمْدُ لِلَّٰهِ — the blessed day has arrived!
          </p>
        ) : (
          <div
            data-reveal
            data-reveal-delay="0.15"
            className="mt-14 flex items-start justify-center gap-3 sm:gap-6"
          >
            <Tile value={fmt(parts?.days)} label="Days" />
            <span className="mt-6 text-2xl text-gold-light/60 sm:mt-8" aria-hidden>:</span>
            <Tile value={fmt(parts?.hours)} label="Hours" />
            <span className="mt-6 text-2xl text-gold-light/60 sm:mt-8" aria-hidden>:</span>
            <Tile value={fmt(parts?.minutes)} label="Minutes" />
            <span className="mt-6 text-2xl text-gold-light/60 sm:mt-8" aria-hidden>:</span>
            <Tile value={fmt(parts?.seconds)} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  );
}
