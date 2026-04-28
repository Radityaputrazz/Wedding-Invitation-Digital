// app/invitation/page.tsx

import WeddingContainer from "@/components/wedding/WeddingContainer";

export default function Page({
  searchParams,
}: {
  searchParams: { to?: string };
}) {
  const guestName = searchParams?.to ?? "";

  return <WeddingContainer guestName={guestName} />;
}