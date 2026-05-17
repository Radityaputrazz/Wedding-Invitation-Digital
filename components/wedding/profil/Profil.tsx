"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";
import ProfilDesktop from "./ProfilDesktop";
import ProfilMobile from "./ProfilMobile";
import { GALLERY_PRIA, GALLERY_WANITA } from "./galleryData";
import { initProfilAnimations } from "./animations";

gsap.registerPlugin(ScrollTrigger);

export default function Profil() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [indexPria, setIndexPria] = useState(0);
  const [indexWanita, setIndexWanita] = useState(0);

  // Auto-slide galeri foto setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexPria((p) => (p + 1) % GALLERY_PRIA.length);
      setIndexWanita((p) => (p + 1) % GALLERY_WANITA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = initProfilAnimations(sectionRef);
    return () => ctx.revert();
  }, []);

  const priaProps = {
    gallery: GALLERY_PRIA,
    index: indexPria,
    data: weddingConfig.pria,
    side: "left" as const,
    labelParent: "Putra dari",
  };

  const wanitaProps = {
    gallery: GALLERY_WANITA,
    index: indexWanita,
    data: weddingConfig.wanita,
    side: "right" as const,
    labelParent: "Putri dari",
  };

  return (
    <section
      ref={sectionRef}
      id="profil"
      className="relative py-24 md:py-40 px-4 bg-[#0d0503] text-[#FAF0E0] overflow-hidden font-serif"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="profil-header text-center mb-32">
          <h2 className="text-3xl md:text-4xl text-[#B8964A] mb-6 tracking-[0.3em]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-lg opacity-60 leading-relaxed italic">
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat
            Allah SWT, kami ingin mengundang bapak/ibu/saudara/i untuk menghadiri acara pernikahan kami.
          </p>
        </div>

        {/* Desktop layout */}
        <ProfilDesktop priaProps={priaProps} wanitaProps={wanitaProps} />

        {/* Mobile layout */}
        <ProfilMobile priaProps={priaProps} wanitaProps={wanitaProps} />
      </div>
    </section>
  );
}