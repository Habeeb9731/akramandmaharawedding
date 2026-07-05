/* Shared decorative SVG ornaments — crescents, lanterns, arches,
   flourish dividers and silhouettes used across every section. */

export function Crescent({
  className = "",
  glow = false,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {glow && (
        <circle cx="50" cy="50" r="46" fill="url(#crescentGlow)" opacity="0.5" />
      )}
      <defs>
        <radialGradient id="crescentGlow">
          <stop offset="0%" stopColor="#f0d97c" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f0d97c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="crescentGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d97c" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a3812a" />
        </linearGradient>
      </defs>
      <path
        d="M63 12a38 38 0 1 0 0 76 30 30 0 0 1-14-57 30 30 0 0 1 14-19z"
        fill="url(#crescentGold)"
      />
      <circle cx="70" cy="26" r="3" fill="#f0d97c" />
    </svg>
  );
}

export function Lantern({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 60 160"
      className={`overflow-visible ${className}`}
      aria-hidden
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <radialGradient id="lanternGlow" cx="0.5" cy="0.55">
          <stop offset="0%" stopColor="#ffd77a" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e8a93a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e8a93a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lanternBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a6d1f" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6d1f" />
        </linearGradient>
      </defs>
      <line x1="30" y1="0" x2="30" y2="38" stroke="#d4af37" strokeWidth="1" />
      <circle
        cx="30"
        cy="90"
        r="40"
        fill="url(#lanternGlow)"
        className="animate-flicker"
      />
      <path d="M24 38h12l3 8H21z" fill="url(#lanternBody)" />
      <path
        d="M18 50c0-3 5-5 12-5s12 2 12 5l3 38c0 8-6 14-15 14s-15-6-15-14z"
        fill="rgba(6,39,32,0.85)"
        stroke="url(#lanternBody)"
        strokeWidth="1.6"
      />
      <ellipse
        cx="30"
        cy="82"
        rx="7"
        ry="12"
        fill="#ffd77a"
        opacity="0.9"
        className="animate-flicker"
      />
      <line x1="30" y1="46" x2="30" y2="102" stroke="#d4af37" strokeWidth="0.8" opacity="0.7" />
      <line x1="18" y1="60" x2="42" y2="60" stroke="#d4af37" strokeWidth="0.7" opacity="0.55" />
      <line x1="17" y1="76" x2="43" y2="76" stroke="#d4af37" strokeWidth="0.7" opacity="0.55" />
      <path d="M25 102h10l-2 8h-6z" fill="url(#lanternBody)" />
      <line x1="30" y1="110" x2="30" y2="120" stroke="#d4af37" strokeWidth="1" />
      <circle cx="30" cy="123" r="2.5" fill="#d4af37" />
    </svg>
  );
}

