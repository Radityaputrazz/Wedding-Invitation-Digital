import { useSearchParams } from "next/navigation";
import WeddingContainer from "@/components/wedding/WeddingContainer";

export default function Page() {
  const params = useSearchParams();
  const name = params.get("to") ?? "Tamu Undangan";

  return <WeddingContainer guestName={name} />;
}