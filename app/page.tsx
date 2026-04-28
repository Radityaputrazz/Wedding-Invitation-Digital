import Cover from "@/components/wedding/Cover";
import Hero from "@/components/wedding/Hero";
import { useState } from "react";

export default function WeddingContainer({ guestName }: { guestName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Cover guestName={guestName} onOpen={() => setIsOpen(true)} />
      {isOpen && (
        <main>
          <Hero /> {/* Hero sudah pakai useSearchParams jadi aman */}
          {/* Komponen lain */}
        </main>
      )}
    </>
  );
}