// components/wedding/Kado.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { weddingConfig } from "@/lib/weddingData";

export default function Kado() {
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

  return (
    <section id="kado" ref={sectionRef} style={sectionStyle}>
      {/* Efek Ambient Background */}
      <div style={bgGlow1Style} />
      <div style={bgGlow2Style} />

      <div style={containerStyle}>
        {/* Header Section */}
        <div className="animate" style={{ textAlign: "center", marginBottom: "clamp(3rem, 10vw, 5rem)" }}>
          <p style={labelStyle}>Wedding Gift</p>
          <div style={ornRowStyle}>
            <div style={ornLineStyle} />
            <span style={ornDiamondStyle}>◆</span>
            <div style={ornLineStyle} />
          </div>
          <h2 style={titleStyle}>Tanda Kasih</h2>
          <p style={subtitleStyle}>
            Doa tulus Anda adalah hadiah terindah bagi kami.
            <br />
            Namun jika ingin mengirimkan tanda kasih, dapat melalui:
          </p>
        </div>

        {/* Grid Kartu Rekening */}
        <div style={cardsGridStyle}>
          {weddingConfig.rekening.map((item, i) => (
            <RekeningCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="animate" style={noteWrapStyle}>
          <div style={ornRowStyle}>
            <div style={ornLineStyle} />
            <span style={ornDiamondStyle}>◆</span>
            <div style={ornLineStyle} />
          </div>
          <p style={noteStyle}>
            Kehadiran dan doa restu Anda jauh lebih berarti dari hadiah apapun.
            <br />
            Terima kasih atas segala perhatian dan kasih sayang Anda. 🙏
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .animate { transform: translateY(20px); }
        }
      `}</style>
    </section>
  );
}

// ─── Sub-komponen: RekeningCard ──────────────────────────

interface RekeningItem {
  bank: string;
  atasNama: string;
  nomor: string;
  icon: string;
  qris: string;
}

function RekeningCard({ item, index }: { item: RekeningItem; index: number }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    const cleanNum = item.nomor.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(cleanNum);
      setCopied(true);
    } catch (err) {
      // Fallback untuk browser lama/koneksi non-secure
      const textArea = document.createElement("textarea");
      textArea.value = cleanNum;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate kado-card" style={cardStyle}>
      <div style={cardTopLineStyle} />
      <div style={cardIndexStyle}>0{index + 1}</div>

      <div style={cardHeaderStyle}>
        <span style={bankIconStyle}>{item.icon}</span>
        <div style={{ textAlign: "left" }}>
          <p style={bankNameStyle}>{item.bank}</p>
          <p style={holderNameStyle}>a.n. {item.atasNama}</p>
        </div>
      </div>

      <div style={dividerStyle} />

      <div style={cardBodyStyle}>
        {showQR ? (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div style={qrFrameStyle}>
              <div style={qrInnerStyle}>
                <QRCodeSVG
                  value={item.qris}
                  size={140}
                  fgColor="#1a0a05"
                  bgColor="#FAF6F0"
                  level="H"
                />
              </div>
              <div style={{ ...qrCornerStyle, top: 6, left: 6, borderWidth: "1px 0 0 1px" }} />
              <div style={{ ...qrCornerStyle, top: 6, right: 6, borderWidth: "1px 1px 0 0" }} />
              <div style={{ ...qrCornerStyle, bottom: 6, left: 6, borderWidth: "0 0 1px 1px" }} />
              <div style={{ ...qrCornerStyle, bottom: 6, right: 6, borderWidth: "0 1px 1px 0" }} />
            </div>
            <p style={qrLabelStyle}>Scan QRIS untuk Transfer</p>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <p style={accountNumStyle}>{item.nomor}</p>
            <button onClick={handleCopy} className="copy-btn" style={{
                ...copyBtnStyle,
                background: copied ? "#B8964A" : "transparent",
                color: copied ? "#0d0503" : "#B8964A",
                borderColor: copied ? "#B8964A" : "rgba(184,150,74,0.4)",
              }}>
              {copied ? "✓ Tersalin!" : "📋 Salin Nomor"}
            </button>
          </div>
        )}
      </div>

      <button onClick={() => setShowQR(!showQR)} className="toggle-btn" style={toggleBtnStyle}>
        {showQR ? "← Lihat Nomor Rekening" : "Lihat QR Code →"}
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .kado-card { transition: all 0.4s ease; cursor: default; }
        .kado-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(184,150,74,0.4) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .copy-btn:hover { background: #B8964A !important; color: #0d0503 !important; }
        .toggle-btn { transition: all 0.3s ease; }
        .toggle-btn:hover { color: #B8964A !important; opacity: 1 !important; }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "#0d0503",
  padding: "clamp(5rem, 12vw, 8rem) 1.5rem",
  position: "relative",
  overflow: "hidden",
};

const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "-10%", left: "50%",
  transform: "translateX(-50%)",
  width: "min(800px, 150vw)",
  height: "400px",
  background: "radial-gradient(ellipse, rgba(184,150,74,0.08), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-5%", left: "50%",
  transform: "translateX(-50%)",
  width: "min(600px, 120vw)",
  height: "300px",
  background: "radial-gradient(ellipse, rgba(184,150,74,0.05), transparent 70%)",
  filter: "blur(40px)",
  pointerEvents: "none",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
  position: "relative",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1rem",
};

const ornRowStyle: React.CSSProperties = {
  display: "flex",
  alignContent: "center", 
  justifyContent: "center",
  gap: "0.75rem", 
  width: "120px", 
  margin: "1rem auto",
};

const ornLineStyle: React.CSSProperties = {
  flex: 1, height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A", fontSize: "0.45rem",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.05em",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "rgba(250,240,224,0.5)",
  lineHeight: 1.8,
  marginTop: "1.2rem",
  fontFamily: "var(--font-serif)",
  fontStyle: "italic",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "clamp(1.5rem, 4vw, 2.5rem)",
  marginTop: "2rem",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(184,150,74,0.12)",
  borderRadius: "24px",
  padding: "3rem 2rem",
  textAlign: "center",
  position: "relative",
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center",
};

const cardTopLineStyle: React.CSSProperties = {
  position: "absolute", 
  top: 0, 
  left: "30%", 
  right: "30%",
  height: "1px", 
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

const cardIndexStyle: React.CSSProperties = {
  position: "absolute", 
  top: "1.5rem", 
  right: "1.8rem",
  fontSize: "0.65rem", 
  color: "rgba(184,150,74,0.3)",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex", 
  alignItems: "center", 
  gap: "1rem",
  width: "100%", 
  marginBottom: "1.5rem",
};

const bankIconStyle: React.CSSProperties = { fontSize: "2rem" };

const bankNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)", 
  fontSize: "1.25rem", color: "#FAF0E0",
};

const holderNameStyle: React.CSSProperties = {
  fontSize: "0.7rem", 
  letterSpacing: "0.1em", 
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.6)", 
  marginTop: "0.2rem",
};

const dividerStyle: React.CSSProperties = {
  width: "100%", 
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.1), transparent)",
  marginBottom: "2.5rem",
};

const cardBodyStyle: React.CSSProperties = {
  minHeight: "180px", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  width: "100%",
};

const accountNumStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)", 
  fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
  color: "#B8964A", 
  letterSpacing: "0.05em", 
  marginBottom: "1.8rem",
};

const copyBtnStyle: React.CSSProperties = {
  padding: "0.8rem 2rem", 
  border: "1px solid rgba(184,150,74,0.3)",
  fontSize: "0.75rem", 
  letterSpacing: "0.15em", 
  cursor: "pointer",
  borderRadius: "50px", 
  transition: "0.3s ease",
};

const qrFrameStyle: React.CSSProperties = {
  position: "relative", 
  display: "inline-block", 
  padding: "12px",
  background: "#FAF6F0", 
  marginBottom: "1rem",
  borderRadius: "8px",
};

const qrInnerStyle: React.CSSProperties = { display: "block" };

const qrCornerStyle: React.CSSProperties = {
  position: "absolute", 
  width: "16px", height: "16px",
  borderStyle: "solid", 
  borderColor: "#B8964A",
};

const qrLabelStyle: React.CSSProperties = {
  fontSize: "0.7rem", 
  color: "rgba(250,240,224,0.4)", 
  textTransform: "uppercase", 
  letterSpacing: "0.1em",
};

const toggleBtnStyle: React.CSSProperties = {
  marginTop: "2rem", 
  background: "none", 
  border: "none",
  color: "rgba(250,240,224,0.3)", 
  fontSize: "0.72rem",
  letterSpacing: "0.1em", 
  cursor: "pointer", 
  opacity: 0.7,
};

const noteWrapStyle: React.CSSProperties = { textAlign: "center", marginTop: "5rem" };

const noteStyle: React.CSSProperties = {
  fontSize: "0.85rem", 
  color: "rgba(250,240,224,0.4)",
  fontStyle: "italic", 
  lineHeight: 1.8, fontFamily: "var(--font-serif)", 
  marginTop: "1rem",
};