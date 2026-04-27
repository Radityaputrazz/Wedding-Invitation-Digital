// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan Radit & Keiani",
  description: "Sabtu, 28 Juni 2025 – Jakarta",
  openGraph: {
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Kami mengundang Anda untuk turut berbahagia bersama kami",
    images: ["/images/cover.png"], // foto untuk preview WhatsApp/medsos
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}