/** Cusped Mughal arch outline — the recurring architectural motif. */
export function MughalArch({
  className = "",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 200 280" className={className} fill="none" aria-hidden>
      <path
        d="M14 280V128c0-42 18-64 40-74 18-8 26-16 34-30 4-8 8-14 12-18 4 4 8 10 12 18 8 14 16 22 34 30 22 10 40 32 40 74v152"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M26 280V132c0-36 16-56 36-66 16-7 24-15 31-27 3-5 5-9 7-12 2 3 4 7 7 12 7 12 15 20 31 27 20 10 36 30 36 66v148"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        opacity="0.6"
      />
      <circle cx="100" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}

/** Horizontal ornamental divider with floral vines around a centre motif. */
export function Flourish({
  className = "",
  center = "crescent",
}: {
  className?: string;
  center?: "crescent" | "star" | "lantern" | "floral";
}) {
  return (
    <div
      className={`flex items-center justify-center gap-5 text-gold ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 220 24" className="h-5 w-40 sm:w-56" fill="none">
        <path
          d="M0 12h150c14 0 22-5 30-10M180 12c10 0 18-4 24-8"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
        />
        <path
          d="M120 12c12 0 20 8 30 8s16-8 26-8"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.55"
        />
        <circle cx="196" cy="12" r="2" fill="currentColor" />
        <path
          d="M160 12c4-6 10-7 14-6-2 5-8 8-14 6zM175 12c3 5 9 7 13 5-1-5-7-8-13-5z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>

      {center === "crescent" && <Crescent className="h-8 w-8 animate-float" />}
      {center === "star" && (
        <svg viewBox="0 0 40 40" className="h-7 w-7 animate-spin-very-slow">
          <path
            d="M20 3l4 9 9-4-4 9 9 3-9 4 4 9-9-4-4 9-4-9-9 4 4-9-9-3 9-4-4-9 9 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.7" />
        </svg>
      )}
      {center === "lantern" && <Lantern className="h-16 w-7 animate-float" />}
      {center === "floral" && (
        <svg viewBox="0 0 40 40" className="h-8 w-8 animate-float">
          <g fill="none" stroke="currentColor" strokeWidth="1.1">
            <circle cx="20" cy="20" r="5" />
            <path d="M20 4c3 5 3 9 0 11-3-2-3-6 0-11zM20 36c3-5 3-9 0-11-3 2-3 6 0 11zM4 20c5-3 9-3 11 0-2 3-6 3-11 0zM36 20c-5-3-9-3-11 0 2 3 6 3 11 0z" />
            <path d="M9 9c5 1 8 4 8 8-4 0-7-3-8-8zM31 31c-5-1-8-4-8-8 4 0 7 3 8 8zM31 9c-1 5-4 8-8 8 0-4 3-7 8-8zM9 31c1-5 4-8 8-8 0 4-3 7-8 8z" opacity="0.7" />
          </g>
        </svg>
      )}

      <svg viewBox="0 0 220 24" className="h-5 w-40 sm:w-56 -scale-x-100" fill="none">
        <path
          d="M0 12h150c14 0 22-5 30-10M180 12c10 0 18-4 24-8"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.8"
        />
        <path
          d="M120 12c12 0 20 8 30 8s16-8 26-8"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.55"
        />
        <circle cx="196" cy="12" r="2" fill="currentColor" />
        <path
          d="M160 12c4-6 10-7 14-6-2 5-8 8-14 6zM175 12c3 5 9 7 13 5-1-5-7-8-13-5z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

/** Mosque skyline silhouette used behind the Nikah card & footer. */
export function MosqueSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 200" className={className} fill="currentColor" aria-hidden>
      <path d="M60 200v-60l6-8 6 8v60zM66 118l-4 8h8zM66 106v10M63 109h6" opacity="0.9" />
      <path d="M534 200v-60l6-8 6 8v60zM540 118l-4 8h8z" opacity="0.9" />
      <path d="M180 200v-90l8-10 8 10v90zM188 88l-5 10h10zM188 74v12M184 78h8" />
      <path d="M404 200v-90l8-10 8 10v90zM412 88l-5 10h10zM412 74v12M408 78h8" />
      <path d="M240 200v-52c0-28 24-46 60-46s60 18 60 46v52z" />
      <path d="M300 58c-30 0-46 20-46 20h92s-16-20-46-20z" opacity="0" />
      <ellipse cx="300" cy="96" rx="52" ry="40" />
      <path d="M300 34c4 8 10 12 10 20a10 10 0 0 1-20 0c0-8 6-12 10-20z" />
      <path d="M296 22c0-4 4-8 4-8s4 4 4 8a4 4 0 0 1-8 0z" />
      <path d="M120 200v-30h60v30zM420 200v-30h60v30z" opacity="0.85" />
      <path d="M0 200v-16h600v16z" />
    </svg>
  );
}

/** Corner floral mehendi-style ornament. */
export function CornerFloral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M4 4c40 4 70 20 86 44 12 18 16 40 16 64" opacity="0.9" />
        <path d="M4 22c30 4 52 16 66 34 10 14 14 30 14 56" opacity="0.55" />
        <circle cx="34" cy="18" r="5" />
        <circle cx="34" cy="18" r="9" opacity="0.5" />
        <path d="M62 34c6-8 14-10 20-8-2 7-10 12-20 8z" fill="currentColor" opacity="0.7" />
        <path d="M84 58c8-4 15-2 19 3-6 5-14 4-19-3z" fill="currentColor" opacity="0.7" />
        <path d="M99 86c8-1 13 3 15 8-7 3-13 0-15-8z" fill="currentColor" opacity="0.7" />
        <circle cx="14" cy="44" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="48" cy="40" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="74" cy="72" r="2.5" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Small paisley/leaf sprig for the Mehendi card. */
export function MehendiLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M30 54C14 42 12 24 22 12c10-10 26-8 30 2 4 12-6 20-14 22" />
        <path d="M30 54c-2-12 0-24 8-32" opacity="0.7" />
        <circle cx="40" cy="18" r="3" fill="currentColor" opacity="0.7" />
        <path d="M18 30c4 0 7 3 7 7-4 0-7-3-7-7zM22 42c4-1 8 1 9 5-4 1-8-1-9-5z" fill="currentColor" opacity="0.55" />
      </g>
    </svg>
  );
}
