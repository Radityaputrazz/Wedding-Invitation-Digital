// components/wedding/Galeri.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

  // Tutup lightbox pakai ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox((prev) => ((prev ?? 0) + 1) % weddingConfig.galeri.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox((prev) => ((prev ?? 0) - 1 + weddingConfig.galeri.length) % weddingConfig.galeri.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <>
      <section id="galeri" ref={sectionRef} style={sectionStyle}>

        {/* Background dekoratif */}
        <div style={bgGlow1Style} />
        <div style={bgGlow2Style} />

        <div style={containerStyle}>

          {/* Header */}
          <div className="animate" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={labelStyle}>Our Precious Moments</p>
            <div style={ornamentStyle}>
              <div style={ornLineStyle} />
              <span style={ornDiamondStyle}>◆</span>
              <div style={ornLineStyle} />
            </div>
            <h2 style={titleStyle}>Galeri Foto</h2>
            <p style={subtitleStyle}>
              Setiap foto menyimpan cerita yang tak terlupakan
            </p>
          </div>

          {/* Layout utama */}
          <div className="animate gallery-layout">

            {/* Kiri — Slideshow */}
            <div className="slideshow-col">
              <Slideshow
                images={weddingConfig.galeri}
                onImageClick={(i) => setLightbox(i)}
              />
            </div>

            {/* Kanan — Grid thumbnail */}
            <div className="grid-col custom-scroll">
              <p style={gridLabelStyle}>Semua Foto</p>
              <div style={gridStyle}>
                {weddingConfig.galeri.map((item, idx) => (
                  <div
                    key={idx}
                    style={gridItemStyle}
                    className="grid-item"
                    onClick={() => setLightbox(idx)}
                  >
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="200px"
                      style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                    />
                    {/* Overlay */}
                    <div style={gridOverlayStyle} className="grid-overlay">
                      <span style={gridCaptionStyle}>{item.caption}</span>
                      <span style={gridIconStyle}>🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Video section */}
          <div className="animate" style={{ marginTop: "5rem" }}>
            <div style={videoHeaderStyle}>
              <div style={ornLineStyle} />
              <p style={videoLabelStyle}>Cinematic Video</p>
              <div style={ornLineStyle} />
            </div>
            <div style={videoWrapStyle}>
              {/* Ganti dengan iframe YouTube jika sudah ada */}
              <div style={videoPlaceholderStyle}>
                <div style={playBtnStyle}>▶</div>
                <p style={playLabelStyle}>Video Cinematic Pernikahan</p>
                <p style={playSubStyle}>Ganti dengan embed YouTube</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={lightboxBgStyle} onClick={() => setLightbox(null)}>

          {/* Tombol tutup */}
          <button style={lbCloseBtnStyle} onClick={() => setLightbox(null)}>
            ✕
          </button>

          {/* Counter */}
          <p style={lbCounterStyle}>
            {lightbox + 1} / {weddingConfig.galeri.length}
          </p>

          {/* Navigasi prev */}
          <button
            style={{ ...lbNavBtnStyle, left: "1.5rem" }}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) =>
                ((prev ?? 0) - 1 + weddingConfig.galeri.length) % weddingConfig.galeri.length
              );
            }}
          >
            ‹
          </button>

          {/* Foto */}
          <div
            style={lbImageWrapStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Frame dekoratif */}
            <div style={lbFrameStyle} />

            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={weddingConfig.galeri[lightbox].src}
                alt={weddingConfig.galeri[lightbox].caption}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
              />
            </div>

            {/* Caption */}
            <div style={lbCaptionStyle}>
              <span style={lbCaptionTextStyle}>
                {weddingConfig.galeri[lightbox].caption}
              </span>
            </div>
          </div>

          {/* Navigasi next */}
          <button
            style={{ ...lbNavBtnStyle, right: "1.5rem" }}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((prev) =>
                ((prev ?? 0) + 1) % weddingConfig.galeri.length
              );
            }}
          >
            ›
          </button>

          {/* Thumbnail strip */}
          <div style={lbStripStyle} onClick={(e) => e.stopPropagation()}>
            {weddingConfig.galeri.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...lbThumbStyle,
                  border: idx === lightbox
                    ? "2px solid #B8964A"
                    : "2px solid transparent",
                  opacity: idx === lightbox ? 1 : 0.5,
                }}
                onClick={() => setLightbox(idx)}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

        </div>
      )}

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gallery-layout {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .slideshow-col { position: relative; }
        .grid-col {
          max-height: 680px;
          overflow-y: auto;
          padding-right: 8px;
        }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #B8964A50; border-radius: 99px; }
        .grid-item:hover img { transform: scale(1.08); }
        .grid-item:hover .grid-overlay { opacity: 1 !important; }
        @media (max-width: 1024px) {
          .gallery-layout {
            grid-template-columns: 1fr !important;
          }
          .grid-col {
            max-height: none;
            overflow-y: visible;
          }
        }
      `}</style>
    </>
  );
}

// ─── Sub-komponen Slideshow ────────────────────────────────

function Slideshow({
  images,
  onImageClick,
}: {
  images: { src: string; caption: string; emoji: string }[];
  onImageClick: (i: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={slideshowStyle}>

      {/* Foto */}
      {images.map((img, idx) => (
        <div
          key={idx}
          style={{
            ...slideItemStyle,
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? "scale(1.04)" : "scale(1)",
          }}
        >
          <Image
            src={img.src}
            alt={img.caption}
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      {/* Gradient bawah */}
      <div style={slideGradientStyle} />

      {/* Konten bawah */}
      <div style={slideBottomStyle}>
        <p style={slideDecorStyle}>✦ &nbsp; The Cinematic Memories &nbsp; ✦</p>
        <h3 style={slideTitleStyle}>{images[current].caption}</h3>

        {/* Dot navigasi */}
        <div style={dotRowStyle}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                ...dotStyle,
                background: idx === current ? "#B8964A" : "rgba(184,150,74,0.3)",
                width: idx === current ? "24px" : "8px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Tombol buka lightbox */}
      <button
        style={slideLbBtnStyle}
        onClick={() => onImageClick(current)}
      >
        ⤢ Perbesar
      </button>

      {/* Sudut dekoratif */}
      <div style={{ ...slideCornerStyle, top: 12, left: 12, borderWidth: "1px 0 0 1px" }} />
      <div style={{ ...slideCornerStyle, top: 12, right: 12, borderWidth: "1px 1px 0 0" }} />
      <div style={{ ...slideCornerStyle, bottom: 12, left: 12, borderWidth: "0 0 1px 1px" }} />
      <div style={{ ...slideCornerStyle, bottom: 12, right: 12, borderWidth: "0 1px 1px 0" }} />

    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "#0d0503",
  padding: "6rem 0",
  overflow: "hidden",
  position: "relative",
};

const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "10%",
  left: "-10%",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(184,150,74,0.06), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "10%",
  right: "-10%",
  width: "400px",
  height: "400px",
  background: "radial-gradient(circle, rgba(123,140,110,0.05), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 1.5rem",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1rem",
};

const ornamentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  width: "140px",
  margin: "0.75rem auto",
};

const ornLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A)",
};

const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A",
  fontSize: "0.5rem",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.05em",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#6B5B4B",
  marginTop: "0.75rem",
  fontStyle: "italic",
  fontFamily: "var(--font-serif)",
};

const gridLabelStyle: React.CSSProperties = {
  fontSize: "0.68rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1rem",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
};

const gridItemStyle: React.CSSProperties = {
  position: "relative",
  aspectRatio: "1",
  overflow: "hidden",
  cursor: "pointer",
  background: "#1a0a05",
};

const gridOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(26,10,5,0.6)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 2,
};

const gridCaptionStyle: React.CSSProperties = {
  color: "#FAF0E0",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  fontFamily: "var(--font-serif)",
};

const gridIconStyle: React.CSSProperties = {
  fontSize: "1rem",
};

const videoHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const videoLabelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#B8964A",
  whiteSpace: "nowrap",
};

const videoWrapStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "16/9",
  background: "#1a0a05",
  border: "1px solid rgba(184,150,74,0.1)",
  position: "relative",
  overflow: "hidden",
};

const videoPlaceholderStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
};

const playBtnStyle: React.CSSProperties = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  border: "1px solid rgba(184,150,74,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  color: "#B8964A",
  background: "rgba(184,150,74,0.08)",
};

const playLabelStyle: React.CSSProperties = {
  color: "#D4C4A8",
  fontSize: "0.9rem",
  fontFamily: "var(--font-serif)",
};

const playSubStyle: React.CSSProperties = {
  color: "#4A3A2A",
  fontSize: "0.75rem",
};

// Slideshow
const slideshowStyle: React.CSSProperties = {
  position: "relative",
  height: "680px",
  overflow: "hidden",
  background: "#1a0a05",
};

const slideItemStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  transition: "opacity 1.5s ease, transform 1.5s ease",
};

const slideGradientStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(13,5,3,0.95) 0%, rgba(13,5,3,0.2) 50%, transparent 100%)",
  zIndex: 2,
};

const slideBottomStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "2.5rem",
  left: "2rem",
  right: "2rem",
  zIndex: 3,
};

const slideDecorStyle: React.CSSProperties = {
  fontSize: "0.68rem",
  letterSpacing: "0.3em",
  color: "#B8964A",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

const slideTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.8rem",
  fontWeight: 300,
  color: "#FAF0E0",
  marginBottom: "1rem",
};

const dotRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
};

const dotStyle: React.CSSProperties = {
  height: "3px",
  borderRadius: "99px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.4s ease",
  padding: 0,
};

const slideLbBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.2rem",
  right: "1.2rem",
  zIndex: 4,
  background: "rgba(0,0,0,0.5)",
  border: "1px solid rgba(184,150,74,0.3)",
  color: "#B8964A",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
  backdropFilter: "blur(4px)",
};

const slideCornerStyle: React.CSSProperties = {
  position: "absolute",
  width: "25px",
  height: "25px",
  borderStyle: "solid",
  borderColor: "rgba(184,150,74,0.4)",
  zIndex: 4,
  pointerEvents: "none",
};

// Lightbox
const lightboxBgStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 300,
  background: "rgba(0,0,0,0.96)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const lbCloseBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.5rem",
  right: "1.5rem",
  background: "none",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "white",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
};

const lbCounterStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.8rem",
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  color: "rgba(255,255,255,0.4)",
};

const lbNavBtnStyle: React.CSSProperties = {
  position: "absolute",
  background: "none",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.6)",
  width: "50px",
  height: "50px",
  fontSize: "2rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  transition: "all 0.3s",
};

const lbImageWrapStyle: React.CSSProperties = {
  position: "relative",
  width: "min(85vw, 700px)",
  height: "min(70vh, 600px)",
};

const lbFrameStyle: React.CSSProperties = {
  position: "absolute",
  inset: "-8px",
  border: "1px solid rgba(184,150,74,0.15)",
  pointerEvents: "none",
  zIndex: 2,
};

const lbCaptionStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "-2.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
};

const lbCaptionTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "0.9rem",
  color: "rgba(255,255,255,0.4)",
  letterSpacing: "0.1em",
  fontStyle: "italic",
};

const lbStripStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "1.5rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  padding: "0.5rem",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
};

const lbThumbStyle: React.CSSProperties = {
  position: "relative",
  width: "60px",
  height: "60px",
  cursor: "pointer",
  overflow: "hidden",
  transition: "all 0.3s",
  flexShrink: 0,
};