"use client";

import { useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";
import EventCard from "./EventCard";
import { initAcaraAnimations } from "./animations";

export default function Acara() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = initAcaraAnimations(sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="acara"
      ref={sectionRef}
      className="relative py-32 bg-[#1a1510] text-[#FAF0E0] font-serif text-center"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.5em] text-[#B8964A] uppercase font-bold">
            Save The Date
          </span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-2 tracking-wide font-light">
            Waktu & Tempat
          </h2>
          <div className="w-16 h-px bg-[#B8964A]/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <EventCard type="Akad Nikah" data={weddingConfig.akad} icon="💍" />
          <EventCard type="Resepsi" data={weddingConfig.resepsi} icon="🥂" />
        </div>
      </div>
    </section>
  );
}