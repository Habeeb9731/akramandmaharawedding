# Muhammad Akram ♥ Mahara Aysha — Wedding Invitation

A cinematic, scroll-based wedding invitation built with Next.js, Tailwind CSS,
GSAP, Lenis smooth scroll and Framer Motion.

## Run it

```bash
npm install     # first time only
npm run dev     # develop at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Structure

| Section | File |
|---|---|
| Palace-doors loading animation | `components/Preloader.tsx` |
| Hero (Bismillah, names, courtyard) | `components/Hero.tsx` |
| Quran verse (78:8) | `components/QuranVerse.tsx` |
| Events timeline (glass arch cards) | `components/Timeline.tsx` |
| Countdown to the Nikah | `components/Countdown.tsx` |
| Blessings + calligraphy watermark | `components/Blessings.tsx` |
| Footer | `components/Footer.tsx` |
| Ambience (petals, cursor glow, music, back-to-top) | `components/Petals.tsx`, `CursorGlow.tsx`, `MusicToggle.tsx`, `BackToTop.tsx` |

All event details (dates, times, venues, Google Maps links) live in one place:
**`lib/events.ts`** — edit there and the timeline and location cards update together.
The countdown target is `NIKAH_DATE_ISO` in the same file.

## Background artwork

Section backgrounds live in `public/backgrounds/` (`hero.png`, `verse.png`,
`timeline.png`, `countdown.png`). Replace any file (same name) to change that
section's backdrop — Next.js optimizes and resizes them per device
automatically.

## Background music

The floating music button (bottom-left, muted by default) currently plays a
soft synthesised instrumental ambience generated in the browser. To use a real
track, drop a looping file at **`public/audio/ambience.mp3`** — it will be
detected and preferred automatically.
