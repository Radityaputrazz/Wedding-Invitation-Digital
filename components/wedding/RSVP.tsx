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

      {/* Background glow */}
      <div style={bgGlow1Style} />
      <div style={bgGlow2Style} />

      <div style={containerStyle}>

        {/* Header */}
        <div className="animate" style={{ textAlign: "center", marginBottom: "5rem" }}>
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

        {/* Kartu rekening */}
        <div style={cardsGridStyle}>
          {weddingConfig.rekening.map((item, i) => (
            <RekeningCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Catatan */}
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
          transition: opacity 1s ease, transform 1s ease;
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .kado-card {
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .kado-card:hover {
          transform: translateY(-8px);
          border-color: rgba(184,150,74,0.5) !important;
          box-shadow: 0 20px 40px rgba(184,150,74,0.1);
        }
        .copy-btn {
          transition: all 0.3s ease;
        }
        .copy-btn:hover {
          background: #B8964A !important;
          color: #0d0503 !important;
          border-color: #B8964A !important;
        }
        .toggle-btn {
          transition: color 0.3s ease;
        }
        .toggle-btn:hover {
          color: #B8964A !important;
        }
      `}</style>
    </section>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

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

  function handleCopy() {
    navigator.clipboard
      .writeText(item.nomor.replace(/\s/g, ""))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        const el = document.createElement("textarea");
        el.value = item.nomor.replace(/\s/g, "");
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
  }

  return (
    <div className="animate kado-card" style={cardStyle}>

      {/* Garis emas atas */}
      <div style={cardTopLineStyle} />

      {/* Nomor kartu */}
      <div style={cardIndexStyle}>0{index + 1}</div>

      {/* Header bank */}
      <div style={cardHeaderStyle}>
        <span style={bankIconStyle}>{item.icon}</span>
        <div style={{ textAlign: "left" }}>
          <p style={bankNameStyle}>{item.bank}</p>
          <p style={holderNameStyle}>a.n. {item.atasNama}</p>
        </div>
      </div>

      {/* Divider */}
      <div style={dividerStyle} />

      {/* Body — nomor / QR */}
      <div style={cardBodyStyle}>
        {showQR ? (
          <div style={{ textAlign: "center" }}>
            {/* Frame QR */}
            <div style={qrFrameStyle}>
              <div style={qrInnerStyle}>
                <QRCodeSVG
                  value={item.qris}
                  size={130}
                  fgColor="#1a0a05"
                  bgColor="#FAF6F0"
                  level="H"
                />
              </div>
              {/* Sudut dekoratif QR */}
              <div style={{ ...qrCornerStyle, top: 6, left: 6, borderWidth: "1px 0 0 1px" }} />
              <div style={{ ...qrCornerStyle, top: 6, right: 6, borderWidth: "1px 1px 0 0" }} />
              <div style={{ ...qrCornerStyle, bottom: 6, left: 6, borderWidth: "0 0 1px 1px" }} />
              <div style={{ ...qrCornerStyle, bottom: 6, right: 6, borderWidth: "0 1px 1px 0" }} />
            </div>
            <p style={qrLabelStyle}>Scan QRIS untuk Transfer</p>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            {/* Nomor rekening */}
            <p style={accountNumStyle}>{item.nomor}</p>

            {/* Tombol salin */}
            <button
              onClick={handleCopy}
              className="copy-btn"
              style={{
                ...copyBtnStyle,
                background: copied ? "#B8964A" : "transparent",
                color: copied ? "#0d0503" : "#B8964A",
                borderColor: copied ? "#B8964A" : "rgba(184,150,74,0.4)",
              }}
            >
              {copied ? "✓ Tersalin!" : "📋 Salin Nomor"}
            </button>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowQR(!showQR)}
        className="toggle-btn"
        style={toggleBtnStyle}
      >
        {showQR ? "← Lihat Nomor Rekening" : "Lihat QR Code →"}
      </button>

    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  background: "#0d0503",
  padding: "8rem 1.5rem",
  position: "relative",
  overflow: "hidden",
};

const bgGlow1Style: React.CSSProperties = {
  position: "absolute",
  top: "-100px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "800px",
  height: "400px",
  background: "radial-gradient(ellipse, rgba(184,150,74,0.07), transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
};

const bgGlow2Style: React.CSSProperties = {
  position: "absolute",
  bottom: "-100px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "600px",
  height: "300px",
  background: "radial-gradient(ellipse, rgba(123,140,110,0.05), transparent 70%)",
  filter: "blur(40px)",
  pointerEvents: "none",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  position: "relative",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.4em",
  textTransform: "uppercase",
  color: "#B8964A",
  marginBottom: "1rem",
};

const ornRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  width: "120px",
  margin: "1rem auto",
};

const ornLineStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A)",
};

const ornDiamondStyle: React.CSSProperties = {
  color: "#B8964A",
  fontSize: "0.45rem",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
  fontWeight: 300,
  color: "#FAF0E0",
  letterSpacing: "0.05em",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.88rem",
  color: "rgba(250,240,224,0.5)",
  lineHeight: 1.9,
  marginTop: "1rem",
  fontStyle: "italic",
  fontFamily: "var(--font-serif)",
};

const cardsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "2rem",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(184,150,74,0.15)",
  padding: "2.5rem",
  textAlign: "center",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cardTopLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "20%",
  right: "20%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, #B8964A, transparent)",
};

const cardIndexStyle: React.CSSProperties = {
  position: "absolute",
  top: "1.2rem",
  right: "1.5rem",
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  color: "rgba(184,150,74,0.3)",
  fontFamily: "var(--font-serif)",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  marginBottom: "1.5rem",
};

const bankIconStyle: React.CSSProperties = {
  fontSize: "2.2rem",
};

const bankNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.2rem",
  fontWeight: 400,
  color: "#FAF0E0",
};

const holderNameStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(184,150,74,0.6)",
  marginTop: "0.2rem",
};

const dividerStyle: React.CSSProperties = {
  width: "100%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(184,150,74,0.15), transparent)",
  marginBottom: "2rem",
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
  fontSize: "2rem",
  color: "#B8964A",
  letterSpacing: "0.1em",
  marginBottom: "1.5rem",
};

const copyBtnStyle: React.CSSProperties = {
  padding: "0.7rem 1.8rem",
  border: "1px solid rgba(184,150,74,0.4)",
  fontSize: "0.78rem",
  letterSpacing: "0.12em",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
};

const qrFrameStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  padding: "16px",
  background: "#FAF6F0",
  marginBottom: "1rem",
};

const qrInnerStyle: React.CSSProperties = {
  display: "block",
};

const qrCornerStyle: React.CSSProperties = {
  position: "absolute",
  width: "16px",
  height: "16px",
  borderStyle: "solid",
  borderColor: "#B8964A",
};

const qrLabelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  color: "rgba(250,240,224,0.4)",
  textTransform: "uppercase",
};

const toggleBtnStyle: React.CSSProperties = {
  marginTop: "1.5rem",
  background: "none",
  border: "none",
  color: "rgba(250,240,224,0.25)",
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
};

const noteWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "5rem",
};

const noteStyle: React.CSSProperties = {
  fontSize: "0.88rem",
  color: "rgba(250,240,224,0.4)",
  fontStyle: "italic",
  lineHeight: 1.9,
  fontFamily: "var(--font-serif)",
  marginTop: "1rem",
};