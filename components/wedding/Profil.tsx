// components/wedding/Profil.tsx
"use client";

import { useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";

export default function Profil() {
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
    <section id="profil" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        
        {/* Header Pembuka */}
        <div className="animate" style={styles.header}>
          <p style={styles.bismillah}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p style={styles.introText}>
            Assalamu’alaikum Warahmatullahi Wabarakatuh. <br />
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk mengenal lebih dekat kedua mempelai kami:
          </p>
        </div>

        <div style={styles.profileWrapper}>
          
          {/* Mempelai Pria */}
          <div className="animate" style={styles.profileCard}>
            <div style={styles.photoWrapper}>
              <div style={styles.photoFrame} className="img-pria" />
              <div style={styles.goldFloatingBorder} />
              <div style={styles.verticalTag}>THE GROOM</div>
            </div>
            
            <div style={styles.infoContent}>
              <h2 style={styles.mainName}>{weddingConfig.pria.namaLengkap}</h2>
              <p style={styles.parentLabel}>Putra dari</p>
              <p style={styles.parentNames}>
                Bapak {weddingConfig.pria.namaAyah} <br /> 
                & Ibu {weddingConfig.pria.namaIbu}
              </p>
              
              <a 
                href={`https://instagram.com/rdtyaptraa`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ig-button-luxury"
              >
                <InstagramIcon />
                <span>{weddingConfig.pria.instagram}</span>
              </a>
            </div>
          </div>

          {/* Divider "&" */}
          <div className="animate" style={styles.ampersandWrapper}>
            <div style={styles.verticalLine} />
            <span style={styles.ampersandText}>&</span>
            <div style={styles.verticalLine} />
          </div>

          {/* Mempelai Wanita */}
          <div className="animate" style={styles.profileCard}>
            <div style={styles.photoWrapper}>
              <div style={styles.photoFrame} className="img-wanita" />
              <div style={styles.goldFloatingBorder} />
              <div style={styles.verticalTagRight}>THE BRIDE</div>
            </div>
            
            <div style={styles.infoContent}>
              <h2 style={styles.mainName}>{weddingConfig.wanita.namaLengkap}</h2>
              <p style={styles.parentLabel}>Putri dari</p>
              <p style={styles.parentNames}>
                Bapak {weddingConfig.wanita.namaAyah} <br /> 
                & Ibu {weddingConfig.wanita.namaIbu}
              </p>

              <a 
                href={`https://instagram.com/keiani`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ig-button-luxury"
              >
                <InstagramIcon />
                <span>{weddingConfig.wanita.instagram}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .img-pria { background-image: url('/images/radit.jpeg'); background-size: cover; background-position: center; }
        .img-wanita { background-image: url('/images/keiani.jpg'); background-size: cover; background-position: center; }

        .ig-button-luxury {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 24px;
          border: 1px solid rgba(184, 150, 74, 0.4);
          border-radius: 50px;
          color: var(--gold);
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          background: rgba(184, 150, 74, 0.03);
          margin-top: 10px;
        }

        .ig-button-luxury:hover {
          background: var(--gold);
          color: #000;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(184, 150, 74, 0.2);
          border-color: var(--gold);
        }

        .ig-button-luxury:hover :global(svg) {
          stroke: #000;
        }
      `}</style>
    </section>
  );
}

// Sub-komponen Ikon untuk kebersihan kode
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// ─── STYLES (Night Gala Premium) ──────────────────────────

const styles = {
  section: {
    background: "#0d0503",
    padding: "10rem 1.5rem",
    color: "#FAF0E0",
  } as React.CSSProperties,

  container: { maxWidth: "1100px", margin: "0 auto" } as React.CSSProperties,

  header: { textAlign: "center", marginBottom: "8rem" } as React.CSSProperties,

  bismillah: { fontSize: "1.8rem", color: "var(--gold)", marginBottom: "1.5rem", fontFamily: "serif" } as React.CSSProperties,

  introText: { fontSize: "1rem", lineHeight: "1.8", opacity: 0.7, maxWidth: "600px", margin: "0 auto" } as React.CSSProperties,

  profileWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "1rem",
  } as React.CSSProperties,

  profileCard: { flex: "1", minWidth: "320px", display: "flex", flexDirection: "column", alignItems: "center" } as React.CSSProperties,

  photoWrapper: { position: "relative", width: "260px", height: "380px", marginBottom: "3.5rem" } as React.CSSProperties,

  photoFrame: { 
    width: "100%", height: "100%", borderRadius: "20px", position: "relative", zIndex: 2,
    border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" 
  } as React.CSSProperties,

  goldFloatingBorder: {
    position: "absolute", top: "25px", left: "-20px", width: "100%", height: "100%",
    border: "1px solid var(--gold)", borderRadius: "20px", zIndex: 1, opacity: 0.3
  } as React.CSSProperties,

  verticalTag: {
    position: "absolute", left: "-60px", bottom: "60px", transform: "rotate(-90deg)",
    fontSize: "0.65rem", letterSpacing: "0.8em", color: "var(--gold)", opacity: 0.5
  } as React.CSSProperties,

  verticalTagRight: {
    position: "absolute", right: "-60px", bottom: "60px", transform: "rotate(90deg)",
    fontSize: "0.65rem", letterSpacing: "0.8em", color: "var(--gold)", opacity: 0.5
  } as React.CSSProperties,

  infoContent: { textAlign: "center", width: "100%" } as React.CSSProperties,

  mainName: {
    fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--gold)", 
    fontWeight: 300, marginBottom: "1.2rem", letterSpacing: "0.02em"
  } as React.CSSProperties,

  parentLabel: { fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.4em", opacity: 0.4, marginBottom: "0.8rem" } as React.CSSProperties,

  parentNames: { fontSize: "1.1rem", lineHeight: "1.8", fontWeight: 300, marginBottom: "1.5rem" } as React.CSSProperties,

  ampersandWrapper: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "0 3rem", alignSelf: "stretch"
  } as React.CSSProperties,

  verticalLine: { width: "1px", flex: 1, background: "linear-gradient(to bottom, transparent, var(--gold), transparent)", opacity: 0.2 } as React.CSSProperties,

  ampersandText: { fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--gold)", margin: "1.5rem 0", opacity: 0.3, fontStyle: "italic" } as React.CSSProperties,
};