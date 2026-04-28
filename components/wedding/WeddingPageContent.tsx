"use client";

import { useState } from "react";
import Cover  from "@/components/wedding/Cover";
import Navbar from "@/components/wedding/Navbar";
import Hero   from "@/components/wedding/Hero";
import Profil from "@/components/wedding/Profil";
import Acara  from "@/components/wedding/Acara";
import Galeri from "@/components/wedding/Galeri";
import RSVP   from "@/components/wedding/RSVP";
import Ucapan from "@/components/wedding/Ucapan";
import Kado   from "@/components/wedding/Kado";
import Footer from "@/components/wedding/Footer";

export default function WeddingPageContent({ guestName }: { guestName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      {!isOpen && (
        <Cover 
          guestName={guestName} 
          onOpen={() => setIsOpen(true)} 
        />
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