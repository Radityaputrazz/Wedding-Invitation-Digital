import WeddingContainer from "@/components/wedding/WeddingContainer";

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const guestName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return <WeddingContainer guestName={guestName} />;
}