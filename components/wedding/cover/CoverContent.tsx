import { RefObject } from "react";
import { weddingConfig } from "@/lib/weddingData";
import GuestBox from "./GuestBox";
import Ornament from "./Ornament";

interface CoverContentProps {
  gsapRef: RefObject<HTMLDivElement | null>;
  formattedGuest: string;
  onOpen: () => void;
}

export default function CoverContent({ gsapRef, formattedGuest, onOpen }: CoverContentProps) {
  return (
    <div ref={gsapRef} className="relative z-10 text-center px-6 max-w-lg w-full">

      {/* Bismillah */}
      <p className="cover-item font-serif text-3xl md:text-4xl tracking-[0.15em] text-[#FAF0E0]/75 mb-5">
        بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
      </p>

      <Ornament className="cover-item mb-5" />

      {/* Label */}
      <p className="cover-item text-[13px] tracking-[0.55em] font-bold text-[#B8964A] mb-8 uppercase">
        The Wedding Of
      </p>

      {/* Nama pasangan */}
      <div className="space-y-1 mb-3">
        <h2
          className="cover-item font-serif font-light leading-none"
          style={{
            fontSize: "clamp(3rem, 12vw, 5.5rem)",
            color: "#FAF0E0/70",
            letterSpacing: "0.03em",
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          {weddingConfig.pria.namaPanggilan}
        </h2>

        <div className="cover-item flex items-center justify-center gap-4 w-40 mx-auto py-1">
          <div className="flex-1 h-px bg-[#B8964A]/20" />
          <span className="font-serif italic text-[#B8964A] text-3xl leading-none">&</span>
          <div className="flex-1 h-px bg-[#B8964A]/20" />
        </div>

        <h2
          className="cover-item font-serif font-light leading-none"
          style={{
            fontSize: "clamp(3rem, 12vw, 5.5rem)",
            color: "#FAF0E0/70",
            letterSpacing: "0.03em",
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          {weddingConfig.wanita.namaPanggilan}
        </h2>
      </div>

      <Ornament className="cover-item mt-4 mb-8" />

      {/* Tanggal */}
      <p className="cover-item text-[13px] tracking-[0.4em] font-bold text-[#B8964A] uppercase mb-8">
        {weddingConfig.akad.tanggal}
      </p>

      {/* Box tamu */}
      <div className="cover-item mb-10">
        <GuestBox formattedGuest={formattedGuest} />
      </div>

      {/* Tombol buka */}
      <div className="cover-item">
        <button
          onClick={onOpen}
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
  );
}