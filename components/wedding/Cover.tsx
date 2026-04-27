// components/wedding/Cover.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { weddingConfig } from "@/lib/weddingData";
import { SpeedInsights } from "@vercel/speed-insights/next"

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  const [hiding, setHiding] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function handleOpen() {
    setHiding(true);
    audioRef.current?.play().catch(() => {});
    setTimeout(() => onOpen(), 800);
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <div style={{
        ...overlayStyle,
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(1.05)" : "scale(1)",
        pointerEvents: hiding ? "none" : "auto",
      }}>

        {/* Background & Patterns */}
        <div style={bgStyle} />
        <div style={patternStyle} />

        {/* Ornamen Sudut */}
        <CornerOrnament pos="tl" />
        <CornerOrnament pos="tr" />
        <CornerOrnament pos="bl" />
        <CornerOrnament pos="br" />

        {/* Konten Utama */}
        <div style={{
          ...contentStyle,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
        }}>

          <p style={bismillahStyle}>بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</p>

          <Ornament />

          <p style={labelStyle}>The Wedding Of</p>

          <h1 style={nameStyle}>{weddingConfig.pria.namaPanggilan}</h1>

          <div style={ampWrapStyle}>
            <div style={ampLineStyle} />
            <span style={ampStyle}>&</span>
            <div style={ampLineStyle} />
          </div>

          <h1 style={nameStyle}>{weddingConfig.wanita.namaPanggilan}</h1>

          <Ornament isBottom />

          <div style={infoWrapStyle}>
            <p style={dateStyle}>{weddingConfig.akad.tanggal}</p>
            <p style={locationStyle}>{weddingConfig.resepsi.namaGedung} · Jakarta</p>
          </div>

          <button
            onClick={handleOpen}
            style={btnStyle}
            className="btn-open-undangan"
          >
            ♪ Buka Undangan
          </button>

          <p style={hintStyle}>Klik untuk membuka</p>

        </div>
      </div>

      <style jsx>{`
        .btn-open-undangan {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .btn-open-undangan:hover {
          background: var(--gold) !important;
          color: #1a0a05 !important;
          letter-spacing: 0.3em !important;
          box-shadow: 0 0 20px rgba(212, 176, 106, 0.4);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

function Ornament({ isBottom }: { isBottom?: boolean }) {
  return (
    <div style={{ ...ornamentWrapStyle, marginBottom: isBottom ? "0" : "1.5rem", marginTop: isBottom ? "1.5rem" : "0" }}>
      <div style={ornamentLineStyle} />
      <span style={ornamentDiamondStyle}>◆</span>
      <div style={ornamentLineStyle} />
    </div>
  );
}

function CornerOrnament({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: "2rem", left: "2rem" },
    tr: { top: "2rem", right: "2rem" },
    bl: { bottom: "2rem", left: "2rem" },
    br: { bottom: "2rem", right: "2rem" },
  };

  const borders: Record<string, React.CSSProperties> = {
    tl: { borderWidth: "1px 0 0 1px" },
    tr: { borderWidth: "1px 1px 0 0" },
    bl: { borderWidth: "0 0 1px 1px" },
    br: { borderWidth: "0 1px 1px 0" },
  };

  return (
    <div style={{
      position: "absolute",
      width: "40px",
      height: "40px",
      borderStyle: "solid",
      borderColor: "rgba(184,150,74,0.3)",
      ...positions[pos],
      ...borders[pos],
    }} />
  );
}

// ─── Styles: Containers ───────────────────────────────────

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  transition: "opacity 0.8s ease, transform 0.8s ease",
};

const bgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at center, #2d1810 0%, #1a0a05 70%, #0d0503 100%)",
};

const patternStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  opacity: 0.03,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4B06A'%3E%3Cpath d='M30 0L33 27L60 30L33 33L30 60L27 33L0 30L27 27Z'/%3E%3C/g%3E%3C/svg%3E")`,
  backgroundSize: "60px 60px",
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  padding: "2rem",
  width: "100%",
  maxWidth: "600px",
  transition: "opacity 1.2s ease, transform 1.2s ease",
};

// ─── Styles: Typography ───────────────────────────────────

const bismillahStyle: React.CSSProperties = {
  color: "var(--gold-light)",
  fontSize: "1.2rem",
  fontWeight: 300,
  letterSpacing: "0.1em",
  marginBottom: "2rem",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(212, 176, 106, 0.6)",
  fontSize: "0.75rem",
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const nameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(3.5rem, 12vw, 5.5rem)",
  fontWeight: 300,
  lineHeight: 1.1,
  color: "#FAF0E0",
  letterSpacing: "0.02em",
};

const infoWrapStyle: React.CSSProperties = {
  marginTop: "1.5rem",
};

const dateStyle: React.CSSProperties = {
  color: "var(--gold-light)",
  fontSize: "0.9rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontWeight: 300,
};

const locationStyle: React.CSSProperties = {
  color: "rgba(184,150,74,0.4)",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginTop: "0.6rem",
};

// ─── Styles: Ornaments & UI ───────────────────────────────

const ornamentWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  width: "140px",
  margin: "0 auto",
};

const ornamentLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
};

const ornamentDiamondStyle: React.CSSProperties = {
  color: "var(--gold)",
  fontSize: "0.6rem",
};

const ampWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  margin: "1rem auto",
  width: "180px",
};

const ampLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "rgba(184,150,74,0.2)",
};

const ampStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "2.5rem",
  color: "var(--gold)",
  fontStyle: "italic",
};

const btnStyle: React.CSSProperties = {
  display: "block",
  margin: "3rem auto 0",
  padding: "1rem 3rem",
  background: "transparent",
  color: "var(--gold-light)",
  border: "1px solid rgba(184,150,74,0.5)",
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
};

const hintStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  fontSize: "0.65rem",
  color: "rgba(184,150,74,0.3)",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  animation: "fadeIn 2s ease infinite alternate",
};