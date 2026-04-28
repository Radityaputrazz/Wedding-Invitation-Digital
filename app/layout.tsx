// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"; 
import { Great_Vibes } from "next/font/google";

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Radit & Keiani",
  description: "Sabtu, 28 Juni 2025 – Jakarta",
  openGraph: {
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Kami mengundang Anda untuk turut berbahagia bersama kami",
    images: ["/images/cover.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}

        {/* PANGGIL KEDUANYA DI SINI */}
        <SpeedInsights />
        <Analytics /> 
      </body>
    </html>
  );
}