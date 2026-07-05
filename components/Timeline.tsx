"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { events, type WeddingEvent } from "@/lib/events";

/* Android jumps straight into Google Calendar; everything else downloads
   an .ics that opens in Apple Calendar / Outlook. */
function addToCalendar(event: WeddingEvent) {
  const start = new Date(event.startISO);
  const end = new Date(start.getTime() + event.durationHours * 3600_000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const title = `${event.name} — Muhammad Akram & Mahara Aysha`;
  const location = event.venueLine2
    ? `${event.venue}, ${event.venueLine2}`
    : event.venue;

  if (/android/i.test(navigator.userAgent)) {
    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${stamp(start)}/${stamp(end)}` +
      `&details=${encodeURIComponent(`${event.tagline}\nMap: ${event.mapsUrl}`)}` +
      `&location=${encodeURIComponent(location)}`;
    window.open(url, "_blank", "noopener");
    return;
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Akram & Mahara//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@akramandmaharawedding`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${event.tagline}\\nMap: ${event.mapsUrl}`,
    `LOCATION:${location}`,
    `URL:${event.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-akram-and-mahara.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* Eight-petal badge — two stacked rounded squares, one rotated 45°. */
function PetalBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 rounded-[32%] border border-gold/80 bg-[#0a3527]/85" />
      <span className="absolute inset-0 rotate-45 rounded-[32%] border border-gold/80 bg-[#0a3527]/45" />
      <span className="relative text-gold-light">{children}</span>
    </span>
  );
}

function LeafOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M2 12h10M12 12c3-4 7-5 10-4-1 4-6 6-10 4zM12 12c3 4 7 5 10 4-1-4-6-6-10-4z" />
    </svg>
  );
}

function DetailRow({
  icon,
  main,
  sub,
}: {
  icon: React.ReactNode;
  main: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gold/50 bg-[#052a20]/60 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(240,217,124,0.12),0_6px_18px_rgba(0,0,0,0.35)] backdrop-blur-[2px]">
      <PetalBadge>{icon}</PetalBadge>
      <div className="min-w-0 text-left">
        <span className="block font-[family-name:var(--font-heading)] text-lg leading-snug text-gold-pale sm:text-xl">
          {main}
        </span>
        {sub && <span className="block text-sm text-ivory/65">{sub}</span>}
      </div>
      <LeafOrnament className="ml-auto h-4 w-6 shrink-0 text-gold/45" />
    </div>
  );
}

const icons = {
  calendar: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 2.8v4M16 2.8v4" strokeLinecap="round" />
      <path d="M7.5 13h3M7.5 16.5h3M13.5 13h3" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
};

function TimelineCard({ event }: { event: WeddingEvent }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div className="relative flex w-full justify-center">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[460px]"
      >
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="card-3d relative overflow-hidden rounded-[1.75rem] border border-gold/45 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
        >
          {/* ornate arch artwork */}
          <Image
            src="/backgrounds/card-bg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, 460px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-abyss/45" aria-hidden />

          <div className="relative flex flex-col gap-3.5 px-7 pb-9 pt-[4.5rem] sm:px-9 sm:pt-20">
            {/* title inside the golden arch */}
            <header className="mb-4 text-center">
              <h3>
                <span className="gold-text-static block font-[family-name:var(--font-heading)] text-[1.65rem] uppercase tracking-[0.16em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl">
                  {event.titleMain}
                </span>
                <span className="mt-1.5 block font-[family-name:var(--font-script)] text-4xl leading-tight text-gold-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-[2.6rem]">
                  {event.titleScript}
                </span>
              </h3>
              <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-gold/70" aria-hidden>
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
                <span className="text-[0.6rem]">✦</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
              </div>
              <p className="mt-3 text-[1.05rem] italic leading-snug text-beige/90">
                {event.tagline}
              </p>
            </header>

            <DetailRow icon={icons.calendar} main={event.date} sub={event.day} />
            <DetailRow icon={icons.clock} main={event.time} />
            <DetailRow icon={icons.pin} main={event.venue} sub={event.venueLine2} />

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex items-center justify-center gap-3 rounded-full border-2 border-gold/75 bg-gradient-to-b from-gold/25 to-[#8a6d1f]/20 px-6 py-3.5 shadow-[0_0_26px_rgba(212,175,55,0.22),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-500 hover:from-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-[0.28em] text-gold-pale">
                View on Map
              </span>
              <LeafOrnament className="h-4 w-6 text-gold-light/80 transition-transform duration-500 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={() => addToCalendar(event)}
              className="group flex cursor-pointer items-center justify-center gap-3 rounded-full border border-gold/55 bg-[#052a20]/40 px-6 py-3.5 shadow-[inset_0_1px_0_rgba(240,217,124,0.1)] transition-all duration-500 hover:border-gold hover:bg-gold/15 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
                <path d="M3.5 9.5h17M8 2.8v4M16 2.8v4" strokeLinecap="round" />
                <path d="M12 12.5v5M9.5 15h5" strokeLinecap="round" />
              </svg>
              <span className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-[0.18em] text-gold-pale">
                Add to Calendar
              </span>
              <LeafOrnament className="h-4 w-6 text-gold-light/80 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative pb-28 pt-14 sm:pb-36 sm:pt-16" aria-label="Wedding events timeline">
      {/* ornate emerald backdrop stays pinned while the cards scroll past */}
      <div className="absolute inset-0" aria-hidden>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Image
            src="/backgrounds/timeline-v2.png"
            alt=""
            fill
            sizes="100vw"
            className="scale-105 object-cover object-center blur-[7px]"
          />
          <div className="absolute inset-0 bg-emerald-abyss/25" />
        </div>
      </div>
      {/* seamless blends into the neighbouring sections */}
      <div className="pointer-events-none absolute inset-x-0 -top-2 z-[1] h-80 bg-gradient-to-b from-black from-18% via-black/60 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-[#050c18] to-transparent" aria-hidden />

      <div className="relative z-[2] mx-auto max-w-6xl px-5 sm:px-8">
        <header data-reveal className="mb-16 text-center sm:mb-20">
          <span className="font-[family-name:var(--font-script)] text-4xl text-gold-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-5xl">
            The Celebration
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-normal text-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-4xl">
            A day of joy, faith &amp; festivity
          </h2>
        </header>

        <div className="relative flex flex-col gap-16 md:gap-24">
          {events.map((event) => (
            <TimelineCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
