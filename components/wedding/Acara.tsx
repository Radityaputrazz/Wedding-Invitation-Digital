// components/wedding/Acara.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Acara() {
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

    sectionRef.current
      ?.querySelectorAll(".animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="acara" ref={sectionRef} style={sectionStyle}>
      <div style={innerStyle}>
        
        {/* Header Section */}
        <div className="animate" style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={sectionLabelStyle}>Save The Date</p>
          <h2 style={sectionTitleStyle}>Waktu & Tempat</h2>
          <div style={ornamentWrapper}>
            <div style={ornamentLine} />
            <span style={{ fontSize: "1rem", color: "rgba(184,150,74,0.9)", letterSpacing: "0.2em" }}>
              ◆
            </span>
            <div style={ornamentLine} />
          </div>
        </div>

        {/* Kartu Akad & Resepsi */}
        <div className="event-grid" style={cardsGridStyle}>
          <EventCard
            type="Akad Nikah"
            name="Ijab Qabul"
            data={weddingConfig.akad}
            icon="💍"
          />
          <EventCard
            type="Resepsi Pernikahan"
            name="Walimatul 'Ursy"
            data={weddingConfig.resepsi}
            icon="🥂"
          />
        </div>

        {/* Countdown Area */}
        <div className="animate" style={countdownSectionStyle}>
          <div style={countdownCardStyle}>
            <p style={countdownLabelStyle}>Menghitung Mundur Hari Bahagia</p>
            <Countdown />
            
            <div style={calBtnsStyle}>
              <CalendarButton 
                href={weddingConfig.googleCalendarUrl} 
                label="Google Calendar" 
                icon="📅"
              />
              <CalendarButton 
                href={icalContent()} 
                label="Simpan ke iCal" 
                icon="📱"
                download="pernikahan.ics"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate { opacity: 0; transform: translateY(30px); transition: 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .animate.visible { opacity: 1; transform: translateY(0); }
        
        @media (max-width: 850px) {
          .event-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Sub-komponen: EventCard ───────────────────────────────

function EventCard({ type, name, data, icon }: { type: string; name: string; data: any; icon: string }) {
  return (
    <div className="animate card-hover" style={cardStyle}>
      <div style={badgeStyle}>{type}</div>
      <div style={iconCircleStyle}>{icon}</div>
      <h3 style={cardNameStyle}>{name}</h3>
      
      <div style={cardInfoBox}>
        {/* Kontainer Tanggal & Waktu yang Diperbaiki Presisinya */}
        <div className="info-container" style={infoContainerStyle}>
          <div style={infoItem}>
            <div style={infoIconBox}>🗓</div>
            <div style={infoTextGroup}>
              <span style={infoLabelText}>Hari & Tanggal</span>
              <span style={infoValueText}>{data.tanggal}</span>
            </div>
          </div>

          <div style={infoItem}>
            <div style={infoIconBox}>⏰</div>
            <div style={infoTextGroup}>
              <span style={infoLabelText}>Waktu Acara</span>
              <span style={infoValueText}>{data.waktu}</span>
            </div>
          </div>
        </div>

        <div style={cardDividerStyle} />

        <div style={locationBoxStyle}>
          <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>📍</div>
          <strong style={namaGedungStyle}>{data.namaGedung}</strong>
          <p style={alamatTextStyle}>{data.alamat}</p>
        </div>
      </div>

      <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" style={mapsBtnStyle} className="btn-glow">
        Petunjuk Lokasi
      </a>

      <style jsx>{`
        .card-hover { transition: all 0.5s ease; }
        .card-hover:hover { 
          transform: translateY(-10px); 
          background: rgba(255,255,255,0.04) !important;
          border-color: #B8964A !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
        .btn-glow:hover { 
          background: #B8964A !important; 
          color: #1a1510 !important;
        }
      `}</style>
    </div>
  );
}

// ─── Sub-komponen: Countdown & Helpers ─────────────────────

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { v: timeLeft.days, l: "Hari" },
    { v: timeLeft.hours, l: "Jam" },
    { v: timeLeft.minutes, l: "Menit" },
    { v: timeLeft.seconds, l: "Detik" },
  ];

  return (
    <div className="countdown-flex">
      {items.map((item, i) => (
        <div key={item.l} style={{ display: "flex", alignItems: "center" }}>
          <div className="countdown-box">
            <span className="num">{String(item.v).padStart(2, "0")}</span>
            <span className="label">{item.l}</span>
          </div>
          {i < items.length - 1 && <span className="colon">:</span>}
        </div>
      ))}
      <style jsx>{`
        .countdown-flex { display: flex; justify-content: center; align-items: center; gap: 0.8rem; margin-top: 2.5rem; }
        .countdown-box { min-width: 80px; text-align: center; }
        .num { display: block; font-family: serif; font-size: 3rem; color: #FAF0E0; line-height: 1; font-variant-numeric: tabular-nums; }
        .label { font-size: 0.7rem; text-transform: uppercase; color: #B8964A; letter-spacing: 1px; margin-top: 8px; display: block; }
        .colon { font-size: 2rem; color: #B8964A; opacity: 0.4; padding-bottom: 1.5rem; }
        @media (max-width: 480px) {
          .countdown-box { min-width: 60px; }
          .num { font-size: 2.2rem; }
          .label { font-size: 0.6rem; }
          .countdown-flex { gap: 0.3rem; }
          .colon { font-size: 1.5rem; padding-bottom: 1rem; }
        }
      `}</style>
    </div>
  );
}

function CalendarButton({ href, label, icon, download }: any) {
  return (
    <a href={href} download={download} target="_blank" rel="noopener noreferrer" style={calBtnStyle} className="cal-btn">
      {icon} {label}
      <style jsx>{`
        .cal-btn:hover { background: #B8964A !important; color: #1a1510 !important; transform: scale(1.05); }
      `}</style>
    </a>
  );
}

function getTimeLeft() {
  const target = new Date(weddingConfig.weddingDate).getTime();
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function icalContent() {
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "SUMMARY:Pernikahan", "END:VEVENT", "END:VCALENDAR"].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}

// ─── Styles (Presisi & Responsif) ───────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "#1a1510",
  padding: "clamp(4rem, 10vw, 8rem) 1.2rem",
  position: "relative",
};

const innerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  width: "100%",
  padding: "0 clamp(0.5rem, 4vw, 1.5rem)",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "clamp(0.65rem, 2.5vw, 0.75rem)",
  letterSpacing: "0.6em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.85)",
  marginBottom: "0.6rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.04em",
  lineHeight: 1.2,
  textShadow: "0 6px 25px rgba(0,0,0,0.4)",
};

const ornamentWrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(12px, 4vw, 24px)",
  marginTop: "1.8rem",
};

const ornamentLine: React.CSSProperties = {
  width: "clamp(40px, 10vw, 70px)",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.9), transparent)",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "clamp(2rem, 5vw, 3rem)",
  marginTop: "3rem",
};

const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "clamp(3.5rem, 8vw, 5rem) 1.5rem 3rem",
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(12px)",
  borderRadius: "32px",
  border: "1px solid rgba(184,150,74,0.15)",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "0", left: "50%", transform: "translateX(-50%)",
  background: "linear-gradient(180deg, #B8964A, #8a6d2f)",
  color: "#1a1510",
  padding: "10px 28px",
  fontSize: "0.7rem",
  fontWeight: "bold",
  letterSpacing: "2px",
  textTransform: "uppercase",
  borderBottomLeftRadius: "16px",
  borderBottomRightRadius: "16px",
};

const iconCircleStyle: React.CSSProperties = {
  width: "70px",
  height: "70px",
  fontSize: "1.8rem",
  margin: "0 auto 1.5rem",
  background: "rgba(184,150,74,0.08)",
  border: "1px solid rgba(184,150,74,0.3)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardNameStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "clamp(1.8rem, 6vw, 2.2rem)",
  color: "#FAF0E0",
  marginBottom: "2.5rem",
};

const cardInfoBox: React.CSSProperties = { 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  gap: "1.5rem",
  width: "100%"
};

// PENYELARAS POSISI (KUNCI JAWABAN)
const infoContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Memastikan grup teks ada di tengah kartu
  gap: "1.2rem",
  width: "100%",
};

const infoItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  textAlign: "left",
  width: "240px", // Mengunci lebar agar ikon kalender & jam sejajar lurus
};

const infoIconBox: React.CSSProperties = {
  fontSize: "1.2rem",
  background: "rgba(184,150,74,0.12)",
  minWidth: "46px", // Lebar kotak ikon dikunci agar teks di sampingnya sejajar
  height: "46px",
  borderRadius: "12px",
  color: "#B8964A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const infoTextGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const infoLabelText: React.CSSProperties = {
  fontSize: "0.6rem",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.8)",
  letterSpacing: "0.12em",
  fontWeight: 600,
};

const infoValueText: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#FAF0E0",
  fontWeight: 500,
};

const cardDividerStyle: React.CSSProperties = {
  width: "80px",
  height: "1px",
  margin: "0.5rem auto",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.8), transparent)",
  opacity: 0.5,
};

const locationBoxStyle: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
};

const namaGedungStyle: React.CSSProperties = {
  fontSize: "clamp(1.3rem, 5vw, 1.6rem)",
  fontFamily: "var(--font-serif)",
  color: "#E6C27A",
  background: "linear-gradient(180deg, #E6C27A, #B8964A)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const alamatTextStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(250,240,224,0.6)",
  lineHeight: 1.6,
  maxWidth: "260px",
};

const mapsBtnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "2.5rem",
  padding: "0.9rem 2.5rem",
  fontSize: "0.8rem",
  textDecoration: "none",
  color: "#B8964A",
  border: "1px solid #B8964A",
  borderRadius: "999px",
  transition: "0.3s",
  fontWeight: 600,
};

const countdownSectionStyle: React.CSSProperties = {
  marginTop: "clamp(5rem, 15vw, 8rem)",
  textAlign: "center",
};

const countdownCardStyle: React.CSSProperties = {
  padding: "clamp(3rem, 8vw, 4.5rem) 1.5rem",
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(14px)",
  borderRadius: "32px",
  border: "1px solid rgba(184,150,74,0.15)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  position: "relative",
};

const countdownLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.8)",
};

const calBtnsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
  marginTop: "3rem",
};

const calBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "0.8rem 1.8rem",
  fontSize: "0.8rem",
  textDecoration: "none",
  color: "#FAF0E0",
  border: "1px solid #B8964A",
  borderRadius: "14px",
  transition: "0.3s",
  minWidth: "220px",
};