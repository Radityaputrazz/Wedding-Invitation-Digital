// app/page.tsx
import { Metadata } from "next";
import WeddingContainer from "@/components/wedding/shared/WeddingContainer";

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Radit & Keiani",
  description: "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ to?: string }>;
}) {
  const params = await searchParams;
  const guestName = params?.to ? decodeURIComponent(params.to) : "Tamu Undangan";

  return <WeddingContainer guestName={guestName} />;
}