import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Amiri,
  Great_Vibes,
  Allura,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

// Fallback for Burgues Script (commercial font — loaded via @font-face
// from /public/fonts when the licensed file is present).
const burguesFallback = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-burgues-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  // Netlify injects URL at build time; the fallback covers local builds
  metadataBase: new URL(
    process.env.URL ?? "https://akramandmaharawedding.netlify.app"
  ),
  title: "Muhammad Akram ♥ Mahara Aysha — Wedding Invitation",
  description:
    "Together with their families, Muhammad Akram & Mahara Aysha joyfully invite you to celebrate their Nikah — 01 August 2026.",
  keywords: [
    "wedding",
    "invitation",
    "Muhammad Akram",
    "Mahara Aysha",
    "Nikah",
    "Mani",
    "Mangaluru",
  ],
  openGraph: {
    title: "Muhammad Akram ♥ Mahara Aysha",
    description:
      "Two hearts. One faith. One beautiful beginning. Join us — 01 August 2026.",
    type: "website",
    siteName: "Akram & Mahara — Wedding Invitation",
    images: [
      {
        url: "/og-image.jpg",
        width: 847,
        height: 1200,
        alt: "Muhammad Akram & Mahara Aysha — Wedding Invitation, 01 August 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Akram ♥ Mahara Aysha",
    description:
      "Two hearts. One faith. One beautiful beginning. Join us — 01 August 2026.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#041a16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${amiri.variable} ${greatVibes.variable} ${burguesFallback.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
