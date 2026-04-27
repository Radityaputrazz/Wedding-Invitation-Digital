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
    <section id="kado" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        
        {/* Header */}
        <div className="animate" style={styles.header}>
          <p style={styles.sectionLabel}>Wedding Gift</p>
          <h2 style={styles.sectionTitle}>Tanda Kasih</h2>
          <div style={styles.ornamentWrapper}>
            <div style={styles.ornamentLine} />
            <span style={{ color: "var(--gold)" }}>✦</span>
            <div style={styles.ornamentLine} />
          </div>
          <p style={styles.subtitle}>
            Doa tulus Anda adalah hadiah terindah bagi kami.<br />
            Namun jika ingin mengirimkan tanda kasih, dapat melalui:
          </p>
        </div>

        {/* Grid Kartu Rekening */}
        <div style={styles.cardsGrid}>
          {weddingConfig.rekening.map((item, i) => (
            <RekeningCard key={i} item={item} />
          ))}
        </div>

        {/* Closing Note */}
        <p className="animate" style={styles.note}>
          Kehadiran dan doa restu Anda jauh lebih berarti dari hadiah apapun.<br />
          Terima kasih atas segala perhatian dan kasih sayang Anda. 🙏
        </p>
      </div>
    </section>
  );
}

// ─── Sub-komponen Card ──────────────────────────────────────

function RekeningCard({ item }: { item: any }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.nomor.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate card-hover" style={styles.card}>
      {/* Header Kartu */}
      <div style={styles.cardHeader}>
        <span style={styles.bankIcon}>{item.icon}</span>
        <div style={{ textAlign: "left" }}>
          <p style={styles.bankName}>{item.bank}</p>
          <p style={styles.holderName}>a.n. {item.atasNama}</p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Konten Utama (Switchable) */}
      <div style={styles.cardBody}>
        {showQR ? (
          <div style={styles.qrContainer}>
            <div style={styles.qrWrapper}>
              <QRCodeSVG value={item.qris} size={140} fgColor="#000" bgColor="#fff" level="H" />
            </div>
            <p style={styles.qrText}>Scan QRIS untuk Transfer</p>
          </div>
        ) : (
          <div style={styles.numberContainer}>
            <p style={styles.accountNumber}>{item.nomor}</p>
            <button onClick={handleCopy} style={copied ? styles.copyBtnActive : styles.copyBtn}>
              {copied ? "✓ Tersalin" : "📋 Salin Rekening"}
            </button>
          </div>
        )}
      </div>

      {/* Toggle Bawah */}
      <button onClick={() => setShowQR(!showQR)} style={styles.toggleLink}>
        {showQR ? "Lihat Nomor Rekening" : "Lihat QR Code"}
      </button>

      <style jsx>{`
        .card-hover { transition: all 0.4s ease; }
        .card-hover:hover { 
          transform: translateY(-10px); 
          border-color: var(--gold);
          box-shadow: 0 15px 30px rgba(184, 150, 74, 0.15);
        }
      `}</style>
    </div>
  );
}

// ─── STYLES (Dark Luxury) ───────────────────────────────────

const styles = {
  section: {
    background: "#0d0503", // Senada dengan Hero & RSVP
    padding: "8rem 1.5rem",
  } as React.CSSProperties,

  container: { maxWidth: "900px", margin: "0 auto" } as React.CSSProperties,

  header: { textAlign: "center", marginBottom: "4rem" } as React.CSSProperties,
  sectionLabel: { fontSize: "0.8rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" } as React.CSSProperties,
  sectionTitle: { fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#FAF0E0", fontWeight: 300 } as React.CSSProperties,
  ornamentWrapper: { display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "1.5rem 0" } as React.CSSProperties,
  ornamentLine: { width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" } as React.CSSProperties,
  subtitle: { color: "rgba(250, 240, 224, 0.7)", fontSize: "0.95rem", lineHeight: 1.8 } as React.CSSProperties,

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  } as React.CSSProperties,

  card: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(184, 150, 74, 0.2)",
    borderRadius: "24px",
    padding: "2.5rem",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties,

  cardHeader: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", width: "100%" } as React.CSSProperties,
  bankIcon: { fontSize: "2.2rem" } as React.CSSProperties,
  bankName: { color: "#FAF0E0", fontSize: "1.3rem", fontFamily: "var(--font-serif)", fontWeight: 400 } as React.CSSProperties,
  holderName: { color: "var(--gold-light)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8 } as React.CSSProperties,
  
  divider: { width: "100%", height: "1px", background: "rgba(184, 150, 74, 0.1)", marginBottom: "2rem" } as React.CSSProperties,

  cardBody: { minHeight: "180px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" } as React.CSSProperties,

  numberContainer: { width: "100%" } as React.CSSProperties,
  accountNumber: { color: "var(--gold)", fontSize: "1.8rem", letterSpacing: "0.1em", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" } as React.CSSProperties,
  
  copyBtn: {
    background: "transparent",
    border: "1px solid var(--gold)",
    color: "var(--gold)",
    padding: "0.7rem 1.5rem",
    borderRadius: "30px",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "0.3s",
  } as React.CSSProperties,

  copyBtnActive: {
    background: "var(--gold)",
    border: "1px solid var(--gold)",
    color: "#000",
    padding: "0.7rem 1.5rem",
    borderRadius: "30px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  } as React.CSSProperties,

  qrContainer: { textAlign: "center" } as React.CSSProperties,
  qrWrapper: { background: "#fff", padding: "12px", borderRadius: "12px", display: "inline-block", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" } as React.CSSProperties,
  qrText: { color: "rgba(250, 240, 224, 0.6)", fontSize: "0.8rem", marginTop: "1rem" } as React.CSSProperties,

  toggleLink: {
    marginTop: "2rem",
    background: "none",
    border: "none",
    color: "rgba(250, 240, 224, 0.4)",
    fontSize: "0.8rem",
    textDecoration: "underline",
    cursor: "pointer",
    letterSpacing: "0.05em",
  } as React.CSSProperties,

  note: {
    textAlign: "center",
    color: "rgba(250, 240, 224, 0.5)",
    fontSize: "0.9rem",
    fontStyle: "italic",
    lineHeight: 1.8,
    marginTop: "4rem",
  } as React.CSSProperties,
};