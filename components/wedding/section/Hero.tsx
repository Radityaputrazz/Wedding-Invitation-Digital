"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isVisible }: { isVisible: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  // Fungsi untuk Generate file iCal (.ics)
  const downloadICal = () => {
    const title = `The Wedding of ${weddingConfig.pria.namaPanggilan} & ${weddingConfig.wanita.namaPanggilan}`;
    const location = weddingConfig.resepsi.namaGedung;
    const description = `Mohon doa restu atas pernikahan kami.`;
    
    // Format tanggal ISO: YYYYMMDDTHHMMSSZ (Pastikan format di weddingData valid)
    const startDate = "20260524T090000"; // Contoh: 24 Mei 2026 jam 09:00
    const endDate = "20260524T210000";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "wedding-event.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const target = new Date(weddingConfig.weddingDate).getTime();
    const interval = setInterval(() => {
      const d = Math.max(target - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d / 3600000) % 24),
        minutes: Math.floor((d / 60000) % 60),
        seconds: Math.floor((d / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-bg", { scale: 1.3, opacity: 0, duration: 2.5, ease: "expo.out" });
      tl.from(".hero-item", { y: 40, opacity: 0, stagger: 0.2, duration: 1.4, ease: "power4.out" }, "-=1.8");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(".hero-bg-inner", { y: "15%", scale: 1.2, ease: "none" }, 0)
        .fromTo(".hero-dynamic-overlay", { opacity: 0 }, { opacity: 1, ease: "none", immediateRender: false }, 0)
        .fromTo(".hero-content", { opacity: 1, filter: "blur(0px)", y: 0 }, { opacity: 0, filter: "blur(20px)", y: -100, ease: "none", immediateRender: false }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0d0503]" id="hero">
      <div className="hero-bg absolute inset-0 z-0">
        <div className="hero-bg-inner absolute inset-0 will-change-transform" style={{ backgroundImage: `url('${weddingConfig.fotoCover}')`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
        <div className="absolute inset-0 bg-linear-to-b from-[#0d0503]/50 via-transparent to-[#0d0503]/90" />
        <div className="hero-dynamic-overlay absolute inset-0 bg-[#0d0503]/80 opacity-0 pointer-events-none" />
      </div>

      <div className="hero-content relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="hero-item text-2xl md:text-3xl tracking-[0.15em] text-[#FAF0E0]/70 mb-5 font-serif">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</p>
        <p className="hero-item text-[10px] tracking-[0.55em] text-[#B8964A]/70 mb-8 uppercase">The Wedding Of</p>

        <div className="space-y-0">
          <h1 className="hero-item font-serif font-light text-[#FAF0E0] leading-none" style={{ fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "0.04em" }}>{weddingConfig.pria.namaPanggilan}</h1>
          <div className="hero-item flex items-center justify-center gap-4 w-36 mx-auto py-2">
            <div className="flex-1 h-px bg-[#B8964A]/20" /><span className="font-serif italic text-[#B8964A] text-3xl leading-none">&</span><div className="flex-1 h-px bg-[#B8964A]/20" />
          </div>
          <h1 className="hero-item font-serif font-light text-[#FAF0E0] leading-none" style={{ fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "0.04em" }}>{weddingConfig.wanita.namaPanggilan}</h1>
        </div>

        <div className="hero-item mt-8 mb-10">
          <p className="text-[10px] tracking-[0.4em] text-[#B8964A]/55 uppercase mb-1">{weddingConfig.akad.tanggal}</p>
          <p className="text-[9px] tracking-[0.25em] text-[#B8964A]/30 uppercase">{weddingConfig.resepsi.namaGedung}</p>
        </div>

        <div className="hero-item flex items-center gap-2 md:gap-3">
          <CountdownUnit v={timeLeft.days} l="Hari" />
          <Colon />
          <CountdownUnit v={timeLeft.hours} l="Jam" />
          <Colon />
          <CountdownUnit v={timeLeft.minutes} l="Menit" />
          <Colon />
          <CountdownUnit v={timeLeft.seconds} l="Detik" />
        </div>

        {/* 🔥 SAVE THE DATE BUTTONS */}
        <div className="hero-item mt-12 flex flex-wrap justify-center gap-4">
          {/* Google Calendar */}
          <button onClick={() => window.open(weddingConfig.googleCalendarUrl, '_blank')} className="group relative px-6 py-3 border border-[#B8964A]/30 bg-[#0d0503]/40 backdrop-blur-md transition-all hover:border-[#B8964A]/80 overflow-hidden">
            <span className="relative z-10 text-[9px] tracking-[0.3em] uppercase text-[#FAF0E0]/80 group-hover:text-[#FAF0E0]">Google Calendar</span>
            <div className="absolute inset-0 z-0 bg-[#B8964A]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          {/* iCal (Apple/Outlook) */}
          <button onClick={downloadICal} className="group relative px-6 py-3 border border-[#B8964A]/30 bg-[#0d0503]/40 backdrop-blur-md transition-all hover:border-[#B8964A]/80 overflow-hidden">
            <span className="relative z-10 text-[9px] tracking-[0.3em] uppercase text-[#FAF0E0]/80 group-hover:text-[#FAF0E0]">iCal / Outlook</span>
            <div className="absolute inset-0 z-0 bg-[#B8964A]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>

        <div className="hero-item absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#B8964A]/30">Scroll</p>
          <div className="scroll-line w-px h-10 bg-linear-to-b from-[#B8964A]/40 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .scroll-line { animation: scrollDown 2s ease infinite; }
        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          80% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          100% { transform: scaleY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function CountdownUnit({ v, l }: { v: number; l: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 border border-[#B8964A]/15 bg-[#0d0503]/60 backdrop-blur-md relative">
      <span className="font-serif text-lg text-[#FAF0E0]">{String(v).padStart(2, "0")}</span>
      <span className="text-[6px] tracking-[0.2em] uppercase text-[#B8964A]/60">{l}</span>
    </div>
  );
}

function Colon() { return <span className="font-serif text-xl text-[#B8964A]/30 pb-4">:</span>; }