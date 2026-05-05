"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Optimasi Scroll: Gunakan useCallback untuk handleScroll agar tidak dibuat ulang tiap render
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    if (isScrolled !== scrolled) setScrolled(isScrolled);

    const sections = ["hero", "profil", "acara", "galeri", "rsvp"];
    const currentSection = sections.reverse().find((id) => {
      const el = document.getElementById(id);
      return el && window.scrollY >= el.offsetTop - 160;
    });

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [scrolled, activeSection]);

  useEffect(() => {
    // Sync musik dari event global (saat klik 'Buka Undangan')
    const handleGlobalPlay = () => {
      setMusicPlaying(true);
      audioRef.current?.play().catch(() => {});
    };

    window.addEventListener("playMusic", handleGlobalPlay);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("playMusic", handleGlobalPlay);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.volume = 0.4;
      audio.play().catch(() => console.warn("Interaction required"));
    }
    setMusicPlaying(!musicPlaying);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Beranda", id: "hero" },
    { label: "Mempelai", id: "profil" },
    { label: "Acara", id: "acara" },
    { label: "Galeri", id: "galeri" },
    { label: "RSVP", id: "rsvp" },
  ];

  return (
    <>
      <audio ref={audioRef} loop src={weddingConfig.musicUrl} />

      <nav style={{
        ...navStyle,
        padding: scrolled ? "0.8rem 1.5rem" : "1.5rem 2rem",
        background: scrolled ? "rgba(13, 5, 3, 0.9)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(184, 150, 74, 0.2)" : "1px solid transparent",
      }}>
        
        {/* LOGO */}
        <div style={logoStyle} onClick={() => scrollTo("hero")} className="group">
          <span className="font-serif text-2xl text-[#B8964A] transition-transform group-hover:scale-110">
            {weddingConfig.pria.namaPanggilan[0]}
          </span>
          <span className="text-2xl text-[#B8964A]/40 mx-2">❧</span>
          <span className="font-serif text-2xl text-[#B8964A] transition-transform group-hover:scale-110">
            {weddingConfig.wanita.namaPanggilan[0]}
          </span>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative pb-1 ${
                  activeSection === link.id ? "text-[#B8964A]" : "text-[#FAF0E0]/60 hover:text-[#B8964A]"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#B8964A] animate-in slide-in-from-left duration-500" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CONTROLS */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
              musicPlaying ? "border-[#B8964A] text-[#B8964A]" : "border-[#FAF0E0]/20 text-[#FAF0E0]/40"
            }`}
          >
            <span className={musicPlaying ? "animate-spin-slow" : ""}>
              {musicPlaying ? "♪" : "✕"}
            </span>
            <span className="text-[9px] tracking-widest uppercase">
              {musicPlaying ? "Playing" : "Muted"}
            </span>
          </button>

          {/* HAMBURGER (Mobile) */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 z-110">
            <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-[#0d0503] z-100 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
         <div className="space-y-10 text-center">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block text-3xl font-serif text-[#B8964A] tracking-[0.2em] transition-all hover:tracking-[0.4em]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
         </div>
         {/* Ornamen bawah menu mobile */}
         <div className="absolute bottom-10 text-[#B8964A]/20 text-4xl">❧</div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
}

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)", // Safari support
  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
};

const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 110,
};