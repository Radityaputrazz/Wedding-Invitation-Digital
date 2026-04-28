// components/wedding/Profil.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/weddingData";

// Konfigurasi Foto (Silakan tambah/kurang sesuai keinginan)
const GALLERY_PRIA = [
  '/images/radit.jpeg',
  '/images/radit-2.jpeg',
  '/images/radit-3.jpeg',
];

const GALLERY_WANITA = [
  '/images/keiani.jpg',
  '/images/keiani-2.jpg',
  '/images/keiani-3.jpg',
];

export default function Profil() {
  const sectionRef = useRef<HTMLElement>(null);
  const [indexPria, setIndexPria] = useState(0);
  const [indexWanita, setIndexWanita] = useState(0);

  // Efek Auto-Slide (Ganti gambar setiap 4 detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndexPria((prev) => (prev + 1) % GALLERY_PRIA.length);
      setIndexWanita((prev) => (prev + 1) % GALLERY_WANITA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer untuk animasi scroll
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
          <div className="animate profile-card-container" style={styles.profileCard}>
            <div style={styles.photoWrapper}>
              {GALLERY_PRIA.map((img, i) => (
                <div 
                  key={i}
                  style={{
                    ...styles.photoFrame,
                    backgroundImage: `url('${img}')`,
                    opacity: indexPria === i ? 1 : 0,
                    zIndex: indexPria === i ? 2 : 1,
                  }} 
                />
              ))}
              <div style={styles.goldFloatingBorder} className="floating-border" />
              <div style={styles.verticalTag}>THE GROOM</div>
            </div>
            
            <div style={styles.infoContent}>
              <h2 style={styles.mainName}>{weddingConfig.pria.namaLengkap}</h2>
              <p style={styles.parentLabel}>Putra dari</p>
              <p style={styles.parentNames}>
                Bapak {weddingConfig.pria.namaAyah} <br /> 
                & Ibu {weddingConfig.pria.namaIbu}
              </p>
              
              <a href={`https://instagram.com/rdtyaptraa`} target="_blank" rel="noopener noreferrer" className="ig-button-luxury">
                <InstagramIcon />
                <span>{weddingConfig.pria.instagram}</span>
              </a>
            </div>
          </div>

          {/* Divider "&" */}
          <div className="animate ampersand-divider" style={styles.ampersandWrapper}>
            <div style={styles.verticalLine} />
            <span style={styles.ampersandText}>&</span>
            <div style={styles.verticalLine} />
          </div>

          {/* Mempelai Wanita */}
          <div className="animate profile-card-container" style={styles.profileCard}>
            <div style={styles.photoWrapper}>
              {GALLERY_WANITA.map((img, i) => (
                <div 
                  key={i}
                  style={{
                    ...styles.photoFrame,
                    backgroundImage: `url('${img}')`,
                    opacity: indexWanita === i ? 1 : 0,
                    zIndex: indexWanita === i ? 2 : 1,
                  }} 
                />
              ))}
              <div style={styles.goldFloatingBorder} className="floating-border-right" />
              <div style={styles.verticalTagRight}>THE BRIDE</div>
            </div>
            
            <div style={styles.infoContent}>
              <h2 style={styles.mainName}>{weddingConfig.wanita.namaLengkap}</h2>
              <p style={styles.parentLabel}>Putri dari</p>
              <p style={styles.parentNames}>
                Bapak {weddingConfig.wanita.namaAyah} <br /> 
                & Ibu {weddingConfig.wanita.namaIbu}
              </p>

              <a href={`https://instagram.com/keiani`} target="_blank" rel="noopener noreferrer" className="ig-button-luxury">
                <InstagramIcon />
                <span>{weddingConfig.wanita.instagram}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .floating-border { animation: floatBorder 6s infinite ease-in-out; }
        .floating-border-right { animation: floatBorder 6s infinite ease-in-out reverse; }
        @keyframes floatBorder {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }
        .ig-button-luxury {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          border: 1px solid rgba(184, 150, 74, 0.3);
          border-radius: 50px;
          color: #B8964A;
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          transition: all 0.4s ease;
          background: rgba(184, 150, 74, 0.02);
          margin-top: 1rem;
        }
        .ig-button-luxury:hover {
          background: #B8964A;
          color: #0d0503;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(184, 150, 74, 0.2);
        }
        @media (max-width: 768px) {
          .ampersand-divider { display: none; }
          .profile-card-container { margin-bottom: 4rem; }
        }
      `}</style>
    </section>
  );
}

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const styles = {
  section: {
    background: "#0d0503",
    padding: "clamp(6rem, 15vw, 10rem) 1.5rem",
    color: "#FAF0E0",
    overflow: "hidden",
  } as React.CSSProperties,

  container: { maxWidth: "1200px", margin: "0 auto" } as React.CSSProperties,

  header: { textAlign: "center", marginBottom: "clamp(4rem, 10vw, 8rem)" } as React.CSSProperties,

  bismillah: { 
    fontSize: "clamp(1.5rem, 5vw, 2.2rem)", 
    color: "#B8964A", 
    marginBottom: "1.5rem", 
    fontFamily: "var(--font-serif)" 
  } as React.CSSProperties,

  introText: { 
    fontSize: "0.95rem", 
    lineHeight: "2", 
    opacity: 0.6, 
    maxWidth: "650px", 
    margin: "0 auto",
  } as React.CSSProperties,

  profileWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "2rem",
  } as React.CSSProperties,

  profileCard: { 
    flex: "1", 
    minWidth: "300px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center" 
  } as React.CSSProperties,

  photoWrapper: { 
    position: "relative", 
    width: "min(280px, 80vw)", 
    height: "min(400px, 110vw)", 
    marginBottom: "3rem" 
  } as React.CSSProperties,

  photoFrame: { 
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%", 
    borderRadius: "24px", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid rgba(255,255,255,0.05)", 
    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
    transition: "opacity 1.5s ease-in-out", // Kehalusan transisi cross-fade
  } as React.CSSProperties,

  goldFloatingBorder: {
    position: "absolute", 
    top: "20px", 
    left: "-20px", 
    width: "100%", 
    height: "100%",
    border: "1px solid #B8964A", 
    borderRadius: "24px", 
    zIndex: 1, 
    opacity: 0.25
  } as React.CSSProperties,

  verticalTag: {
    position: "absolute", left: "-70px", bottom: "80px", transform: "rotate(-90deg)",
    fontSize: "0.6rem", letterSpacing: "0.8em", color: "#B8964A", opacity: 0.4
  } as React.CSSProperties,

  verticalTagRight: {
    position: "absolute", right: "-70px", bottom: "80px", transform: "rotate(90deg)",
    fontSize: "0.6rem", letterSpacing: "0.8em", color: "#B8964A", opacity: 0.4
  } as React.CSSProperties,

  infoContent: { textAlign: "center", width: "100%", padding: "0 1rem" } as React.CSSProperties,

  mainName: {
    fontFamily: "var(--font-serif)", 
    fontSize: "clamp(2rem, 5vw, 2.8rem)", 
    color: "#B8964A", 
    fontWeight: 300, 
    marginBottom: "1rem", 
    letterSpacing: "0.03em"
  } as React.CSSProperties,

  parentLabel: { 
    fontSize: "0.6rem", 
    textTransform: "uppercase", 
    letterSpacing: "0.5em", 
    color: "rgba(184, 150, 74, 0.5)", 
    marginBottom: "0.8rem" 
  } as React.CSSProperties,

  parentNames: { 
    fontSize: "1.05rem", 
    lineHeight: "1.9", 
    fontWeight: 300, 
    marginBottom: "1.5rem",
    opacity: 0.8
  } as React.CSSProperties,

  ampersandWrapper: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "0 2rem", alignSelf: "stretch"
  } as React.CSSProperties,

  verticalLine: { 
    width: "1px", 
    flex: 1, 
    background: "linear-gradient(to bottom, transparent, rgba(184, 150, 74, 0.3), transparent)" 
  } as React.CSSProperties,

  ampersandText: { 
    fontFamily: "var(--font-serif)", 
    fontSize: "4rem", 
    color: "#B8964A", 
    margin: "2rem 0", 
    opacity: 0.2, 
    fontStyle: "italic" 
  } as React.CSSProperties,
};