"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Sealed-envelope loader. The site waits behind a closed envelope;
 * clicking the wax seal lifts the flap, slides the invitation card out,
 * then the whole overlay dissolves to reveal the website.
 * Fires the `invite-opened` event that the Hero listens for.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "done">("sealed");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    // synchronous with the tap so audio playback keeps the user-gesture grant
    window.dispatchEvent(new Event("invite-clicked"));
    // let the hero begin its entrance as the overlay starts dissolving
    setTimeout(() => {
      (window as unknown as { __inviteOpened?: boolean }).__inviteOpened = true;
      window.dispatchEvent(new Event("invite-opened"));
    }, 1500);
    setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
    }, 2400);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0b0805]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          aria-hidden={phase !== "sealed"}
        >
          {/* palace backdrop, softened so the envelope stays the focus */}
          <Image
            src="/backgrounds/preloadbg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover object-center blur-[5px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(4,15,12,0.35),rgba(3,8,6,0.72))]" aria-hidden />
          {/* ambient gold dust */}
          {[
            [12, 18], [24, 66], [37, 30], [48, 80], [58, 14], [70, 60], [83, 26], [90, 74], [8, 46], [65, 40],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="animate-twinkle absolute h-[3px] w-[3px] rounded-full bg-gold-pale"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
            />
          ))}

          {/* ── Envelope ── */}
          <motion.button
            onClick={open}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={
              phase === "opening"
                ? { opacity: 1, y: 40, scale: 0.96 }
                : { opacity: 1, y: [0, -8, 0], scale: 1 }
            }
            transition={
              phase === "opening"
                ? { duration: 0.8, ease: "easeInOut" }
                : { opacity: { duration: 0.9 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }, scale: { duration: 0.9 } }
            }
            className="relative block w-[min(88vw,430px)] cursor-pointer outline-none"
            style={{ aspectRatio: "10 / 7", perspective: 1300 }}
            aria-label="Open the wedding invitation"
          >
            {/* back panel */}
            <div className="absolute inset-0 rounded-2xl border border-gold/60 bg-gradient-to-b from-[#0c4434] to-[#062a20] shadow-[0_40px_90px_rgba(0,0,0,0.65),0_0_60px_rgba(212,175,55,0.12)]">
              <div className="jaali-pattern absolute inset-0 rounded-2xl opacity-10" />
            </div>

            {/* invitation card sliding out */}
            <motion.div
              className="absolute inset-x-5 bottom-4 top-4 z-[6] flex flex-col items-center justify-center gap-1.5 rounded-xl border border-[#d9c489] bg-[radial-gradient(circle_at_50%_20%,#fdfbf4,#f0e6cd_85%)] px-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0 }}
              animate={
                phase === "opening"
                  ? { opacity: 1, y: "-62%" }
                  : { opacity: 0, y: 0 }
              }
              transition={{
                opacity: { duration: 0.2, delay: phase === "opening" ? 0.35 : 0 },
                y: { duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <span className="text-[0.55rem] uppercase tracking-[0.45em] text-[#8a7748]">
                Wedding Invitation
              </span>
              <span className="script-medium mt-1 font-[family-name:var(--font-names)] text-3xl leading-snug text-[#8a6a2f] sm:text-4xl">
                Muhammad Akram
              </span>
              <span className="font-[family-name:var(--font-names)] text-2xl text-[#b08d3f]">&amp;</span>
              <span className="script-medium font-[family-name:var(--font-names)] text-3xl leading-snug text-[#8a6a2f] sm:text-4xl">
                Mahara Aysha
              </span>
              <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.35em] text-[#8a7748]">
                01 · 08 · 2026
              </span>
            </motion.div>

            {/* front pocket — covers the whole envelope except the flap triangle */}
            <div
              className="absolute inset-0 z-[10] rounded-2xl bg-gradient-to-b from-[#0e5241] to-[#083528]"
              style={{ clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)" }}
            >
              <div className="jaali-pattern absolute inset-0 opacity-[0.08]" />
              {/* pocket seam highlights */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(240,217,124,0.14), transparent 35%), linear-gradient(-115deg, rgba(240,217,124,0.14), transparent 35%)" }} />
            </div>
            <svg className="absolute inset-0 z-[11] h-full w-full" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden>
              <path d="M0 0 L50 40.6 L100 0" fill="none" stroke="#d4af37" strokeWidth="0.45" opacity="0.75" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* flap — single face; its mirrored back shows as the inner lining */}
            <motion.div
              className="absolute inset-0 z-[20]"
              style={{ transformOrigin: "50% 0%" }}
              animate={phase === "opening" ? { rotateX: -180, zIndex: 5 } : { rotateX: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.65, 0, 0.35, 1], zIndex: { delay: 0.65 } }}
            >
              <div
                className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#11604c] to-[#0a3d2e]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 48%)" }}
              >
                <div className="jaali-pattern absolute inset-0 opacity-[0.1]" />
              </div>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden>
                <path d="M0 0 L50 33.5 L100 0" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.9" vectorEffect="non-scaling-stroke" />
              </svg>
            </motion.div>

            {/* wax seal — outer span centers it; inner motion.div animates freely */}
            <span className="absolute left-1/2 top-[48%] z-[25] block -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="flex h-[76px] w-[76px] items-center justify-center sm:h-[86px] sm:w-[86px]"
              animate={phase === "opening" ? { scale: 0, rotate: -25, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.45, ease: "backIn" }}
            >
              <span className="absolute inset-0 animate-glow-pulse rounded-full bg-gold/30 blur-md" />
              <span className="absolute inset-0 rounded-full border-2 border-[#e8cd6d] bg-[radial-gradient(circle_at_38%_30%,#e8cd6d,#b08d3f_60%,#8a6a2f)] shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_2px_6px_rgba(255,255,255,0.35)]" />
              <span className="absolute inset-[7px] rounded-full border border-[#8a6a2f]/60" />
              <span className="relative font-[family-name:var(--font-names)] text-2xl text-[#5a4310] drop-shadow-[0_1px_1px_rgba(255,240,190,0.6)] sm:text-[1.7rem]">
                A&amp;M
              </span>
            </motion.div>
            </span>
          </motion.button>

          {/* hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "opening" ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
            transition={
              phase === "opening"
                ? { duration: 0.3 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }
            className="mt-10 font-[family-name:var(--font-heading)] text-[0.68rem] uppercase tracking-[0.5em] text-gold-pale/90"
          >
            Tap the seal to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
