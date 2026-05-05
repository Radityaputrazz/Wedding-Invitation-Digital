// components/wedding/Acara.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";

gsap.registerPlugin(ScrollTrigger);

export default function Acara() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        y: 80, opacity: 0, stagger: 0.3, duration: 1.5, ease: "power4.out",
        scrollTrigger: { trigger: ".event-card", start: "top 85%" }
      });

      const buttons = document.querySelectorAll(".btn-magnetic");
      buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e: any) => {
          const { left, top, width, height } = btn.getBoundingClientRect();
          const x = (e.clientX - left - width / 2) * 0.3;
          const y = (e.clientY - top - height / 2) * 0.3;
          gsap.to(btn, { x, y, duration: 0.3 });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="acara" ref={sectionRef} className="relative py-32 bg-[#1a1510] text-[#FAF0E0] overflow-hidden font-serif text-center">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.5em] text-[#B8964A] uppercase font-bold">Save The Date</span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-2 tracking-wide font-light">Waktu & Tempat</h2>
          <div className="w-16 h-px bg-[#B8964A]/40 mx-auto mt-6" />
        </div>

        {/* Grid Center */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <EventCard type="Akad Nikah" data={weddingConfig.akad} icon="💍" />
          <EventCard type="Resepsi" data={weddingConfig.resepsi} icon="🥂" />
        </div>
      </div>
    </section>
  );
}

function EventCard({ type, data, icon }: any) {
  return (
    <div className="event-card relative p-12 bg-white/5 backdrop-blur-sm border border-[#B8964A]/10 rounded-[2.5rem] flex flex-col items-center">
      <div className="w-14 h-14 flex items-center justify-center bg-[#B8964A]/5 rounded-full text-2xl mb-6 border border-[#B8964A]/20">
        {icon}
      </div>
      
      <h3 className="text-2xl mb-8 font-medium tracking-widest uppercase text-[#B8964A]">{type}</h3>
      
      {/* Teks di dalam kartu center */}
      <div className="space-y-6 text-center mb-10 w-full">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1 font-sans">Tanggal</p>
          <span className="text-lg tracking-wide">{data.tanggal}</span>
        </div>
        
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1 font-sans">Waktu</p>
          <span className="text-lg tracking-wide">{data.waktu}</span>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-sans">Lokasi</p>
          <strong className="block text-xl mb-2">{data.namaGedung}</strong>
          <p className="opacity-60 text-xs leading-relaxed max-w-[250px] mx-auto italic">{data.alamat}</p>
        </div>
      </div>

      <a href={data.mapsUrl} target="_blank" className="btn-magnetic group flex items-center justify-center w-full py-4 rounded-xl border border-[#B8964A]/30 text-[#B8964A] text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#B8964A] hover:text-[#1a1510]">
        Buka Maps
      </a>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={infoItemStyle}>
      <div style={infoIconBoxStyle}>{icon}</div>
      <div style={{ textAlign: "left" }}>
        <span style={infoLabelStyle}>{label}</span>
        <span style={infoValueStyle}>{value}</span>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "#1a1510",
  padding: "clamp(5rem, 10vw, 9rem) 1.5rem",
  position: "relative",
  overflow: "hidden",
};

const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "-150px", left: "-150px",
  width: "500px", height: "500px",
  background: "radial-gradient(circle, rgba(184,150,74,0.06), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-150px", right: "-150px",
  width: "500px", height: "500px",
  background: "radial-gradient(circle, rgba(123,140,110,0.05), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const vertLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0, left: "50%",
  width: "1px", height: "100%",
  background: "linear-gradient(180deg, transparent, rgba(184,150,74,0.05), transparent)",
  pointerEvents: "none",
};

const innerStyle: React.CSSProperties = {
  maxWidth: "1050px",
  margin: "0 auto",
  position: "relative",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.8)",
  marginBottom: "0.75rem",
};

const ornRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  width: "120px",
  margin: "0.75rem auto",
};

const ornLineStyle: React.CSSProperties = {
  flex: 1, height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A)",
};

const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A", fontSize: "0.45rem",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.04em",
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "rgba(250,240,224,0.35)",
  marginTop: "0.75rem",
  letterSpacing: "0.05em",
  fontStyle: "italic",
  fontFamily: "var(--font-serif)",
};

const cardsGridStyle: React.CSSProperties = {
  marginTop: "1rem",
};

const cardStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "4.5rem 2rem 3rem",
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(184,150,74,0.12)",
  transition: "all 0.5s ease",
  height: "100%",
};

const cardIndexStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.2rem", right: "1.5rem",
  fontFamily: "var(--font-serif)",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  color: "rgba(184,150,74,0.25)",
};

const cardTopLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0, left: "25%", right: "25%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: 0, left: "50%",
  transform: "translateX(-50%)",
  background: "linear-gradient(135deg, #B8964A, #8a6d2f)",
  color: "#1a1510",
  padding: "8px 24px",
  fontSize: "0.62rem",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
};

const iconCircleStyle: React.CSSProperties = {
  width: "64px", height: "64px",
  fontSize: "1.6rem",
  margin: "0 auto 1.5rem",
  background: "rgba(184,150,74,0.06)",
  border: "1px solid rgba(184,150,74,0.2)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.6rem, 5vw, 2rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  marginBottom: "2rem",
  letterSpacing: "0.03em",
};

const infoGridStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
};

const infoItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  width: "240px",
};

const infoIconBoxStyle: React.CSSProperties = {
  fontSize: "1rem",
  background: "rgba(184,150,74,0.08)",
  minWidth: "42px", height: "42px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "1px solid rgba(184,150,74,0.1)",
};

const infoLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.58rem",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.6)",
  letterSpacing: "0.15em",
  marginBottom: "2px",
};

const infoValueStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  color: "#FAF0E0",
  fontWeight: 400,
};

const cardDividerStyle: React.CSSProperties = {
  width: "60px", height: "1px",
  margin: "1.5rem auto",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.4), transparent)",
};

const locationBoxStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.4rem",
};

const locationIconStyle: React.CSSProperties = {
  fontSize: "1.3rem",
  marginBottom: "0.3rem",
};

const namaGedungStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
  background: "linear-gradient(180deg, #E6C27A, #B8964A)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const alamatStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  color: "rgba(250,240,224,0.45)",
  lineHeight: 1.7,
  maxWidth: "240px",
  marginTop: "0.3rem",
};

const mapsBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  padding: "1rem 2.5rem",
  fontSize: "0.7rem",
  textDecoration: "none",
  color: "#B8964A",
  border: "1px solid rgba(184, 150, 74, 0.3)",
  borderRadius: "999px",
  letterSpacing: "0.12em",
  fontWeight: 600,
  textTransform: "uppercase",
  display: "inline-flex",
  gap: "0.5rem"
};

