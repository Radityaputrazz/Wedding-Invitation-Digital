"use client";

import { useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";

// Komponen Pembantu untuk Item Protokol
const ProtokolItem = ({ icon, title, desc }: { icon: string; title: string; desc: React.ReactNode }) => (
  <div style={styles.protokolItem}>
    <span style={styles.protokolIcon}>{icon}</span>
    <p style={styles.protokolTitle}>{title}</p>
    <div style={styles.protokolDesc}>{desc}</div>
  </div>
);

// Komponen Pembantu untuk Divider Ornamen
const OrnamentDivider = () => (
  <div style={styles.ornamentDivider}>
    <div style={styles.dividerLineLeft} />
    <span style={styles.dividerDiamond}>◆ ◆ ◆</span>
    <div style={styles.dividerLineRight} />
  </div>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = footerRef.current?.querySelectorAll(".animate");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} style={styles.footer}>
      {/* Background Decor */}
      <div style={styles.bgGlowTop} />
      <div style={styles.bgGlowBottom} />
      <div style={styles.topAccentLine} />

      <div style={styles.innerContainer}>
        {/* Protokol Grid */}
        <div className="animate protokol-grid">
          <ProtokolItem 
            icon="👔" 
            title="Dress Code" 
            desc={weddingConfig.dressCode} 
          />
          <ProtokolItem
            icon="📸"
            title="Tagar Foto"
            desc={
              <>
                Bagikan momen Anda dengan{" "}
                <strong style={styles.hashtagText}>
                  {weddingConfig.hashtag}
                </strong>
              </>
            }
          />
          <ProtokolItem 
            icon="🅿️" 
            title="Parkir" 
            desc="Tersedia di Basement B1 & B2. Kapasitas terbatas." 
          />
        </div>

        <OrnamentDivider />

        {/* Ayat Penutup */}
        <div className="animate" style={{ textAlign: "center" }}>
          <p style={styles.sectionLabel}>Penutup</p>
          <blockquote style={styles.quote}>
            <span style={styles.quoteMark}>"</span>
            Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?
            <span style={styles.quoteMark}>"</span>
          </blockquote>
          <cite style={styles.cite}>— QS. Ar-Rahman: 13</cite>
        </div>

        <OrnamentDivider />

        {/* Ucapan Terima Kasih */}
        <p className="animate" style={styles.thanksText}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
          kedua mempelai. Atas kehadiran dan doa restunya, kami ucapkan
          terima kasih yang sebesar-besarnya.
        </p>

        {/* Keluarga */}
        <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={styles.sectionLabel}>Keluarga yang Mengundang</p>
          <div style={styles.familyCard}>
            <p style={styles.familyName}>{weddingConfig.keluargaPria}</p>
            <div style={styles.familyDivider}>
              <div style={styles.line} />
              <span style={styles.ampersandSmall}>&</span>
              <div style={styles.line} />
            </div>
            <p style={styles.familyName}>{weddingConfig.keluargaWanita}</p>
          </div>
        </div>

        <OrnamentDivider />

        {/* Nama Mempelai */}
        <div className="animate" style={{ textAlign: "center" }}>
          <p style={styles.sectionLabel}>Dengan Penuh Cinta</p>
          <div style={{ marginTop: "2rem" }}>
            <h2 style={styles.nameGradient}>{weddingConfig.pria.namaPanggilan}</h2>
            <div style={styles.nameDivider}>
              <div style={styles.line} />
              <span style={styles.ampersandLarge}>&</span>
              <div style={styles.line} />
            </div>
            <h2 style={styles.nameGradient}>{weddingConfig.wanita.namaPanggilan}</h2>
          </div>
          <p style={styles.dateText}>{weddingConfig.akad.tanggal}</p>
          <p style={styles.locationText}>Jakarta, Indonesia</p>
        </div>

        {/* Action Button */}
        <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
          <button onClick={scrollToTop} style={styles.topBtn} className="top-btn">
            ↑ Kembali ke Atas
          </button>
        </div>

        <p style={styles.creditText}>
          Made with 💕 for {weddingConfig.pria.namaPanggilan} & {weddingConfig.wanita.namaPanggilan}
        </p>
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .protokol-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: rgba(184, 150, 74, 0.1);
          border: 1px solid rgba(184, 150, 74, 0.1);
          max-width: 860px;
          margin: 0 auto;
        }
        .top-btn {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .top-btn:hover {
          background: #b8964a !important;
          color: #1a0a05 !important;
          border-color: #b8964a !important;
          letter-spacing: 0.3em !important;
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .protokol-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Styles Object ───────────────────────────────────────────────

const styles = {
  footer: {
    position: "relative",
    background: "radial-gradient(ellipse at top, #251d14 0%, #1a1510 50%, #110d0a 100%)",
    color: "#FAF0E0",
    padding: "0 1.5rem clamp(4rem, 8vw, 6rem)",
    borderTop: "1px solid rgba(184, 150, 74, 0.15)",
    overflow: "hidden",
  } as React.CSSProperties,

  innerContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  } as React.CSSProperties,

  bgGlowTop: {
    position: "absolute",
    top: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(184, 150, 74, 0.1), transparent 65%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  } as React.CSSProperties,

  bgGlowBottom: {
    position: "absolute",
    bottom: "-100px",
    right: "-100px",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(123, 140, 110, 0.06), transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  } as React.CSSProperties,

  topAccentLine: {
    height: "2px",
    background: "linear-gradient(90deg, transparent, rgba(184, 150, 74, 0.5), transparent)",
    marginBottom: "5rem",
  } as React.CSSProperties,

  protokolItem: {
    textAlign: "center",
    padding: "2.5rem 1.5rem",
    background: "rgba(255, 255, 255, 0.02)",
  } as React.CSSProperties,

  protokolIcon: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.75rem",
  },

  protokolTitle: {
    fontSize: "0.68rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#B8964A",
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  protokolDesc: {
    fontSize: "0.82rem",
    color: "#8B7B6B",
    lineHeight: 1.7,
  } as React.CSSProperties,

  hashtagText: {
    color: "#D4B06A",
    display: "block",
    marginTop: "0.3rem",
    fontSize: "0.9rem",
  },

  sectionLabel: {
    fontSize: "0.68rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "#B8964A",
    marginBottom: "1.5rem",
  } as React.CSSProperties,

  quote: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
    fontStyle: "italic",
    color: "#D4C4A8",
    lineHeight: 1.9,
    maxWidth: "560px",
    margin: "0 auto",
  } as React.CSSProperties,

  quoteMark: {
    fontFamily: "Georgia, serif",
    fontSize: "3rem",
    color: "rgba(184, 150, 74, 0.2)",
    lineHeight: 0,
    verticalAlign: "-0.5rem",
    margin: "0 0.3rem",
  } as React.CSSProperties,

  cite: {
    display: "block",
    fontSize: "0.75rem",
    color: "#6B5B4B",
    marginTop: "1.2rem",
    letterSpacing: "0.1em",
    fontStyle: "normal",
  } as React.CSSProperties,

  thanksText: {
    fontSize: "0.85rem",
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "520px",
    color: "#8B7B6B",
    lineHeight: 2,
  } as React.CSSProperties,

  familyCard: {
    marginTop: "1.5rem",
    display: "inline-block",
    padding: "1.5rem 3rem",
    border: "1px solid rgba(184, 150, 74, 0.1)",
    background: "rgba(255, 255, 255, 0.02)",
  } as React.CSSProperties,

  familyName: {
    fontSize: "0.9rem",
    color: "#D4C4A8",
    letterSpacing: "0.08em",
  },

  familyDivider: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "0.75rem auto",
    width: "160px",
  } as React.CSSProperties,

  line: {
    flex: 1,
    height: "1px",
    background: "rgba(184, 150, 74, 0.2)",
  },

  ampersandSmall: {
    fontFamily: "var(--font-serif)",
    color: "#B8964A",
    fontSize: "1.2rem",
  },

  nameGradient: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(3rem, 8vw, 5rem)",
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "0.05em",
    background: "linear-gradient(180deg, #E6C27A 0%, #B8964A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties,

  nameDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    margin: "1rem auto",
    width: "200px",
  } as React.CSSProperties,

  ampersandLarge: {
    fontFamily: "var(--font-serif)",
    fontSize: "2.5rem",
    color: "#B8964A",
    fontWeight: 300,
  },

  dateText: {
    fontSize: "0.82rem",
    letterSpacing: "0.2em",
    color: "#6B5B4B",
    marginTop: "1.5rem",
    textTransform: "uppercase",
  } as React.CSSProperties,

  locationText: {
    fontSize: "0.72rem",
    letterSpacing: "0.2em",
    color: "#4A3A2A",
    marginTop: "0.3rem",
    textTransform: "uppercase",
  } as React.CSSProperties,

  topBtn: {
    padding: "0.8rem 2.5rem",
    border: "1px solid rgba(184, 150, 74, 0.4)",
    background: "transparent",
    color: "#B8964A",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: "999px",
  } as React.CSSProperties,

  creditText: {
    textAlign: "center",
    fontSize: "0.65rem",
    color: "#3A2A1A",
    marginTop: "3rem",
    letterSpacing: "0.1em",
  } as React.CSSProperties,

  ornamentDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    margin: "4rem auto",
    maxWidth: "300px",
  } as React.CSSProperties,

  dividerLineLeft: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(184, 150, 74, 0.3))",
  },

  dividerLineRight: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, rgba(184, 150, 74, 0.3), transparent)",
  },

  dividerDiamond: {
    color: "#B8964A",
    fontSize: "0.5rem",
    letterSpacing: "0.5em",
  },
};