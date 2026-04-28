import WeddingContainer from "@/components/wedding/WeddingContainer";

export default function Page({
  searchParams,
}: {
  searchParams?: { to?: string };
}) {
  return (
    <WeddingContainer guestName={searchParams?.to ?? "Tamu Undangan"} />
  );
}