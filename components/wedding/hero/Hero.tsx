"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";
import HeroBackground from "./HeroBackground";
import HeroNames from "./HeroNames";
import HeroCountdown from "./HeroCountdown";
import HeroSaveButtons from "./HeroSaveButtons";
import HeroScrollIndicator from "./HeroScrollIndicator";
import { initHeroAnimations } from "./animations";
import { downloadICal } from "./ical";
import { useCountdown } from "./useCountdown";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isVisible }: { isVisible: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeLeft = useCountdown(weddingConfig.weddingDate);

  useEffect(() => {
    if (!isVisible) return;
    const ctx = initHeroAnimations(sectionRef);
    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#0d0503]"
    >
      <HeroBackground />

      <div className="hero-content relative z-20 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
        {/* Bismillah */}
        <p className="hero-item text-2xl md:text-3xl tracking-[0.15em] text-[#FAF0E0]/70 mb-6 font-serif">
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
        </p>

        <p className="hero-item text-[11px] tracking-[0.55em] text-[#B8964A] mb-6 uppercase">
          The Wedding Of
        </p>

        <HeroNames />

        {/* Tanggal & Venue */}
        <div className="hero-item mt-8 mb-10">
          <p className="text-[11px] tracking-[0.4em] text-[#B8964A] uppercase mb-2">
            {weddingConfig.akad.tanggal}
          </p>
          <p className="text-[11px] tracking-[0.25em] text-[#B8964A]/55 uppercase">
            {weddingConfig.resepsi.namaGedung}
          </p>
        </div>

        <HeroCountdown timeLeft={timeLeft} />

        <HeroSaveButtons onDownloadICal={downloadICal} />
        <HeroScrollIndicator />
      </div>
    </section>
  );
}