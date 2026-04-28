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
      {/* Garis ornamen atas */}
      <GoldLine />

      {/* Protokol - Mobile Friendly Grid */}
      <div className="animate protokol-container">
        <ProtokolItem icon="👔" title="Dress Code" desc={weddingConfig.dressCode} />
        <ProtokolItem 
          icon="📸" 
          title="Tagar Foto"
          desc={<>Bagikan momen Anda dengan <br/><strong style={{ color: "#B8964A" }}>{weddingConfig.hashtag}</strong></>}
        />
        <ProtokolItem icon="🅿️" title="Parkir" desc="Tersedia di Basement B1 & B2. Kapasitas terbatas." />
      </div>

      {/* Divider */}
      <div style={fullDividerStyle} />

      {/* Ayat penutup */}
      <div className="animate" style={{ textAlign: "center" }}>
        <GoldLine />
        <p style={labelStyle}>Penutup</p>
        <blockquote style={quoteStyle}>
          "Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?"
          <cite style={citeStyle}>— QS. Ar-Rahman: 13</cite>
        </blockquote>
        <GoldLine />
      </div>

      {/* Kalimat terima kasih */}
      <p className="animate" style={thanksStyle}>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
        kedua mempelai. Atas kehadiran dan doa restunya, kami ucapkan terima
        kasih yang sebesar-besarnya.
      </p>

      {/* Keluarga pengundang */}
      <div className="animate" style={{ textAlign: "center", marginTop: "3rem" }}>
        <p style={labelStyle}>Keluarga yang Mengundang</p>
        <p style={familyStyle}>
          {weddingConfig.keluargaPria}
          <br />
          <span style={{ color: "#B8964A", fontSize: "1.2rem", margin: "0.5rem 0", display: "inline-block" }}>&</span>
          <br />
          {weddingConfig.keluargaWanita}
        </p>
      </div>

      {/* Nama besar */}
      <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2 style={namesStyle}>
          {weddingConfig.pria.namaPanggilan}
          <span style={ampStyle}>&</span>
          {weddingConfig.wanita.namaPanggilan}
        </h2>
        <p style={dateStyle}>{weddingConfig.akad.tanggal} • Jakarta</p>
      </div>

      {/* Tombol kembali ke atas */}
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="top-btn"
          style={topBtnStyle}
        >
          ↑ Kembali ke Atas
        </button>
      </div>

      {/* Credit */}
      <p style={creditStyle}>
        Made with 💕 for {weddingConfig.pria.namaPanggilan} & {weddingConfig.wanita.namaPanggilan}
      </p>

      <style jsx>{`
        .animate { opacity: 0; transform: translateY(20px); transition: 1s ease; }
        .animate.visible { opacity: 1; transform: translateY(0); }

        .protokol-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          maxWidth: 900px;
          margin: 0 auto;
        }

        .top-btn:hover {
          background: #B8964A !important;
          color: #1a1510 !important;
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 768px) {
          .protokol-container {
            grid-template-columns: 1fr; /* Stack satu per satu di HP */
            gap: 1rem;
          }
          
          footer {
            padding: 4rem 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

function GoldLine() {
  return (
    <div style={{
      width: "80px",
      height: "1px",
      background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
      margin: "2rem auto",
    }} />
  );
}

function ProtokolItem({ icon, title, desc }: { icon: string; title: string; desc: React.ReactNode }) {
  return (
    <div style={protokolItemStyle}>
      <span style={protokolIconStyle}>{icon}</span>
      <p style={protokolTitleStyle}>{title}</p>
      <div style={protokolDescStyle}>{desc}</div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const footerStyle: React.CSSProperties = {
  background: "#1a1510", // Brown dark
  color: "#FAF0E0",
  padding: "6rem 2rem",
  borderTop: "1px solid rgba(184, 150, 74, 0.2)",
};

const protokolItemStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "2rem 1rem",
  border: "1px solid rgba(184, 150, 74, 0.1)",
  background: "rgba(255, 255, 255, 0.02)",
  borderRadius: "15px",
};

const protokolIconStyle: React.CSSProperties = {
  fontSize: "1.8rem",
  display: "block",
  marginBottom: "0.75rem",
};

const protokolTitleStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "0.5rem",
};

const protokolDescStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#B8A898",
  lineHeight: 1.6,
};

const fullDividerStyle: React.CSSProperties = {
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.2), transparent)",
  margin: "4rem auto",
  maxWidth: "500px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "#B8964A",
};

const quoteStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "1.2rem",
  fontStyle: "italic",
  color: "#D4C4A8",
  lineHeight: 1.8,
  maxWidth: "500px",
  margin: "1.5rem auto",
};

const citeStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "#6B5B4B",
  fontStyle: "normal",
  marginTop: "1rem",
};

const thanksStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#B8A898",
  maxWidth: "550px",
  margin: "2rem auto",
  lineHeight: 1.8,
  textAlign: "center",
};

const familyStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#D4C4A8",
  lineHeight: 1.8,
  marginTop: "1rem",
};

const namesStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "3rem",
  color: "#B8964A",
  lineHeight: 1,
};

const ampStyle: React.CSSProperties = {
  display: "block",
  fontSize: "1.5rem",
  color: "#FAF0E0",
  margin: "0.5rem 0",
};

const dateStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#6B5B4B",
  letterSpacing: "0.2em",
  marginTop: "1rem",
};

const topBtnStyle: React.CSSProperties = {
  padding: "0.8rem 2rem",
  border: "1px solid #B8964A",
  background: "transparent",
  color: "#B8964A",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  cursor: "pointer",
  borderRadius: "50px",
  transition: "all 0.3s",
};

const creditStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "0.7rem",
  color: "#4A3A2A",
  marginTop: "4rem",
  opacity: 0.6,
};