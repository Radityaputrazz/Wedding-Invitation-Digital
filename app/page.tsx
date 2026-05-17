import type { Metadata } from "next";
import WeddingContainer from "@/components/wedding/shared/WeddingContainer";
import { sanitizeInput } from "@/src/utils/sanitize";

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Radit & Keiani",
  description:
    "Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.",
};

interface PageProps {
  searchParams?: Promise<{
    to?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  let decodedName = "Tamu Undangan";

  try {
    decodedName = decodeURIComponent(params?.to || "Tamu Undangan");
  } catch {
    decodedName = "Tamu Undangan";
  }

  const guestName = sanitizeInput(decodedName, 80);

  return <WeddingContainer guestName={guestName} />;
}