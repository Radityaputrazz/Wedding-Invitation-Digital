import { Metadata } from "next";
import WeddingContainer from "@/components/wedding/WeddingContainer";

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Radit & Keiani",
  description:
    "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.",
};

export default function Page({
  searchParams,
}: {
  searchParams?: { to?: string };
}) {
  const guestName = searchParams?.to ?? "Tamu Undangan";

  return <WeddingContainer guestName={guestName} />;
}