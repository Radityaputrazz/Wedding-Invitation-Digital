"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { weddingConfig } from "@/lib/weddingData";

interface CoverProps {
  onOpen: () => void;
  guestName: string;
}

export default function Cover({ onOpen, guestName }: CoverProps) {
  const [open, setOpen] = useState(false);
  const gsapRef = useRef<HTMLDivElement>(null); // ← GSAP pakai ini
  const audioRef = useRef<HTMLAudioElement>(null);

  const formattedGuest =
    guestName?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ||
    "Tamu Undangan";

  // Entry animation — GSAP animasikan konten, bukan wrapper
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cover-item", {
        y: 55,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.16,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.4,
      });
    }, gsapRef);

    return () => ctx.revert();
  }, []);

  // Exit animation
 const handleOpen = () => {
  if (audioRef.current) {
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {});
  }

  const tl = gsap.timeline({
    onComplete: () => {
      setOpen(true);
      onOpen();
      window.dispatchEvent(new Event("wedding:open"));
    },
  });

  // Items keluar
  tl.to(".cover-item", {
    y: -35,
    opacity: 0,
    filter: "blur(8px)",
    stagger: 0.04,
    duration: 0.45,
    ease: "power2.in",
  });

  // Cover fade + blur — durasi sama dengan Hero entry
  tl.to(gsapRef.current, {
    opacity: 0,
    filter: "blur(24px)",
    scale: 1.06,
    duration: 0.8,       // ← lebih cepat agar Hero langsung ambil alih
    ease: "power3.inOut",
  }, "-=0.2");
};

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!open && (
          <motion.div
            // Framer Motion handle fade in/out wrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-screen z-9999 flex items-center justify-center bg-[#0d0503] overflow-hidden"
          >

            {/* Background Ken Burns */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  scale: [1.05, 1.08, 1.05],
                  x: [0, 6, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('/images/sweet.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 36%",
                }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Overlay sinematik */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0d0503]/60 via-transparent to-[#0d0503]/95" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0d0503]/40 via-transparent to-[#0d0503]/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,5,3,0.75)_100%)]" />

            {/* Ornamen sudut */}
            <div className="absolute top-6 left-6 w-14 h-14 border-t border-l border-[#B8964A]/30" />
            <div className="absolute top-6 right-6 w-14 h-14 border-t border-r border-[#B8964A]/30" />
            <div className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-[#B8964A]/30" />
            <div className="absolute bottom-6 right-6 w-14 h-14 border-b border-r border-[#B8964A]/30" />

            {/* Garis vertikal */}
            <div className="absolute top-[15%] bottom-[15%] left-10 w-px bg-linear-to-b 
            from-transparent via-[#B8964A]/15 to-transparent hidden md:block" />
            <div className="absolute top-[15%] bottom-[15%] right-10 w-px bg-linear-to-b 
            from-transparent via-[#B8964A]/15 to-transparent hidden md:block" />

            {/* Light sweep */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 7 }}
              className="absolute top-0 bottom-0 w-full pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                transform: "skewX(-25deg)",
              }}
            />

            {/* Atmospheric glow */}
            <div className="absolute w-125 h-75 bg-[#B8964A]/8 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* ─── KONTEN — GSAP pegang ref ini ─── */}
            <div ref={gsapRef} className="relative z-10 text-center px-6 max-w-lg w-full">

              {/* Bismillah */}
              <p className="cover-item font-serif text-3xl md:text-4xl tracking-[0.15em] text-[#FAF0E0]/75 mb-5">
                بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
              </p>

              {/* Ornamen */}
              <div className="cover-item flex items-center justify-center gap-3 w-32 mx-auto mb-5">
                <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#B8964A]/60" />
                <span className="text-[#B8964A] text-[8px]">◆</span>
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#B8964A]/60" />
              </div>

              {/* Label */}
              <p className="cover-item text-[13px] tracking-[0.55em] font-bold text-[#B8964A] mb-8 uppercase">
                The Wedding Of
              </p>

              {/* Nama */}
              <div className="space-y-1 mb-3">
                <h2
                  className="cover-item font-serif font-light leading-none"
                  style={{
                    fontSize: "clamp(3rem, 12vw, 5.5rem)",
                    color: "#FAF0E0",
                    letterSpacing: "0.03em",
                    textShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {weddingConfig.pria.namaPanggilan}
                </h2>

                <div className="cover-item flex items-center justify-center gap-4 w-40 mx-auto py-1">
                  <div className="flex-1 h-px bg-[#B8964A]/20" />
                  <span className="font-serif italic text-[#B8964A] text-3xl leading-none">
                    &
                  </span>
                  <div className="flex-1 h-px bg-[#B8964A]/20" />
                </div>

                <h2
                  className="cover-item font-serif font-light leading-none"
                  style={{
                    fontSize: "clamp(3rem, 12vw, 5.5rem)",
                    color: "#FAF0E0",
                    letterSpacing: "0.03em",
                    textShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {weddingConfig.wanita.namaPanggilan}
                </h2>
              </div>

              {/* Ornamen bawah */}
              <div className="cover-item flex items-center justify-center gap-3 w-32 mx-auto mt-4 mb-8">
                <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#B8964A]/60" />
                <span className="text-[#B8964A] text-[8px]">◆</span>
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#B8964A]/60" />
              </div>

              {/* Tanggal */}
              <p className="cover-item text-[13px] tracking-[0.4em] font-bold text-[#B8964A] uppercase mb-8">
                {weddingConfig.akad.tanggal}
              </p>

              {/* Box tamu */}
              <div className="cover-item mb-10 py-5 px-8 border border-[#B8964A]/20 bg-[#0d0503]/50 backdrop-blur-md inline-block min-w-50 relative">
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#B8964A]/40" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#B8964A]/40" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#B8964A]/40" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#B8964A]/40" />

                <p className="text-[11px] tracking-[0.2em] uppercase text-[#B8964A] mb-1.5">
                  Kepada Yth.
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-[#FAF0E0] font-light tracking-wide">
                  {formattedGuest}
                </h3>
                <p className="text-[11px] tracking-[0.2em] text-[#B8964A] mt-1.5 uppercase">
                  & Keluarga
                </p>
              </div>

              {/* Tombol */}
              <div className="cover-item">
                <button
                  onClick={handleOpen}
                  className="group relative px-12 py-4 overflow-hidden border border-[#B8964A]/50 bg-transparent text-[#D4B06A] hover:text-[#0d0503] transition-colors duration-500"
                  aria-label="Buka Undangan"
                >
                  <div className="absolute inset-0 bg-[#B8964A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 text-[11px] font-bold tracking-[0.4em] uppercase flex items-center gap-3">
                    <span>♪</span>
                    <span>Buka Undangan</span>
                  </span>
                </button>

                <p className="mt-4 text-[9px] tracking-[0.25em] uppercase text-[#B8964A]/25 animate-pulse">
                  Klik untuk membuka
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}