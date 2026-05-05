"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";

gsap.registerPlugin(ScrollTrigger);

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Grid Vertikal
      gsap.from(".grid-thumb", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".galeri-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="galeri" ref={sectionRef} style={sectionStyle}>
        <div style={containerStyle}>
          <div className="galeri-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={labelStyle}>Our Precious Moments</p>
            <h2 style={titleStyle}>Galeri Foto</h2>
          </div>

          <div className="galeri-layout">
            <div className="galeri-grid custom-scroll" style={gridStyle}>
              {weddingConfig.galeri.map((item, idx) => (
                <div 
                  key={idx} 
                  className="grid-thumb grid-item" 
                  style={gridItemWrapStyle} 
                  onClick={() => setLightbox(idx)}
                >
                  {/* Menggunakan layout responsif agar tinggi mengikuti konten */}
                  <div style={imageContainerStyle}>
                    <img 
                      src={item.src} 
                      alt={item.caption} 
                      style={imageStyle} 
                    />
                    <div className="grid-overlay" style={gridOverlayStyle}>
                      <span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox 
          index={lightbox} 
          images={weddingConfig.galeri} 
          onClose={() => setLightbox(null)} 
          setIndex={setLightbox} 
        />
      )}

      <style jsx>{`
        .galeri-layout {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .galeri-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 24px; /* Jarak antar foto */
          padding-bottom: 50px;
        }

        .grid-item {
          width: 100%;
          position: relative;
        }

        .grid-item:hover img { 
          transform: scale(1.02); 
        }

        .grid-item:hover .grid-overlay { 
          opacity: 1 !important; 
        }
      `}</style>
    </>
  );
}

// --- SUB-COMPONENTS (SAMA SEPERTI SEBELUMNYA) ---
function Lightbox({ index, images, onClose, setIndex }: any) {
  return (
    <div style={lbBgStyle} onClick={onClose}>
      <div style={lbImageWrapStyle} onClick={(e) => e.stopPropagation()}>
        <img src={images[index].src} alt="Gallery" style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain" }} />
      </div>
      <div style={{ color: "#fff", marginTop: "1rem" }}>{index + 1} / {images.length}</div>
    </div>
  );
}

// --- STYLES (DISESUAIKAN UNTUK AUTO-HEIGHT) ---
const sectionStyle: React.CSSProperties = { 
  background: "#0d0503", 
  padding: "6rem 0" 
};

const containerStyle: React.CSSProperties = { 
  maxWidth: "1100px", 
  margin: "0 auto", 
  padding: "0 1.5rem" 
};

const labelStyle: React.CSSProperties = { 
  fontSize: "0.72rem", 
  color: "#B8964A", 
  letterSpacing: "0.3em", 
  textTransform: "uppercase" 
};

const titleStyle: React.CSSProperties = {
  fontFamily: "serif", 
  fontSize: "3rem", 
  color: "#FAF0E0" 
};

const gridStyle: React.CSSProperties = { 
  width: "100%",
  display: "flex",
  flexDirection: "column"
};

const gridItemWrapStyle: React.CSSProperties = {
  cursor: "pointer",
  width: "100%",
};

const imageContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  background: "#1a0a05",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto", // Kunci agar tinggi pas dengan foto asli
  display: "block",
  transition: "transform 0.5s ease",
};

const gridOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: "#fff",
  fontSize: "0.9rem"
};

const lbBgStyle: React.CSSProperties = { 
  position: "fixed", 
  inset: 0, 
  background: "rgba(0,0,0,0.95)", 
  zIndex: 999, 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  flexDirection: "column" 
};

const lbImageWrapStyle: React.CSSProperties = { 
  position: "relative", 
  maxWidth: "90vw" 
};