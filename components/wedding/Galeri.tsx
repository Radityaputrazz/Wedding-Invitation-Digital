// components/wedding/Galeri.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/lib/weddingData";

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
        
        {/* Header Tetap di Atas */}
        <div className="animate" style={styles.header}>
          <p style={styles.sectionLabel}>Our Precious Moments</p>
          <h2 style={styles.sectionTitle}>Galeri Foto</h2>
        </div>

        {/* Layout Side-by-Side */}
        <div className="animate gallery-wrapper" style={styles.flexWrapper}>
          
          {/* Kolom Kiri: Slideshow Besar */}
          <div style={styles.leftColumn}>
            <MainSlideshow images={weddingConfig.galeri} />
          </div>

          {/* Kolom Kanan: Grid Scrollable */}
          <div style={styles.rightColumn} className="custom-scroll">
            <div style={styles.grid}>
              {weddingConfig.galeri.map((item, idx) => (
                <GalleryItem 
                  key={idx} 
                  item={item} 
                  onClick={() => setLightbox(idx)} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} />
      )}

      <style jsx>{`
        .gallery-wrapper {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        .custom-scroll {
          overflow-y: auto;
          max-height: 700px; /* Tinggi grid kanan agar bisa scroll */
          padding-right: 10px;
        }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 10px; }

        @media (max-width: 1024px) {
          .gallery-wrapper { flex-direction: column; }
          .custom-scroll { max-height: none; }
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
    <div style={styles.slideshowContainer}>
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            ...styles.slideItem,
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? "scale(1.1)" : "scale(1)",
          }}
        >
          <Image src={img.src} alt="Slide" fill style={{ objectFit: "cover" }} />
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

function GalleryItem({ item, onClick }: { item: any; onClick: () => void }) {
  return (
    <div style={styles.gridItem} onClick={onClick} className="item-hover">
      <Image src={item.src} alt={item.caption} fill style={{ objectFit: "cover" }} />
      <div style={styles.itemOverlay} className="overlay">
        <span style={styles.overlayText}>VIEW</span>
      </div>
      <style jsx>{`
        .item-hover { position: relative; aspect-ratio: 1/1; border-radius: 4px; overflow: hidden; cursor: pointer; transition: 0.3s; }
        .item-hover:hover { transform: scale(0.97); }
        .item-hover:hover .overlay { opacity: 1; }
      `}</style>
    </div>
  );
}

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const item = weddingConfig.galeri[index];
  return (
    <div style={styles.lightboxBg} onClick={onClose}>
      <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt="Detail" width={1000} height={800} style={{ objectFit: "contain" }} />
        <p style={styles.lightboxCaption}>{item.caption}</p>
      </div>
    </div>
  );
}

// ─── STYLES ────────────────────────────────────────────────

const styles = {
  section: { background: "#1a1510", padding: "6rem 2rem" } as React.CSSProperties,
  container: { maxWidth: "1300px", margin: "0 auto" } as React.CSSProperties,
  header: { textAlign: "center", marginBottom: "4rem" } as React.CSSProperties,
  sectionLabel: { fontSize: "0.8rem", letterSpacing: "0.6em", color: "var(--gold)", textTransform: "uppercase" } as React.CSSProperties,
  sectionTitle: { fontFamily: "var(--font-serif)", fontSize: "3rem", color: "#FAF0E0", marginTop: "10px" } as React.CSSProperties,
  
  flexWrapper: { width: "100%" } as React.CSSProperties,
  
  // Kolom Kiri (Slideshow Besar)
  leftColumn: { flex: "1.5", position: "relative" } as React.CSSProperties,
  slideshowContainer: { 
    width: "100%", 
    height: "700px", // Tinggi diperbesar sesuai permintaan
    borderRadius: "15px", 
    overflow: "hidden", 
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
  } as React.CSSProperties,
  slideItem: { position: "absolute", inset: 0, transition: "opacity 1.5s ease-in-out, transform 6s linear" } as React.CSSProperties,
  slideOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" } as React.CSSProperties,
  slideContent: { position: "absolute", bottom: "50px", width: "100%", textAlign: "center", zIndex: 10 } as React.CSSProperties,
  slideDecor: { color: "var(--gold)", fontSize: "1.2rem", letterSpacing: "10px" } as React.CSSProperties,
  slideTagline: { color: "#fff", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.75rem", marginTop: "15px" } as React.CSSProperties,

  // Kolom Kanan (Grid)
  rightColumn: { flex: "1" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" } as React.CSSProperties,
  gridItem: { background: "#2a2219" } as React.CSSProperties,
  itemOverlay: { position: "absolute", inset: 0, background: "rgba(184,150,74,0.4)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "0.3s" } as React.CSSProperties,
  overlayText: { color: "#fff", fontSize: "0.7rem", fontWeight: "bold", letterSpacing: "2px" } as React.CSSProperties,

  // Lightbox
  lightboxBg: 
  { position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" } as React.CSSProperties,
  lightboxContent: { position: "relative", width: "90%", height: "80%", textAlign: "center" } as React.CSSProperties,
  lightboxCaption: { color: "var(--gold-light)", marginTop: "20px", fontFamily: "var(--font-serif)", fontSize: "1.5rem" } as React.CSSProperties,
};