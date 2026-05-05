"use client";

import { useState } from "react";

import Cover   from "@/components/wedding/cover/Cover";
import Navbar  from "@/components/wedding/layout/Navbar";
import Hero    from "@/components/wedding/section/Hero";
import Profil  from "@/components/wedding/section/Profil";
import Acara   from "@/components/wedding/section/Acara";
import Galeri  from "@/components/wedding/section/Galeri";
import RSVP    from "@/components/wedding/section/RSVP";
import Ucapan  from "@/components/wedding/section/Ucapan";
import Kado    from "@/components/wedding/section/Kado";
import Footer  from "@/components/wedding/section/Footer";

interface WeddingContainerProps {
  guestName: string;
}

export default function WeddingContainer({ guestName }: { guestName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      {/* Cover selalu render sampai open */}
      {!isOpen && (
        <Cover onOpen={() => setIsOpen(true)} guestName={guestName} />
      )}

      {/* Hero render lebih awal tapi invisible */}
      {/* Ini kuncinya — Hero sudah siap di DOM sebelum Cover hilang */}
      <div style={{ visibility: isOpen ? "visible" : "hidden" }}>
        <Navbar />
        <Hero isVisible={isOpen} />
        <Profil />
        <Acara />
        <Galeri />
        <RSVP />
        <Ucapan />
        <Kado />
        <Footer />
      </div>
    </main>
  );
}