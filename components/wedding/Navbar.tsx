// components/wedding/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Deteksi scroll dan ukuran layar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.volume = 0.4;
      audio.play().catch(() => {
        alert("Ketuk layar untuk memulai musik");
      });
      setMusicPlaying(true);
    }
  }

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Tinggi navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  }

  const navLinks = [
    { label: "Beranda",  id: "hero"   },
    { label: "Mempelai", id: "profil" },
    { label: "Acara",    id: "acara"  },
    { label: "Galeri",   id: "galeri" },
    { label: "RSVP",     id: "rsvp"   },
    { label: "Kado",     id: "kado"   },
  ];

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <nav style={{
        ...navStyle,
        boxShadow: scrolled ? "0 4px 25px rgba(0,0,0,0.06)" : "none",
        padding: scrolled ? "0.8rem 2rem" : "1.2rem 2rem",
        background: scrolled ? "rgba(250, 246, 240, 0.95)" : "rgba(250, 246, 240, 0.8)",
      }}>

        {/* Logo */}
        <div style={logoStyle} onClick={() => scrollTo("hero")}>
          {weddingConfig.pria.namaPanggilan[0]} ❧ {weddingConfig.wanita.namaPanggilan[0]}
        </div>

        {/* Links — Desktop only */}
        {!isMobile && (
          <ul style={linksStyle}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="nav-link"
                  style={linkBtnStyle}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggleMusic}
            className="music-toggle"
            style={{
              ...musicBtnStyle,
              borderColor: musicPlaying ? "var(--gold)" : "var(--gold-pale)",
              color: musicPlaying ? "var(--gold)" : "var(--text-light)",
            }}
          >
            <span style={{ fontSize: "1rem" }}>{musicPlaying ? "🔊" : "🔇"}</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 700 }}>{musicPlaying ? "ON" : "OFF"}</span>
          </button>

          {/* Hamburger Menu (Mobile Only) */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={hamburgerStyle}
              aria-label="Toggle Menu"
            >
              <div style={barStyle(menuOpen, "top")} />
              <div style={barStyle(menuOpen, "mid")} />
              <div style={barStyle(menuOpen, "bot")} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Overlay */}
      <div style={{
        ...mobileMenuStyle,
        maxHeight: menuOpen ? "100vh" : "0",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
      }}>
        <div style={{ padding: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={mobileLinkStyle}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          width: 0; height: 1px;
          bottom: 0; left: 0;
          background-color: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--gold) !important; }
        .nav-link:hover:after { width: 100%; }
        
        .music-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .music-toggle:hover {
          transform: scale(1.05);
          background: rgba(184, 150, 74, 0.05);
        }
      `}</style>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(184, 150, 74, 0.1)",
  transition: "all 0.4s ease",
};

const logoStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  color: "var(--gold)",
  letterSpacing: "0.05em",
  cursor: "pointer",
  userSelect: "none",
};

const linksStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const linkBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--text-mid)",
  cursor: "pointer",
  fontWeight: 500,
};

const musicBtnStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.5)",
  border: "1px solid",
  padding: "0.5rem 0.8rem",
  borderRadius: "50px",
  cursor: "pointer",
};

const hamburgerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  width: "35px",
  height: "35px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const mobileMenuStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0,
  bottom: 0,
  zIndex: 90,
  background: "#FAF6F0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
};

const mobileLinkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: "1.5rem",
  fontSize: "1.2rem",
  fontFamily: "var(--font-serif)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--brown)",
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

function barStyle(open: boolean, pos: "top" | "mid" | "bot"): React.CSSProperties {
  const base: React.CSSProperties = {
    width: "22px",
    height: "2px",
    background: "var(--gold)",
    transition: "all 0.3s ease",
  };

  if (open) {
    if (pos === "top") return { ...base, transform: "translateY(7px) rotate(45deg)" };
    if (pos === "mid") return { ...base, opacity: 0, transform: "translateX(-10px)" };
    if (pos === "bot") return { ...base, transform: "translateY(-7px) rotate(-45deg)" };
  }
  return base;
}