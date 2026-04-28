export default function Page({ params }: { params: { slug: string } }) {
  const guestName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return <div>{guestName}</div>;
}