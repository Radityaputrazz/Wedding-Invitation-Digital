// components/wedding/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Efek shadow navbar saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setMusicPlaying(true);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
      <audio ref={audioRef} loop preload="none">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <nav style={{
        ...navStyle,
        boxShadow: scrolled ? "0 2px 20px rgba(44,24,16,0.08)" : "none",
      }}>

        {/* Logo */}
        <div style={logoStyle}>
          {weddingConfig.pria.namaPanggilan[0]} ❧ {weddingConfig.wanita.namaPanggilan[0]}
        </div>

        {/* Links — desktop */}
        <ul style={linksStyle}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                style={linkBtnStyle}
                onMouseOver={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseOut={e => (e.currentTarget.style.color = "var(--text-mid)")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Kanan: musik + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={toggleMusic}
            style={musicBtnStyle}
            onMouseOver={e => (e.currentTarget.style.borderColor = "var(--gold)")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "var(--gold-pale)")}
            title={musicPlaying ? "Matikan musik" : "Putar musik"}
          >
            {musicPlaying ? "♪ ON" : "♪ OFF"}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={hamburgerStyle}
            aria-label="Menu"
          >
            <span style={barStyle(menuOpen, "top")} />
            <span style={barStyle(menuOpen, "mid")} />
            <span style={barStyle(menuOpen, "bot")} />
          </button>
        </div>
      </nav>

      {/* Dropdown menu mobile */}
      <div style={{
        ...mobileMenuStyle,
        maxHeight: menuOpen ? "400px" : "0",
        opacity: menuOpen ? 1 : 0,
      }}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            style={mobileLinkStyle}
            onMouseOver={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseOut={e => (e.currentTarget.style.color = "var(--text-mid)")}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0,
  zIndex: 50,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  background: "rgba(250, 246, 240, 0.92)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid var(--gold-pale)",
  transition: "box-shadow 0.3s",
};

const logoStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.3rem",
  color: "var(--gold)",
  letterSpacing: "0.05em",
};

const linksStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  listStyle: "none",
  // Sembunyikan di mobile via media query — kita handle dengan menuOpen
};

const linkBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-mid)",
  cursor: "pointer",
  transition: "color 0.3s",
  padding: "0.2rem 0",
};

const musicBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--gold-pale)",
  padding: "0.4rem 0.8rem",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  color: "var(--text-light)",
  cursor: "pointer",
  transition: "all 0.3s",
};

const hamburgerStyle: React.CSSProperties = {
  display: "none", // tampil hanya di mobile — override via media query
  flexDirection: "column",
  justifyContent: "space-between",
  width: "22px",
  height: "16px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
};

function barStyle(open: boolean, pos: "top" | "mid" | "bot"): React.CSSProperties {
  return {
    display: "block",
    width: "100%",
    height: "1.5px",
    background: "var(--brown)",
    transition: "all 0.3s",
    transform:
      open && pos === "top" ? "translateY(7px) rotate(45deg)"  :
      open && pos === "bot" ? "translateY(-7px) rotate(-45deg)" :
      open && pos === "mid" ? "scaleX(0)" : "none",
  };
}

const mobileMenuStyle: React.CSSProperties = {
  position: "fixed",
  top: "57px",
  left: 0, right: 0,
  zIndex: 49,
  background: "rgba(250, 246, 240, 0.97)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid var(--gold-pale)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: "max-height 0.4s ease, opacity 0.3s ease",
};

const mobileLinkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  borderBottom: "1px solid var(--gold-pale)",
  padding: "1rem 2rem",
  textAlign: "left",
  fontSize: "0.85rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--text-mid)",
  cursor: "pointer",
  transition: "color 0.3s",
};