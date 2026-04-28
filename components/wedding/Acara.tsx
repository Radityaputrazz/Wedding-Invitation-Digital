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
            <span style={{ fontSize: "1.2rem", color: "#B8964A" }}>✦</span>
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
        {/* Kontainer Tanggal & Waktu yang Diperbaiki */}
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
              <span style={infoValueText}>{data.waktu} WIB</span>
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
        @media (max-width: 480px) {
          .info-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.2rem !important;
            width: fit-content !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-komponen: Countdown ───────────────────────────────

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

// ─── Helper Functions ─────────────────────────────────────

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

// ─── Styles ───────────────────────────────────────────────

const sectionStyle: React.CSSProperties = { background: "#1a1510", padding: "8rem 1.5rem", position: "relative" };
const innerStyle: React.CSSProperties = { maxWidth: "1000px", margin: "0 auto" };
const cardsGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginTop: "4rem" };
const sectionLabelStyle: React.CSSProperties = { fontSize: "0.75rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#B8964A", marginBottom: "0.5rem" };
const sectionTitleStyle: React.CSSProperties = { fontFamily: "serif", fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 300, color: "#FAF0E0" };
const ornamentWrapper: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "1.5rem" };
const ornamentLine: React.CSSProperties = { width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #B8964A, transparent)" };

// Card Styles
const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "4.5rem 2rem 3.5rem",
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
  padding: "8px 24px",
  fontSize: "0.65rem",
  fontWeight: "bold",
  letterSpacing: "2px",
  textTransform: "uppercase",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
};

const iconCircleStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  width: "65px", height: "65px", margin: "0 auto 1.5rem",
  fontSize: "1.8rem", background: "rgba(184,150,74,0.08)",
  border: "1px solid rgba(184,150,74,0.3)", borderRadius: "50%",
};

const cardNameStyle: React.CSSProperties = { fontFamily: "serif", fontSize: "2.2rem", color: "#FAF0E0", marginBottom: "2.5rem" };

const cardInfoBox: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" };

// Info Item Styles (The Fix)
const infoContainerStyle: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "360px", gap: "1rem"
};

const infoItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: "12px", textAlign: "left" };

const infoIconBox: React.CSSProperties = {
  fontSize: "1.3rem", background: "rgba(184, 150, 74, 0.15)",
  padding: "10px", borderRadius: "12px", color: "#B8964A",
  display: "flex", alignItems: "center", justifyContent: "center"
};

const infoTextGroup: React.CSSProperties = { display: "flex", flexDirection: "column" };
const infoLabelText: React.CSSProperties = { fontSize: "0.6rem", textTransform: "uppercase", color: "#B8964A", letterSpacing: "1px", marginBottom: "2px", fontWeight: 600 };
const infoValueText: React.CSSProperties = { fontSize: "0.9rem", color: "#FAF0E0", fontWeight: 500 };

const cardDividerStyle: React.CSSProperties = { width: "80px", height: "1px", background: "radial-gradient(circle, #B8964A 0%, transparent 100%)", opacity: 0.5, margin: "0.5rem 0" };

const locationBoxStyle: React.CSSProperties = { textAlign: "center" };
const namaGedungStyle: React.CSSProperties = { display: "block", fontSize: "1.25rem", color: "#B8964A", marginBottom: "6px", fontFamily: "serif" };
const alamatTextStyle: React.CSSProperties = { fontSize: "0.85rem", color: "#B8A898", lineHeight: 1.6, maxWidth: "260px" };

const mapsBtnStyle: React.CSSProperties = {
  display: "inline-block", marginTop: "2.5rem", padding: "0.8rem 2.2rem",
  fontSize: "0.8rem", textDecoration: "none", color: "#B8964A",
  border: "1px solid #B8964A", borderRadius: "50px", transition: "0.3s", fontWeight: 500
};

const countdownSectionStyle: React.CSSProperties = { marginTop: "6rem", textAlign: "center" };
const countdownCardStyle: React.CSSProperties = { padding: "4rem 1rem", background: "rgba(255,255,255,0.01)", borderRadius: "32px", border: "1px dashed rgba(184,150,74,0.15)" };
const countdownLabelStyle: React.CSSProperties = { fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8964A" };
const calBtnsStyle: React.CSSProperties = { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.2rem", marginTop: "3.5rem" };
const calBtnStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "10px", padding: "0.8rem 1.8rem", fontSize: "0.85rem", textDecoration: "none", color: "#FAF0E0", border: "1px solid #B8964A", borderRadius: "12px", transition: "0.3s" };