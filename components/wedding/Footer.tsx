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

      {/* Protokol */}
      <div className="animate" style={protokolGridStyle}>
        <ProtokolItem icon="👔" title="Dress Code" desc={weddingConfig.dressCode} />
        <ProtokolItem icon="📸" title="Tagar Foto"
          desc={<>Bagikan momen Anda dengan <strong style={{ color: "var(--sage-light)" }}>{weddingConfig.hashtag}</strong></>}
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
      <div className="animate" style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <p style={labelStyle}>Keluarga yang Mengundang</p>
        <p style={familyStyle}>
          {weddingConfig.keluargaPria}
          <br />
          <span style={{ color: "var(--gold-light)", fontSize: "1.2rem" }}>&</span>
          <br />
          {weddingConfig.keluargaWanita}
        </p>
      </div>

      {/* Nama besar */}
      <div className="animate" style={{ textAlign: "center", marginTop: "3rem" }}>
        <h2 style={namesStyle}>
          {weddingConfig.pria.namaPanggilan}
          <span style={ampStyle}>&</span>
          {weddingConfig.wanita.namaPanggilan}
        </h2>
        <p style={dateStyle}>{weddingConfig.akad.tanggal} • Jakarta</p>
      </div>

      {/* Tombol kembali ke atas */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={topBtnStyle}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "var(--brown-dark)";
          }}
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--gold-light)";
          }}
        >
          ↑ Kembali ke Atas
        </button>
      </div>

      {/* Credit */}
      <p style={creditStyle}>
        Made with 💕 for {weddingConfig.pria.namaPanggilan} & {weddingConfig.wanita.namaPanggilan}
      </p>

    </footer>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

function GoldLine() {
  return (
    <div style={{
      width: "120px",
      height: "1px",
      background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
      margin: "1.5rem auto",
    }} />
  );
}

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
    <div className="animate" style={protokolItemStyle}>
      <span style={protokolIconStyle}>{icon}</span>
      <p style={protokolTitleStyle}>{title}</p>
      <p style={protokolDescStyle}>{desc}</p>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const footerStyle: React.CSSProperties = {
  background: "var(--brown-dark)",
  color: "#FAF0E0",
  padding: "4rem 2rem",
};

const protokolGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1.5rem",
  maxWidth: "800px",
  margin: "0 auto 0",
};

const protokolItemStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "1.5rem 1rem",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
};

const protokolIconStyle: React.CSSProperties = {
  fontSize: "2rem",
  display: "block",
  marginBottom: "0.75rem",
};

const protokolTitleStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--sage-light)",
  marginBottom: "0.4rem",
};

const protokolDescStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#8B7B6B",
  lineHeight: 1.7,
};

const fullDividerStyle: React.CSSProperties = {
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.3), transparent)",
  margin: "3rem 0",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "var(--gold-light)",
};

const quoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.4rem",
  fontWeight: 300,
  fontStyle: "italic",
  color: "#D4C4A8",
  lineHeight: 1.8,
  maxWidth: "600px",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  textAlign: "center",
};

const citeStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#6B5B4B",
  fontStyle: "normal",
  letterSpacing: "0.05em",
};

const thanksStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#8B7B6B",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.9,
  textAlign: "center",
};

const familyStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#D4C4A8",
  lineHeight: 2.2,
  marginTop: "0.75rem",
  textAlign: "center",
};

const namesStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.5rem, 6vw, 4rem)",
  fontWeight: 300,
  color: "var(--gold)",
  lineHeight: 1.1,
};

const ampStyle: React.CSSProperties = {
  display: "block",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  color: "var(--gold-light)",
  margin: "0.3rem 0",
};

const dateStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#4A3A2A",
  letterSpacing: "0.15em",
  marginTop: "0.75rem",
};

const topBtnStyle: React.CSSProperties = {
  padding: "0.7rem 1.5rem",
  border: "1px solid var(--gold)",
  background: "transparent",
  color: "var(--gold-light)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.8rem",
  letterSpacing: "0.15em",
  cursor: "pointer",
  transition: "all 0.3s",
};

const creditStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "0.75rem",
  color: "#3A2A1A",
  marginTop: "2.5rem",
  letterSpacing: "0.1em",
};