"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { weddingConfig } from "@/lib/weddingData";

interface Ucapan {
  nama: string;
  pesan: string;
  waktu: string;
}

export default function Ucapan() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [ucapanList, setUcapanList] = useState<Ucapan[]>([]);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const getInitial = (name: string) => name.charAt(0).toUpperCase() || "?";

  const formatTanggal = (val: any) => {
    if (!val) return "";
    if (!isNaN(val) && typeof val !== "string") {
      const date = new Date((val - 25569) * 86400 * 1000);
      return date.toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
    }
    return val;
  };

  useEffect(() => {
    async function fetchUcapan() {
      try {
        const res = await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const cleanedData = data.map((item: any) => ({
            ...item,
            waktu: formatTanggal(item.waktu)
          }));
          setUcapanList(cleanedData.reverse());
        }
      } catch {
        setError("Gagal memuat pesan.");
      } finally {
        setFetching(false);
      }
    }
    fetchUcapan();
  }, []);

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

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!nama.trim() || !pesan.trim()) {
    setError("Mohon isi nama dan pesan doa Anda.");
    return;
  }

  setLoading(true);
  const waktuSekarang = new Date().toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  // Payload disesuaikan dengan standar kolom Google Sheets (case-sensitive)
  const payload = {
    nama: nama.trim(),
    pesan: pesan.trim(),
    waktu: waktuSekarang
  };

  try {
    const res = await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload), // Langsung kirim objek tanpa pembungkus 'data'
    });

    if (res.ok) {
      setUcapanList((prev) => [payload as Ucapan, ...prev]);
      setNama("");
      setPesan("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      throw new Error("Gagal menyimpan");
    }
  } catch {
    setError("Gagal mengirim pesan. Silakan coba lagi.");
  } finally {
    setLoading(false);
  }
}

  return (
    <section id="ucapan" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        
        <div className="animate" style={styles.header}>
          <p style={styles.sectionLabel}>Guest Book</p>
          <h2 style={styles.sectionTitle}>Doa & Harapan</h2>
          <div style={styles.ornamentWrapper}>
            <div style={styles.ornamentLine} />
            <span style={{ color: "#B8964A", fontSize: "1.2rem" }}>✦</span>
            <div style={styles.ornamentLine} />
          </div>
        </div>

        <div style={styles.grid}>
          {/* Kolom Kiri - Form */}
          <div className="animate">
            <div style={styles.glassCard}>
              <h3 style={styles.subTitle}>Kirim Doa Restu</h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nama Anda</label>
                  <input
                    placeholder="Nama Lengkap"
                    value={nama}
                    onFocus={() => setFocused("nama")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => { setNama(e.target.value); setError(""); }}
                    style={{
                      ...styles.input,
                      borderColor: focused === "nama" ? "#B8964A" : "rgba(255, 255, 255, 0.1)",
                      boxShadow: focused === "nama" ? "0 0 15px rgba(184, 150, 74, 0.1)" : "none"
                    }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pesan Doa</label>
                  <textarea
                    placeholder="Tuliskan doa restu Anda..."
                    value={pesan}
                    onFocus={() => setFocused("pesan")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => { setPesan(e.target.value); setError(""); }}
                    rows={5}
                    style={{
                      ...styles.textarea,
                      borderColor: focused === "pesan" ? "#B8964A" : "rgba(255, 255, 255, 0.1)",
                      boxShadow: focused === "pesan" ? "0 0 15px rgba(184, 150, 74, 0.1)" : "none"
                    }}
                  />
                </div>
                {error && <p style={styles.errorText}>{error}</p>}
                {submitted && <p style={styles.successText}>✓ Pesan Anda telah kami terima.</p>}
                <button type="submit" disabled={loading} style={styles.submitBtn} className="btn-gold-action">
                  {loading ? "MENGIRIM..." : "KIRIM UCAPAN ✦"}
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Kanan - List */}
          <div className="animate">
            <div style={styles.listHeader}>
              <h3 style={styles.subTitle}>Daftar Ucapan</h3>
              <span style={styles.countBadge}>{ucapanList.length} Pesan</span>
            </div>
            <div ref={listRef} style={styles.listContainer} className="custom-scroll">
              {fetching ? (
                <div style={styles.statusContainer}>
                  <div className="spinner"></div>
                  <p style={styles.statusText}>Memuat pesan...</p>
                </div>
              ) : ucapanList.length === 0 ? (
                <p style={styles.statusText}>Belum ada ucapan. Jadilah yang pertama!</p>
              ) : (
                ucapanList.map((item, i) => (
                  <div key={i} style={styles.ucapanCard} className="card-hover">
                    <div style={styles.cardLayout}>
                      <div style={styles.avatar}>{getInitial(item.nama)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={styles.cardHeader}>
                          <p style={styles.cardName}>{item.nama}</p>
                          <span style={styles.cardWaktu}>{item.waktu}</span>
                        </div>
                        <p style={styles.cardPesan}>"{item.pesan}"</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate { opacity: 0; transform: translateY(40px); transition: 1.2s cubic-bezier(0.2, 1, 0.3, 1); }
        .animate.visible { opacity: 1; transform: translateY(0); }
        
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(184, 150, 74, 0.3); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #B8964A; }
        
        .btn-gold-action {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .btn-gold-action:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          filter: brightness(1.2);
        }
        .btn-gold-action:active { transform: translateY(-1px); }

        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { 
          background: rgba(255,255,255,0.05) !important; 
          transform: translateX(8px);
          border-left: 3px solid #B8964A !important;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 2px solid rgba(184, 150, 74, 0.1);
          border-top: 2px solid #B8964A;
          border-radius: 50%;
          margin: 0 auto 1rem;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    background: "#0d0503",
    padding: "clamp(4rem, 10vw, 8rem) 1.5rem",
    position: "relative",
  } as CSSProperties,

  container: { 
    maxWidth: "1100px", 
    margin: "0 auto" 
  } as CSSProperties,

  header: { 
    textAlign: "center" as const, 
    marginBottom: "5rem" 
  } as CSSProperties,

  sectionLabel: { 
    fontSize: "0.7rem", 
    letterSpacing: "0.5em", 
    textTransform: "uppercase" as const, 
    color: "#B8964A", 
    marginBottom: "1rem", 
    opacity: 0.8
  } as CSSProperties,

  sectionTitle: { 
    fontFamily: "var(--font-serif)", 
    fontSize: "clamp(2.5rem, 6vw, 3.5rem)", 
    color: "#FAF0E0", 
    fontWeight: 300,
  } as CSSProperties,

  ornamentWrapper: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: "20px", 
    marginTop: "1.5rem" 
  } as CSSProperties,

  ornamentLine: { 
    width: "60px", 
    height: "1px", 
    background: "linear-gradient(90deg, transparent, #B8964A, transparent)" 
  } as CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "4rem",
    alignItems: "start" as const,
  } as CSSProperties,

  glassCard: {
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(184, 150, 74, 0.15)",
    borderRadius: "32px",
    padding: "3rem",
  } as CSSProperties,

  subTitle: { 
    color: "#FAF0E0", 
    fontSize: "1.5rem", 
    fontFamily: "var(--font-serif)", 
    fontWeight: 400, 
    marginBottom: "2rem" 
  } as CSSProperties,

  form: { 
    display: "flex", 
    flexDirection: "column" as const, 
    gap: "1.8rem" 
  } as CSSProperties,

  formGroup: { 
    display: "flex", 
    flexDirection: "column" as const, 
    gap: "0.8rem" 
  } as CSSProperties,

  label: { 
    fontSize: "0.65rem", 
    color: "#E5C780", 
    textTransform: "uppercase" as const, 
    letterSpacing: "0.1em", 
    fontWeight: 700 
  } as CSSProperties,

  input: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "1.2rem",
    color: "#FAF0E0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.3s ease",
  } as CSSProperties,

  textarea: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "1.2rem",
    color: "#FAF0E0",
    fontSize: "0.95rem",
    outline: "none",
    resize: "none" as const,
    transition: "all 0.3s ease",
  } as CSSProperties,

  submitBtn: {
    padding: "1.3rem",
    background: "linear-gradient(135deg, #B8964A 0%, #967A3B 100%)",
    color: "#0d0503",
    border: "none",
    borderRadius: "16px",
    fontWeight: 900,
    cursor: "pointer" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    marginTop: "0.5rem",
  } as CSSProperties,

  listHeader: { 
    display: "flex", 
    justifyContent: "space-between" as const, 
    alignItems: "center" as const, 
    marginBottom: "2.5rem", 
    borderBottom: "1px solid rgba(184, 150, 74, 0.1)", 
    paddingBottom: "1.2rem" 
  } as CSSProperties,

  countBadge: { 
    background: "rgba(184, 150, 74, 0.1)", 
    color: "#B8964A", 
    padding: "0.6rem 1.4rem", 
    borderRadius: "50px", 
    fontSize: "0.75rem", 
    fontWeight: 600 
  } as CSSProperties,

  listContainer: {
    maxHeight: "600px",
    overflowY: "auto" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.2rem",
    paddingRight: "10px",
  } as CSSProperties,

  ucapanCard: {
    background: "rgba(255, 255, 255, 0.015)",
    padding: "1.8rem",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.05)",
  } as CSSProperties,

  cardLayout: { 
    display: "flex", 
    gap: "1.2rem", 
    alignItems: "flex-start" as const 
  },
  
  avatar: {
    width: "45px",
    height: "45px",
    background: "rgba(184, 150, 74, 0.15)",
    color: "#B8964A",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    fontWeight: 800,
    fontSize: "1.1rem",
    flexShrink: 0,
    border: "1px solid rgba(184, 150, 74, 0.2)",
  } as CSSProperties,

  cardHeader: { 
    display: "flex", 
    justifyContent: "space-between" as const, 
    alignItems: "center" as const, 
    marginBottom: "0.6rem" 
  } as CSSProperties,

  cardName: { 
    color: "#FAF0E0", 
    fontWeight: 700, 
    fontSize: "1rem" 
  } as CSSProperties,

  cardPesan: { 
    color: "rgba(250, 240, 224, 0.65)", 
    lineHeight: 1.8, 
    fontSize: "0.95rem", 
    fontStyle: "italic" 
  } as CSSProperties,

  cardWaktu: { 
    color: "rgba(250, 240, 224, 0.25)", 
    fontSize: "0.65rem", 
    fontWeight: 500 
  } as CSSProperties,

  errorText: { 
    color: "#ff8a8a", 
    fontSize: "0.8rem", 
    textAlign: "center" as const 
  } as CSSProperties,

  successText: { 
    color: "#B8964A", 
    fontSize: "0.8rem", 
    textAlign: "center" as const, 
    fontWeight: 600 
  } as CSSProperties,

  statusContainer: { 
    textAlign: "center" as const, 
    padding: "4rem 0" 
  } as CSSProperties,

  statusText: { 
    color: "rgba(250, 240, 224, 0.3)", 
    fontSize: "0.9rem" 
  } as CSSProperties,
};