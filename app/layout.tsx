import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radit & Keiani Wedding",
  description: "Undangan Pernikahan Digital",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Radit & Keiani Wedding",
    description: "Undangan Pernikahan Digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}