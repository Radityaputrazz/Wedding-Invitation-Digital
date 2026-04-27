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
        <div className="animate" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={sectionLabelStyle}>Save The Date</p>
          <h2 style={sectionTitleStyle}>Waktu & Tempat</h2>
          <div style={ornamentWrapper}>
            <div style={ornamentLine} />
            <span style={{ fontSize: "1.2rem", color: "var(--gold)" }}>✦</span>
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
        @media (max-width: 850px) {
          .event-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

function EventCard({ type, name, data, icon }: { type: string; name: string; data: any; icon: string }) {
  return (
    <div className="animate card-hover" style={cardStyle}>
      <div style={iconCircleStyle}>{icon}</div>
      <p style={cardTypeStyle}>{type}</p>
      <h3 style={cardNameStyle}>{name}</h3>
      
      <div style={cardInfoBox}>
        <div style={infoRowStyle}>
          <div style={infoItem}><span style={infoIcon}>🗓</span>{data.tanggal}</div>
          <div style={infoItem}><span style={infoIcon}>⏰</span>{data.waktu} WIB</div>
        </div>

        <div style={cardDividerStyle} />

        <div style={locationBoxStyle}>
          <div style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "8px" }}>📍</div>
          <strong style={namaGedungStyle}>{data.namaGedung}</strong>
          <p style={alamatTextStyle}>{data.alamat}</p>
        </div>
      </div>

      <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" style={mapsBtnStyle} className="btn-glow">
        Buka Google Maps
      </a>

      <style jsx>{`
        .card-hover { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { 
          transform: translateY(-10px); 
          background: rgba(255,255,255,0.06) !important;
          border-color: var(--gold) !important;
        }
        .btn-glow:hover { 
          background: var(--gold) !important; 
          color: var(--brown-dark) !important;
          box-shadow: 0 0 20px rgba(184,150,74,0.5);
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
        .cal-btn:hover { 
          background: var(--gold) !important; 
          color: var(--brown-dark) !important; 
          transform: scale(1.05);
        }
      `}</style>
    </a>
  );
}

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
    <div style={countdownGridStyle}>
      {items.map((item, i) => (
        <div key={item.l} style={{ display: "flex", alignItems: "center" }}>
          <div style={countdownBox}>
            <span style={countdownNumStyle}>{String(item.v).padStart(2, "0")}</span>
            <span style={countdownUnitStyle}>{item.l}</span>
          </div>
          {i < items.length - 1 && <span style={colonStyle}>:</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────

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
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "SUMMARY:Pernikahan", "LOCATION:Jakarta", "END:VEVENT", "END:VCALENDAR"].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}

// ─── Styles: Containers ───────────────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, #1a1510, #2a2219)",
  padding: "8rem 1.5rem",
  position: "relative",
};

const innerStyle: React.CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
  marginTop: "4rem",
};

// ─── Styles: Typography & Ornament ────────────────────────

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 500,
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "var(--gold)",
  marginBottom: "0.5rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
};

const ornamentWrapper: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  marginTop: "1rem",
};

const ornamentLine: React.CSSProperties = {
  width: "60px",
  height: "1px",
  background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
};

// ─── Styles: Event Cards ───────────────────────────────────

const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "3rem 2rem",
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  border: "1px solid rgba(184,150,74,0.15)",
};

const iconCircleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "65px",
  height: "65px",
  margin: "0 auto 1.5rem",
  fontSize: "1.6rem",
  background: "rgba(184,150,74,0.1)",
  border: "1px solid var(--gold)",
  borderRadius: "50%",
};

const cardTypeStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--gold-light)",
  marginBottom: "0.5rem",
};

const cardNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "2.2rem",
  color: "#FAF0E0",
  marginBottom: "1.5rem",
};

const cardInfoBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const infoRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "1.5rem",
  marginBottom: "0.5rem",
};

const infoItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.95rem",
  color: "#B8A898",
};

const infoIcon: React.CSSProperties = {
  color: "var(--gold)",
};

const cardDividerStyle: React.CSSProperties = {
  width: "40px",
  height: "1px",
  background: "rgba(184,150,74,0.3)",
  margin: "0.5rem 0",
};

const locationBoxStyle: React.CSSProperties = {
  textAlign: "center",
  width: "100%",
};

const namaGedungStyle: React.CSSProperties = {
  display: "block",
  fontSize: "1.2rem",
  fontWeight: 500,
  letterSpacing: "0.5px",
  color: "#FAF0E0",
  marginBottom: "8px",
};

const alamatTextStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  lineHeight: 1.6,
  maxWidth: "280px",
  margin: "0 auto",
  color: "#B8A898",
};

const mapsBtnStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: "2.5rem",
  padding: "0.8rem 2.5rem",
  fontSize: "0.85rem",
  letterSpacing: "0.1em",
  textDecoration: "none",
  color: "var(--gold-light)",
  background: "transparent",
  border: "1px solid var(--gold)",
  borderRadius: "50px",
  transition: "all 0.4s",
};

// ─── Styles: Countdown Section ─────────────────────────────

const countdownSectionStyle: React.CSSProperties = {
  marginTop: "6rem",
  textAlign: "center",
};

const countdownCardStyle: React.CSSProperties = {
  padding: "3.5rem 2rem",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "32px",
  border: "1px dashed rgba(184,150,74,0.2)",
};

const countdownLabelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "var(--gold-light)",
};

const countdownGridStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "2rem",
};

const countdownBox: React.CSSProperties = {
  minWidth: "85px",
};

const countdownNumStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-serif)",
  fontSize: "3.5rem",
  lineHeight: 1,
  color: "#FAF0E0",
};

const countdownUnitStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--gold-light)",
  marginTop: "5px",
};

const colonStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  paddingBottom: "1.2rem",
  color: "var(--gold)",
  opacity: 0.4,
};

// ─── Styles: Buttons ──────────────────────────────────────

const calBtnsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1.5rem",
  marginTop: "3rem",
};

const calBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0.8rem 1.8rem",
  fontSize: "0.85rem",
  textDecoration: "none",
  color: "var(--gold-light)",
  background: "rgba(184,150,74,0.05)",
  border: "1px solid var(--gold)",
  borderRadius: "12px",
  transition: "all 0.3s",
};