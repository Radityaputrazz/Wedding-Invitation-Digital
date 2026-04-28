// components/wedding/Footer.tsx
"use client";

import { useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";

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
    footerRef.current
      ?.querySelectorAll(".animate")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} style={footerStyle}>

      {/* Background glow */}
      <div style={bgGlowStyle} />
      <div style={bgGlow2Style} />

      {/* Garis atas */}
      <div style={topLineStyle} />

      <div style={innerStyle}>

        {/* Protokol */}
        <div className="animate protokol-grid">
          <ProtokolItem icon="👔" title="Dress Code" desc={weddingConfig.dressCode} />
          <ProtokolItem
            icon="📸"
            title="Tagar Foto"
            desc={
              <>
                Bagikan momen Anda dengan{" "}
                <strong style={{ color: "#D4B06A", display: "block", marginTop: "0.3rem", fontSize: "0.9rem" }}>
                  {weddingConfig.hashtag}
                </strong>
              </>
            }
          />
          <ProtokolItem icon="🅿️" title="Parkir" desc="Tersedia di Basement B1 & B2. Kapasitas terbatas." />
        </div>

        {/* Divider ornamen */}
        <OrnamentDivider />

        {/* Ayat penutup */}
        <div className="animate" style={{ textAlign: "center" }}>
          <p style={sectionLabelStyle}>Penutup</p>
          <blockquote style={quoteStyle}>
            <span style={quoteMarkStyle}>"</span>
            Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?
            <span style={quoteMarkStyle}>"</span>
          </blockquote>
          <cite style={citeStyle}>— QS. Ar-Rahman: 13</cite>
        </div>

        {/* Divider */}
        <OrnamentDivider />

        {/* Ucapan terima kasih */}
        <p className="animate" style={thanksStyle}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
          kedua mempelai. Atas kehadiran dan doa restunya, kami ucapkan
          terima kasih yang sebesar-besarnya.
        </p>

        {/* Keluarga */}
        <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={sectionLabelStyle}>Keluarga yang Mengundang</p>
          <div style={familyBoxStyle}>
            <p style={familyNameStyle}>{weddingConfig.keluargaPria}</p>
            <div style={familyDividerStyle}>
              <div style={familyLineStyle} />
              <span style={familyAmpStyle}>&</span>
              <div style={familyLineStyle} />
            </div>
            <p style={familyNameStyle}>{weddingConfig.keluargaWanita}</p>
          </div>
        </div>

        {/* Divider */}
        <OrnamentDivider />

        {/* Nama besar */}
        <div className="animate" style={{ textAlign: "center" }}>
          <p style={sectionLabelStyle}>Dengan Penuh Cinta</p>
          <div style={{ marginTop: "2rem" }}>
            <h2 style={nameGradientStyle}>
              {weddingConfig.pria.namaPanggilan}
            </h2>
            <div style={nameDividerStyle}>
              <div style={nameLineStyle} />
              <span style={nameAmpStyle}>&</span>
              <div style={nameLineStyle} />
            </div>
            <h2 style={nameGradientStyle}>
              {weddingConfig.wanita.namaPanggilan}
            </h2>
          </div>
          <p style={dateStyle}>{weddingConfig.akad.tanggal}</p>
          <p style={locationStyle}>Jakarta, Indonesia</p>
        </div>

        {/* Tombol kembali */}
        <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={topBtnStyle}
            className="top-btn"
          >
            ↑ Kembali ke Atas
          </button>
        </div>

        {/* Credit */}
        <p style={creditStyle}>
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
          gap: 1px;
          background: rgba(184,150,74,0.1);
          border: 1px solid rgba(184,150,74,0.1);
          max-width: 860px;
          margin: 0 auto;
        }
        .top-btn {
          transition: all 0.3s ease;
        }
        .top-btn:hover {
          background: #B8964A !important;
          color: #1a0a05 !important;
          border-color: #B8964A !important;
          letter-spacing: 0.2em !important;
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

// ─── Sub-komponen ──────────────────────────────────────────

function ProtokolItem({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div style={protokolItemStyle}>
      <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>
        {icon}
      </span>
      <p style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8964A", marginBottom: "0.5rem" }}>
        {title}
      </p>
      <div style={{ fontSize: "0.82rem", color: "#8B7B6B", lineHeight: 1.7 }}>
        {desc}
      </div>
    </div>
  );
}

function OrnamentDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", margin: "4rem auto", maxWidth: "300px" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.3))" }} />
      <span style={{ color: "#B8964A", fontSize: "0.5rem", letterSpacing: "0.5em" }}>◆ ◆ ◆</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(184,150,74,0.3), transparent)" }} />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const footerStyle: React.CSSProperties = {
  position: "relative",
  background: "radial-gradient(ellipse at top, #251d14 0%, #1a1510 50%, #110d0a 100%)",
  color: "#FAF0E0",
  padding: "0 1.5rem clamp(4rem, 8vw, 6rem)",
  borderTop: "1px solid rgba(184,150,74,0.15)",
  overflow: "hidden",
};

const bgGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: "-200px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "700px",
  height: "700px",
  background: "radial-gradient(circle, rgba(184,150,74,0.1), transparent 65%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-100px",
  right: "-100px",
  width: "400px",
  height: "400px",
  background: "radial-gradient(circle, rgba(123,140,110,0.06), transparent 70%)",
  filter: "blur(40px)",
  pointerEvents: "none",
};

const topLineStyle: React.CSSProperties = {
  height: "2px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.5), transparent)",
  marginBottom: "5rem",
};

const innerStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
};

const protokolItemStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "2.5rem 1.5rem",
  background: "rgba(255,255,255,0.02)",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.68rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1.5rem",
};

const quoteMarkStyle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontSize: "3rem",
  color: "rgba(184,150,74,0.2)",
  lineHeight: 0,
  verticalAlign: "-0.5rem",
  margin: "0 0.3rem",
};

const quoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
  fontStyle: "italic",
  color: "#D4C4A8",
  lineHeight: 1.9,
  maxWidth: "560px",
  margin: "0 auto",
};

const citeStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "#6B5B4B",
  marginTop: "1.2rem",
  letterSpacing: "0.1em",
  fontStyle: "normal",
};

const thanksStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  textAlign: "center",
  margin: "0 auto",
  maxWidth: "520px",
  color: "#8B7B6B",
  lineHeight: 2,
};

const familyBoxStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  display: "inline-block",
  padding: "1.5rem 3rem",
  border: "1px solid rgba(184,150,74,0.1)",
  background: "rgba(255,255,255,0.02)",
};

const familyNameStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#D4C4A8",
  letterSpacing: "0.08em",
};

const familyDividerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  margin: "0.75rem auto",
  width: "160px",
};

const familyLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "rgba(184,150,74,0.2)",
};

const familyAmpStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  color: "#B8964A",
  fontSize: "1.2rem",
};

const nameGradientStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(3rem, 8vw, 5rem)",
  fontWeight: 300,
  lineHeight: 1,
  letterSpacing: "0.05em",
  background: "linear-gradient(180deg, #E6C27A 0%, #B8964A 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const nameDividerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  margin: "1rem auto",
  width: "200px",
};

const nameLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "rgba(184,150,74,0.25)",
};

const nameAmpStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "2.5rem",
  color: "#B8964A",
  fontWeight: 300,
};

const dateStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  letterSpacing: "0.2em",
  color: "#6B5B4B",
  marginTop: "1.5rem",
  textTransform: "uppercase",
};

const locationStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.2em",
  color: "#4A3A2A",
  marginTop: "0.3rem",
  textTransform: "uppercase",
};

const topBtnStyle: React.CSSProperties = {
  padding: "0.8rem 2.5rem",
  border: "1px solid rgba(184,150,74,0.4)",
  background: "transparent",
  color: "#B8964A",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "999px",
};

const creditStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "0.65rem",
  color: "#3A2A1A",
  marginTop: "3rem",
  letterSpacing: "0.1em",
};