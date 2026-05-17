"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { weddingConfig } from "@/lib/weddingData";
import NavLogo from "./NavLogo";
import Navlink from "./NavLink";
import NavControls from "./NavControls";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./navLinks";
import { navStyle } from "./styles";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    if (isScrolled !== scrolled) setScrolled(isScrolled);

    const currentSection = [...navLinks]
      .map((l) => l.id)
      .reverse()
      .find((id) => {
        const el = document.getElementById(id);
        return el && window.scrollY >= el.offsetTop - 160;
      });

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [scrolled, activeSection]);

  useEffect(() => {
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
      window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <audio ref={audioRef} loop src={weddingConfig.musicUrl} />

      <nav
        style={{
          ...navStyle,
          padding: scrolled ? "0.8rem 1.5rem" : "1.5rem 2rem",
          background: scrolled ? "rgba(13, 5, 3, 0.9)" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(184, 150, 74, 0.2)"
            : "1px solid transparent",
        }}
      >
        <NavLogo onScrollTo={scrollTo} />
        <Navlink activeSection={activeSection} onScrollTo={scrollTo} />
        <NavControls
          musicPlaying={musicPlaying}
          menuOpen={menuOpen}
          onToggleMusic={toggleMusic}
          onToggleMenu={() => setMenuOpen(!menuOpen)}
        />
      </nav>

      <MobileMenu open={menuOpen} onScrollTo={scrollTo} />
    </>
  );
}