"use client";

import { useState } from "react";
import Cover from "@/components/wedding/Cover";
import Navbar from "@/components/wedding/Navbar";
import Hero from "@/components/wedding/Hero";
import Profil from "@/components/wedding/Profil";
import Acara from "@/components/wedding/Acara";
import Galeri from "@/components/wedding/Galeri";
import RSVP from "@/components/wedding/RSVP";
import Ucapan from "@/components/wedding/Ucapan";
import Kado from "@/components/wedding/Kado";
import Footer from "@/components/wedding/Footer";

export default function WeddingContainer({
  guestName,
}: {
  guestName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCover, setShowCover] = useState(true);

  function handleOpen() {
    setIsOpen(true);

    setTimeout(() => {
      setShowCover(false);
    }, 1200);
  }

  return (
    <main>
      {showCover && (
        <Cover guestName={guestName} onOpen={handleOpen} />
      )}

      {isOpen && (
        <>
          <Navbar />
          <Hero />
          <Profil />
          <Acara />
          <Galeri />
          <RSVP />
          <Ucapan />
          <Kado />
          <Footer />
        </>
      )}
    </main>
  );
}