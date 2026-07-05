export type WeddingEvent = {
  id: string;
  emoji: string;
  name: string;
  titleMain: string;
  titleScript: string;
  tagline: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  venueLine2?: string;
  mapsUrl: string;
  accent: "mehendi" | "nikah" | "maroon" | "blush";
};

export const NIKAH_DATE_ISO = "2026-08-01T11:30:00+05:30";

export const events: WeddingEvent[] = [
  {
    id: "nikah",
    emoji: "🕌",
    name: "Nikah Ceremony",
    titleMain: "Nikah",
    titleScript: "Ceremony",
    tagline: "The sacred bond, sealed in faith",
    date: "01 August 2026",
    day: "Saturday",
    time: "11:30 AM",
    venue: "Indian Auditorium",
    venueLine2: "Nerlakatte, Mani",
    mapsUrl: "https://maps.google.com/?q=R49M%2BJ4V+Peraje",
    accent: "nikah",
  },
];
