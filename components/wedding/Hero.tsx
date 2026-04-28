// components/wedding/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={styles.heroSection}>
      {/* Background Layer */}
      <div style={styles.bgWrapper}>
        <div 
          style={{
            ...styles.bgImage,
            transform: mounted ? "scale(1)" : "scale(1.1)",
            transition: "transform 10s ease-out, opacity 2s ease-in",
            opacity: mounted ? 1 : 0
          }} 
        />
        <div style={styles.bgOverlayTop} />
        <div style={styles.bgOverlayBottom} />
        <div style={styles.bgOverlayRadial} />
      </div>

      {/* Ornamen Sudut (Frame) */}
      <div style={{ ...styles.corner, top: "2rem", left: "2rem", borderWidth: "1px 0 0 1px" }} />
      <div style={{ ...styles.corner, top: "2rem", right: "2rem", borderWidth: "1px 1px 0 0" }} />
      <div style={{ ...styles.corner, bottom: "2rem", left: "2rem", borderWidth: "0 0 1px 1px" }} />
      <div style={{ ...styles.corner, bottom: "2rem", right: "2rem", borderWidth: "0 1px 1px 0" }} />

      {/* Konten Utama */}
      <div style={{
        ...styles.content,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
      }}>
        {/* Bismillah */}
        <p style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</p>

        {/* Ornamen Atas */}
        <div style={styles.ornamentRow}>
          <div style={styles.ornLine} />
          <span style={styles.ornDiamond}>◆</span>
          <div style={styles.ornLine} />
        </div>

        {/* Title */}
        <p style={styles.subTitle}>The Wedding Of</p>

        {/* Nama Mempelai */}
        <div style={styles.nameWrapper}>
          <h1 style={styles.mainName}>
            {weddingConfig.pria.namaPanggilan}
          </h1>

          <div style={styles.ampRow}>
            <div style={styles.ampLine} />
            <span style={styles.ampersand}>&</span>
            <div style={styles.ampLine} />
          </div>

          <h1 style={styles.mainName}>
            {weddingConfig.wanita.namaPanggilan}
          </h1>
        </div>

        {/* Ornamen Bawah Nama */}
        <div style={styles.ornamentRow}>
          <div style={styles.ornLine} />
          <span style={styles.ornDiamond}>◆</span>
          <div style={styles.ornLine} />
        </div>

        {/* Tanggal Box */}
        <div style={styles.dateBox}>
          <p style={styles.dateLabel}>Hari Pernikahan</p>
          <p style={styles.dateText}>{weddingConfig.akad.tanggal}</p>
        </div>

        {/* Lokasi Singkat */}
        <p style={styles.locationText}>
          {weddingConfig.resepsi.namaGedung} &nbsp;·&nbsp; Jakarta
        </p>
      </div>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <p style={styles.scrollLabel}>Scroll Down</p>
        <div className="mouse-line" />
      </div>

      <style jsx>{`
        .mouse-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #B8964A, transparent);
          margin: 0.5rem auto;
          animation: scrollDown 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
        @keyframes scrollDown {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          80%  { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .hero-btn-primary, .hero-btn-secondary {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .hero-btn-primary:hover {
          background: #B8964A !important;
          color: #1a1510 !important;
          border-color: #B8964A !important;
          letter-spacing: 0.3em !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: #FAF0E0 !important;
          color: #FAF0E0 !important;
        }
      `}</style>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────

const styles = {
  heroSection: {
    height: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#0d0503",
  } as React.CSSProperties,

  bgWrapper: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  } as React.CSSProperties,

  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url('/images/cover.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center 25%",
    filter: "grayscale(20%) brightness(0.7)",
  } as React.CSSProperties,

  bgOverlayTop: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(13,5,3,0.8) 0%, transparent 40%)",
  } as React.CSSProperties,

  bgOverlayBottom: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(13,5,3,0.9) 0%, transparent 50%)",
  } as React.CSSProperties,

  bgOverlayRadial: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 20%, rgba(13,5,3,0.6) 100%)",
  } as React.CSSProperties,

  corner: {
    position: "absolute",
    width: "40px",
    height: "40px",
    borderStyle: "solid",
    borderColor: "rgba(184,150,74,0.3)",
    zIndex: 2,
    pointerEvents: "none",
  } as React.CSSProperties,

  content: {
    position: "relative",
    zIndex: 3,
    textAlign: "center",
    padding: "0 2rem",
    width: "100%",
    maxWidth: "800px",
    transition: "all 2s cubic-bezier(0.22, 1, 0.36, 1)",
  } as React.CSSProperties,

  bismillah: {
    color: "rgba(250,240,224,0.7)",
    fontSize: "1.1rem",
    fontWeight: 300,
    marginBottom: "1.2rem",
    letterSpacing: "0.15em",
  } as React.CSSProperties,

  ornamentRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    width: "140px",
    margin: "0.8rem auto",
  } as React.CSSProperties,

  ornLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #B8964A)",
  } as React.CSSProperties,

  ornDiamond: {
    color: "#B8964A",
    fontSize: "0.45rem",
  } as React.CSSProperties,

  subTitle: {
    color: "rgba(184,150,74,0.8)",
    fontSize: "0.7rem",
    letterSpacing: "0.6em",
    textTransform: "uppercase",
    margin: "1.5rem 0",
    fontWeight: 300,
  } as React.CSSProperties,

  nameWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem 0",
  } as React.CSSProperties,

  mainName: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(3.5rem, 12vw, 6rem)",
    color: "#FAF0E0",
    fontWeight: 300,
    lineHeight: 0.9,
    letterSpacing: "0.02em",
    textShadow: "0 10px 40px rgba(0,0,0,0.6)",
  } as React.CSSProperties,

  ampRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    margin: "1rem auto",
    width: "220px",
  } as React.CSSProperties,

  ampLine: {
    flex: 1,
    height: "1px",
    background: "rgba(184,150,74,0.3)",
  } as React.CSSProperties,

  ampersand: {
    fontFamily: "var(--font-serif)",
    color: "#B8964A",
    fontSize: "2.8rem",
    fontStyle: "italic",
    lineHeight: 1,
  } as React.CSSProperties,

  dateBox: {
    display: "inline-block",
    padding: "0.8rem 2.2rem",
    border: "1px solid rgba(184,150,74,0.2)",
    background: "rgba(184,150,74,0.03)",
    marginTop: "2rem",
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,

  dateLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "rgba(184,150,74,0.5)",
    marginBottom: "0.4rem",
  } as React.CSSProperties,

  dateText: {
    color: "#FAF0E0",
    fontSize: "0.9rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    fontWeight: 400,
  } as React.CSSProperties,

  ctaRow: {
    display: "flex",
    gap: "1.2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "3rem",
  } as React.CSSProperties,

  btnPrimary: {
    padding: "0.9rem 2.2rem",
    background: "rgba(184,150,74,0.1)",
    border: "1px solid rgba(184,150,74,0.4)",
    color: "#B8964A",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    backdropFilter: "blur(10px)",
    display: "inline-block",
    fontWeight: 600,
  } as React.CSSProperties,

  btnSecondary: {
    padding: "0.9rem 2.2rem",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    display: "inline-block",
  } as React.CSSProperties,

  locationText: {
    color: "rgba(184,150,74,0.5)",
    fontSize: "0.7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    marginTop: "1.5rem",
  } as React.CSSProperties,

  scrollIndicator: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    textAlign: "center",
  } as React.CSSProperties,

  scrollLabel: {
    fontSize: "0.55rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "rgba(184,150,74,0.4)",
    marginBottom: "0.6rem",
  } as React.CSSProperties,
};