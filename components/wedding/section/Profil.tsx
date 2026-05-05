"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_PRIA = [
  "/images/radit.jpeg",
  "/images/sweetie.png",
  "/images/hug.png",
];

const GALLERY_WANITA = [
  "/images/keiani.jpg",
  "/images/love.png",
  "/images/loveit.jpg",
];

export default function Profil() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [indexPria, setIndexPria] = useState(0);
  const [indexWanita, setIndexWanita] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexPria((p) => (p + 1) % GALLERY_PRIA.length);
      setIndexWanita((p) => (p + 1) % GALLERY_WANITA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      tl.from(".profil-header", { y: 50, opacity: 0, duration: 1 })
        .from(".profil-card", { 
          y: 80, 
          opacity: 0, 
          stagger: 0.4, 
          duration: 1.5, 
          ease: "power4.out" 
        }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-4 bg-[#0d0503] text-[#FAF0E0] overflow-hidden font-serif"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="profil-header text-center mb-32">
          <h2 className="text-3xl md:text-4xl text-[#B8964A] mb-6 tracking-[0.3em]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-lg opacity-60 leading-relaxed italic">
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat Allah SWT, kami memperkenalkan profil kedua mempelai.
          </p>
        </div>

        {/* --- TAMPILAN WEB (DESKTOP) --- */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center justify-items-center w-full max-w-5xl mx-auto">
          
          {/* PRIA */}
          <div className="flex flex-col items-center md:-translate-x-8 lg:-translate-x-12">
            <div className="mb-6 flex flex-col items-center">
              <span className="text-xl font-bold text-[#B8964A] tracking-[0.6em] 
              uppercase opacity-50">The</span>
              <span className="text-3xl lg:text-4xl font-bold text-[#B8964A] 
              uppercase tracking-[0.2em] mt-1">Groom</span>
            </div>
            <ProfileCard
              gallery={GALLERY_PRIA}
              index={indexPria}
              data={weddingConfig.pria}
              side="left"
              labelParent="Putra dari"
              isMobile={false}
            />
          </div>
          
          {/* AMPERSAND */}
          <div className="text-[#B8964A] md:text-6xl lg:text-7xl italic mt-32 z-10 px-6 select-none opacity-30">&</div>

          {/* WANITA */}
          <div className="flex flex-col items-center md:translate-x-8 lg:translate-x-12">
            <div className="mb-6 flex flex-col items-center">
              <span className="text-xl font-bold text-[#B8964A] tracking-[0.6em] 
              uppercase opacity-50">The</span>
              <span className="text-3xl lg:text-4xl font-bold text-[#B8964A] 
              uppercase tracking-[0.2em] mt-1">Bride</span>
            </div>
            <ProfileCard
              gallery={GALLERY_WANITA}
              index={indexWanita}
              data={weddingConfig.wanita}
              side="right"
              labelParent="Putri dari"
              isMobile={false}
            />
          </div>
        </div>

        {/* --- TAMPILAN MOBILE --- */}
        <div className="flex md:hidden flex-col items-center justify-center gap-24">
          <div className="flex flex-col items-center">
             <span className="text-[12px] font-bold text-[#B8964A] tracking-[0.5em] uppercase opacity-50 mb-2">The Groom</span>
             <ProfileCard
                gallery={GALLERY_PRIA}
                index={indexPria}
                data={weddingConfig.pria}
                side="left"
                labelParent="Putra dari"
                isMobile={true}
              />
          </div>

          <div className="text-[#B8964A] text-5xl italic -my-12 z-10 opacity-20">&</div>

          <div className="flex flex-col items-center">
            <span className="text-[12px] font-bold text-[#B8964A] tracking-[0.5em] uppercase opacity-50 mb-2">The Bride</span>
            <ProfileCard
              gallery={GALLERY_WANITA}
              index={indexWanita}
              data={weddingConfig.wanita}
              side="right"
              labelParent="Putri dari"
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ gallery, index, data, side, labelParent, isMobile }: any) {
  return (
    <div className={`profil-card relative flex flex-col items-center
      ${isMobile ? 'w-45' : 'w-65 lg:w-70'}`}
    >
      {/* BORDER FOTO */}
      <div className="relative w-full aspect-3/4 z-10 shadow-2xl p-1.5 border-2 md:border-4 
      border-[#B8964A]/80 rounded-2xl bg-[#0d0503]">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1a0c0a]">
          {gallery.map((img: string, i: number) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <Image
                  key={i}
                  src={img}
                  alt={data.namaLengkap}
                  fill
                  // Tambahkan baris ini:
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-all duration-1500 ease-in-out ${
                    index === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
                  }`}
                  priority={i === 0} // Opsional: Beri prioritas pada gambar pertama
                />
            </div>
          ))}
        </div>
      </div>

      {/* KOTAK BIODATA */}
      <div className={`relative w-[115%] p-4 md:p-6 border-2 md:border-4 border-[#B8964A] bg-[#0d0503]/95 backdrop-blur-md rounded-xl text-center shadow-2xl -mt-10 md:-mt-14 z-20 transition-transform duration-500
        ${side === 'left' 
          ? (isMobile ? '-translate-x-6' : 'md:-translate-x-12 lg:-translate-x-16') 
          : (isMobile ? 'translate-x-6' : 'md:translate-x-12 lg:translate-x-16')}
      `}>
        <h3 className={`${isMobile ? 'text-sm' : 'text-lg lg:text-xl'} text-[#FAF0E0] mb-2 font-bold tracking-tight whitespace-nowrap`}>
          {data.namaLengkap}
        </h3>
        
        <div className="w-8 h-px bg-[#B8964A] mb-3 mx-auto opacity-50" />
        
        <div className="flex flex-col items-center scale-90 opacity-80 italic mb-4">
          <p className="text-[8px] lg:text-[10px] uppercase tracking-widest text-[#B8964A] mb-1">{labelParent}</p>
          <p className="text-xs lg:text-sm">{data.namaAyah} & {data.namaIbu}</p>
        </div>

        {/* TOMBOL INSTAGRAM YANG SUDAH DIPERBAIKI */}
        <div className="pt-2 border-t border-[#B8964A]/20">
          <Link 
            href={`https://instagram.com/${data.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border 
            border-[#B8964A]/30 hover:border-[#B8964A] hover:bg-[#B8964A]/10 transition-all duration-300"
          >
            {/* Ikon Instagram Manual */}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-[#B8964A] group-hover:scale-110 transition-transform"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            
            <span className="text-[10px] lg:text-xs text-[#B8964A] tracking-widest font-medium">
              @{data.instagram}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}