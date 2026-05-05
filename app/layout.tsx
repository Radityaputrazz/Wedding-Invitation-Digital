import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Cormorant_Garamond, Jost, Great_Vibes } from "next/font/google";
import { TimelineProvider } from "@/lib/gsap/TimelineProvider";
import SmoothScrollProvider from "@/lib/gsap/SmoothScrollProvider";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

const signature = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

const baseUrl = "https://wedding-invitation-radityaputra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Undangan Pernikahan Radit & Keiani",
  description: "Assalamualaikum Wr. Wb. 🌿 Dengan penuh kebahagiaan kami mengundang Anda untuk hadir di pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Radit & Keiani • Sabtu, 28 Juni 2028 • Jakarta", // Disinkronkan ke 2028
    url: baseUrl,
    siteName: "Undangan Radit & Keiani",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/cover.png`,
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Radit & Keiani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Radit & Keiani • Sabtu, 28 Juni 2028 • Jakarta", // Disinkronkan ke 2028
    images: [`${baseUrl}/images/cover.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${serif.variable} ${sans.variable} ${signature.variable}`}
    >
      <body className="bg-[#0d0503] text-[#FAF0E0] antialiased">
        <SmoothScrollProvider>
          <TimelineProvider>
            {children}
          </TimelineProvider>
        </SmoothScrollProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}