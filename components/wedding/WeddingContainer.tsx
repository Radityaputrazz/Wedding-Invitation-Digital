// app/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

// Komponen internal untuk menangani logika SearchParams
function WeddingContent() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";

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

// Komponen Utama dengan Suspense (Wajib di Next.js jika pakai useSearchParams)
export default function WeddingPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0d0503", height: "100vh" }} />}>
      <WeddingContent />
    </Suspense>
  );
}