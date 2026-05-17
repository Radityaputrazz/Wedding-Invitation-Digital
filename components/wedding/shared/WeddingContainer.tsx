"use client";

import { useState } from "react";

import Cover from "@/components/wedding/cover/Cover";
import Navbar from "@/components/wedding/navbar/Navbar";
import Hero from "@/components/wedding/hero/Hero";
import Profil from "@/components/wedding/profil/Profil";
import Acara from "@/components/wedding/acara/Acara";
import Galeri from "@/components/wedding/galeri/Galeri";
import RSVP from "@/components/wedding/rsvp/RSVP";
import Ucapan from "@/components/wedding/ucapan/Ucapan";
import Kado from "@/components/wedding/kado/Kado";
import Footer from "@/components/wedding/footer/Footer";

interface WeddingContainerProps {
  guestName: string;
}

export default function WeddingContainer({
  guestName,
}: WeddingContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      {!isOpen && (
        <Cover onOpen={() => setIsOpen(true)} guestName={guestName} />
      )}

      {isOpen && (
        <>
          <Navbar />
          <Hero isVisible={isOpen} />
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