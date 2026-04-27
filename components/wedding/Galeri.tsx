// components/wedding/Galeri.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/lib/weddingData";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="galeri" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        
        <div className="animate" style={styles.header}>
          <p style={styles.sectionLabel}>Our Precious Moments</p>
          <h2 style={styles.sectionTitle}>Galeri Foto</h2>
        </div>

        {/* Layout Wrapper */}
        <div className="animate gallery-wrapper" style={styles.flexWrapper}>
          
          {/* Kolom Kiri: Slideshow Utama */}
          <div style={styles.leftColumn} className="left-col">
            <MainSlideshow images={weddingConfig.galeri} />
          </div>

          {/* Kolom Kanan: Grid Scrollable */}
          <div style={styles.rightColumn} className="custom-scroll right-col">
            <div style={styles.grid}>
              {weddingConfig.galeri.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  style={styles.itemWrapper} 
                  onClick={() => setLightbox(idx)}
                >
                  <Image 
                    src={item.src} 
                    alt="Gallery" 
                    fill 
                    style={{ objectFit: "cover" }} 
                    sizes="300px"
                  />
                  <div style={styles.itemOverlay} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CSS KHUSUS MOBILE & FIX */}
      <style jsx>{`
        .animate { opacity: 0; transform: translateY(30px); transition: 1s ease; }
        .animate.visible { opacity: 1; transform: translateY(0); }

        .gallery-wrapper {
          display: flex;
          gap: 30px;
          align-items: flex-start;
          width: 100%;
        }

        .left-col { width: 60%; }
        .right-col { width: 40%; }

        .custom-scroll {
          overflow-y: auto;
          max-height: 700px; 
          padding-right: 10px;
        }

        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #B8964A; border-radius: 10px; }

        /* RESPONSIVE MOBILE FIX */
        @media (max-width: 1024px) {
          .gallery-wrapper { 
            flex-direction: column !important; 
            gap: 20px;
          }
          .left-col, .right-col { 
            width: 100% !important; 
          }
          .custom-scroll { 
            max-height: none; 
            overflow-y: visible;
            padding-right: 0;
          }
          :global(.slideshow-container) {
            height: 450px !important; 
          }
        }
      `}</style>
    </section>
  );
}

// ─── SUB-KOMPONEN ───────────────────────────────────────────

function MainSlideshow({ images }: { images: any[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={styles.slideshowContainer} className="slideshow-container">
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            ...styles.slideItem,
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? "scale(1.05)" : "scale(1)",
            zIndex: idx === current ? 1 : 0
          }}
        >
          <Image 
            src={img.src} 
            alt="Slide" 
            fill 
            priority={idx === 0}
            style={{ objectFit: "cover" }} 
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      ))}
      <div style={styles.slideOverlay} />
      <div style={styles.slideContent}>
        <span style={styles.slideDecor}>✦ ✦ ✦</span>
        <p style={styles.slideTagline}>The Cinematic Memories</p>
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────

const styles = {
  section: {
    background: "#0d0503",
    padding: "6rem 0",
    overflow: "hidden",
    width: "100%",
  } as React.CSSProperties,

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  } as React.CSSProperties,

  header: {
    textAlign: "center",
    marginBottom: "4rem",
  } as React.CSSProperties,

  sectionLabel: {
    color: "#B8964A",
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  sectionTitle: {
    fontFamily: "serif",
    fontSize: "3rem",
    color: "#fff",
    fontWeight: 300,
  } as React.CSSProperties,

  flexWrapper: {
    display: "flex",
    gap: "30px",
    width: "100%",
  } as React.CSSProperties,

  leftColumn: {
    position: "relative",
  } as React.CSSProperties,

  rightColumn: {
    position: "relative",
  } as React.CSSProperties,

  slideshowContainer: {
    position: "relative",
    height: "700px",
    borderRadius: "20px",
    overflow: "hidden",
    width: "100%",
  } as React.CSSProperties,

  slideItem: {
    position: "absolute",
    inset: 0,
    transition: "all 1.5s ease-in-out",
  } as React.CSSProperties,

  slideOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(13,5,3,0.8), transparent)",
    zIndex: 2,
  } as React.CSSProperties,

  slideContent: {
    position: "absolute",
    bottom: "40px",
    left: "40px",
    zIndex: 3,
  } as React.CSSProperties,

  slideDecor: {
    color: "#B8964A",
    display: "block",
    marginBottom: "10px",
  } as React.CSSProperties,

  slideTagline: {
    color: "#fff",
    fontSize: "1.5rem",
    fontFamily: "serif",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
  } as React.CSSProperties,

  itemWrapper: {
    position: "relative",
    aspectRatio: "1/1",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#1a1a1a",
  } as React.CSSProperties,

  itemOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(184, 150, 74, 0.1)",
    transition: "0.3s",
  } as React.CSSProperties,
};