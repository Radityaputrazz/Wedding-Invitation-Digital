// app/page.tsx
import { Metadata } from "next";
import WeddingContainer from "@/components/wedding/WeddingContainer";

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Radit & Keiani",
  description: "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Save the Date: 28 Juni 2026", 
    // Pastikan URL di bawah ini sesuai dengan domain produksi kamu nanti
    url: "https://wedding-invitation-radityaputra.vercel.app/",
    siteName: "Pernikahan Radit & Keiani",
    images: [
      {
        // Perhatikan penambahan /images/ di sini
        url: "https://wedding-invitation-radityaputra.vercel.app/images/undangan.png",
        width: 1200,
        height: 630,
        alt: "Undangan Pernikahan Radit & Keiani",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Radit & Keiani",
    description: "Kami menantikan kehadiran Anda di hari bahagia kami.",
    // Samakan juga untuk twitter card
    images: ["https://wedding-invitation-radityaputra.vercel.app/images/coverWa.png"],
  },
};

export default function Page() {
  return <WeddingContainer guestName={""} />;
}