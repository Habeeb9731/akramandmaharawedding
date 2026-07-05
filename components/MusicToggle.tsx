"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SONG_URL = "/sound/akandmhsong-v2.mp3";

/**
 * Floating background-music toggle. The couple's song from /public/sound
 * starts automatically (with a gentle fade-in) when the guest taps the
 * envelope seal, and this button mutes / resumes it. If the file is ever
 * missing, a soft santoor-like Web Audio ambience takes over as a fallback.
 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ master: GainNode; stop: () => void } | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const useFileRef = useRef<boolean | null>(null);

  useEffect(() => {
    // Fired synchronously from the envelope tap, so play() still carries the
    // user gesture and audible autoplay is allowed on mobile browsers.
    const autoStart = () => {
      if (audioElRef.current || nodesRef.current) return;
      const el = new Audio(SONG_URL);
      el.loop = true;
      el.volume = 0;
      audioElRef.current = el;
      useFileRef.current = true;
      el.play()
        .then(() => {
          setPlaying(true);
          const fade = setInterval(() => {
            el.volume = Math.min(0.55, el.volume + 0.028);
            if (el.volume >= 0.55 || el.paused) clearInterval(fade);
          }, 100);
        })
        .catch(() => {
          // blocked or file missing — stay muted; the toggle still works
          audioElRef.current = null;
          useFileRef.current = null;
        });
    };
    window.addEventListener("invite-clicked", autoStart);
    return () => {
      window.removeEventListener("invite-clicked", autoStart);
      nodesRef.current?.stop();
      ctxRef.current?.close().catch(() => {});
      audioElRef.current?.pause();
    };
  }, []);

  const startSynth = () => {
    const ctx =
      ctxRef.current ??
      new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    ctxRef.current = ctx;
    ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3);
    master.connect(ctx.destination);

    // gentle echo for space
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.55;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(master);

    // warm drone (root + fifth, softly detuned)
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.05;
    droneGain.connect(master);
    const droneFreqs = [110, 110.4, 165];
    const drones = droneFreqs.map((f) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(droneGain);
      o.start();
      return o;
    });

    // plucked pentatonic phrases (D major pentatonic, santoor-like)
    const scale = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25];
    let alive = true;
    let timeout: ReturnType<typeof setTimeout>;

    const pluck = () => {
      if (!alive) return;
      const now = ctx.currentTime;
      const note = scale[Math.floor(Math.random() * scale.length)];
      const notesInPhrase = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < notesInPhrase; i++) {
        const t = now + i * (0.28 + Math.random() * 0.2);
        const freq =
          i === 0 ? note : scale[Math.floor(Math.random() * scale.length)];
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.16, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
        g.connect(master);
        g.connect(delay);
        [1, 2, 3.01].forEach((partial, pi) => {
          const o = ctx.createOscillator();
          o.type = pi === 0 ? "triangle" : "sine";
          o.frequency.value = freq * partial;
          const pg = ctx.createGain();
          pg.gain.value = pi === 0 ? 1 : pi === 1 ? 0.22 : 0.08;
          o.connect(pg).connect(g);
          o.start(t);
          o.stop(t + 3);
        });
      }
      timeout = setTimeout(pluck, 2600 + Math.random() * 3200);
    };
    pluck();

    nodesRef.current = {
      master,
      stop: () => {
        alive = false;
        clearTimeout(timeout);
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(0, now + 1.2);
        drones.forEach((d) => d.stop(now + 1.4));
        setTimeout(() => master.disconnect(), 1500);
      },
    };
  };

  const toggle = async () => {
    if (playing) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      audioElRef.current?.pause();
      setPlaying(false);
      return;
    }

    if (useFileRef.current === null) {
      try {
        const res = await fetch(SONG_URL, { method: "HEAD" });
        useFileRef.current =
          res.ok && (res.headers.get("content-type") ?? "").includes("audio");
      } catch {
        useFileRef.current = false;
      }
    }

    if (useFileRef.current) {
      if (!audioElRef.current) {
        audioElRef.current = new Audio(SONG_URL);
        audioElRef.current.loop = true;
      }
      audioElRef.current.volume = 0.55;
      await audioElRef.current.play().catch(() => {});
    } else {
      startSynth();
    }
    setPlaying(true);
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.5, duration: 0.8 }}
      className="glass-deep fixed bottom-6 left-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full text-gold transition-transform hover:scale-110"
      aria-label={playing ? "Mute background music" : "Play background music"}
      title={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0.9, 0.5, 1.1, 0.7].map((d, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gold"
              animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
              transition={{ duration: d + 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12 3v10.28a4 4 0 1 0 2 3.47V7h5V3z" />
          <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </motion.button>
  );
}
