// components/wedding/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Animasi masuk yang halus
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={styles.heroSection}>
      {/* 1. Background Layer (Tetap Full Screen) */}
      <div style={styles.bgWrapper}>
        <div style={styles.bgImage} />
        <div style={styles.bgOverlay} />
      </div>

      {/* 2. Content Layer (Didorong ke Bawah) */}
      <div style={{
        ...styles.content,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
      }}>
        
        {/* Bismillah opsional, jika dilepas, konten otomatis naik sedikit */}
        <p style={styles.bismillah}>
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
        </p>
        
        <p style={styles.subTitle}>Mempelai Pria & Wanita</p>
        
        <div style={styles.nameWrapper}>
          <h1 style={styles.mainName}>{weddingConfig.pria.namaPanggilan}</h1>
          <span style={styles.ampersand}>&</span>
          <h1 style={styles.mainName}>{weddingConfig.wanita.namaPanggilan}</h1>
        </div>

        <div style={styles.dividerWrapper}>
          <div style={styles.line} />
          <p style={styles.dateText}>{weddingConfig.akad.tanggal}</p>
          <div style={styles.line} />
        </div>

        <p style={styles.locationText}>
          {weddingConfig.resepsi.namaGedung} — Jakarta
        </p>
      </div>

      {/* 3. Scroll Indicator (Di paling bawah) */}
      <div style={styles.scrollIndicator}>
        <div className="mouse-line" />
      </div>

      <style jsx>{`
        .mouse-line {
          width: 2px;
          height: 50px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollDown 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          80% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ─── CLEAN STYLES OBJECT ─────────────────────────────────────

const styles = {
  heroSection: {
    height: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center", // ◄ HAPUS INI agar didorong oleh padding-top
    alignItems: "center",
    overflow: "hidden",
    background: "#0d0503", // Warna dasar gelap
  } as React.CSSProperties,

  bgWrapper: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  } as React.CSSProperties,

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url('/images/cover.png')`, // Ganti dengan path foto utama statis
    backgroundSize: "cover",
    backgroundPosition: "center 25%",
    filter: "grayscale(15%)", // Sedikit desaturate untuk kesan klasik
  } as React.CSSProperties,

  bgOverlay: {
    position: "absolute",
    inset: 0,
    // Overlay radial: terang di tengah, gelap di pinggir
    background: "radial-gradient(circle at center, rgba(26,21,16,0.3) 0%, rgba(13,5,3,0.9) 100%)",
  } as React.CSSProperties,

  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 2rem",
    // ─── PERBAIKAN DI SINI ───
    paddingTop: "15vh", // ◄ Ini yang mendorong konten turun (15% dari tinggi layar)
    // ────────────────────────
    width: "100%",
    maxWidth: "800px",
    transition: "all 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
  } as React.CSSProperties,

  bismillah: {
    color: "#FAF0E0",
    fontSize: "1.3rem",
    fontWeight: 300,
    opacity: 0.7,
    marginBottom: "2rem",
    letterSpacing: "0.1em",
  } as React.CSSProperties,

  subTitle: {
    color: "var(--gold)",
    fontSize: "0.8rem",
    letterSpacing: "0.6em",
    textTransform: "uppercase",
    marginBottom: "1rem",
    fontWeight: 300,
  } as React.CSSProperties,

  nameWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
  } as React.CSSProperties,

  mainName: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(3rem, 9vw, 6rem)", // Responsif
    color: "#FAF0E0",
    fontWeight: 300,
    lineHeight: 1,
    textShadow: "0 10px 40px rgba(0,0,0,0.6)", // Glow tipis agar kontras
  } as React.CSSProperties,

  ampersand: {
    fontFamily: "var(--font-serif)",
    color: "var(--gold)",
    fontSize: "2.5rem",
    fontStyle: "italic",
    margin: "0.8rem 0",
    opacity: 0.8,
  } as React.CSSProperties,

  dividerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "3rem",
  } as React.CSSProperties,

  line: {
    width: "50px",
    height: "1px",
    background: "rgba(184,150,74,0.3)",
  } as React.CSSProperties,

  dateText: {
    color: "#FAF0E0",
    fontSize: "0.95rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    fontWeight: 300,
  } as React.CSSProperties,

  locationText: {
    color: "rgba(184,150,74,0.5)",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginTop: "0.8rem",
    fontWeight: 300,
  } as React.CSSProperties,

  scrollIndicator: {
    position: "absolute",
    bottom: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    opacity: 0.6,
  } as React.CSSProperties,
};