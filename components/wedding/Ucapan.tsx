// components/wedding/Ucapan.tsx
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
    const ucapanBaru: Ucapan = {
      nama: nama.trim(),
      pesan: pesan.trim(),
      waktu: new Date().toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      }),
    };

    try {
      await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: ucapanBaru }),
      });
      setUcapanList((prev) => [ucapanBaru, ...prev]);
      setNama("");
      setPesan("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Gagal mengirim pesan.");
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
                    onChange={(e) => { setNama(e.target.value); setError(""); }}
                    style={styles.input}
                    className="input-focus"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pesan Doa</label>
                  <textarea
                    placeholder="Tuliskan doa restu Anda..."
                    value={pesan}
                    onChange={(e) => { setPesan(e.target.value); setError(""); }}
                    rows={5}
                    style={styles.textarea}
                    className="input-focus"
                  />
                </div>
                {error && <p style={styles.errorText}>{error}</p>}
                {submitted && <p style={styles.successText}>✓ Pesan terkirim!</p>}
                <button type="submit" disabled={loading} style={styles.submitBtn} className="btn-gold">
                  {loading ? "Mengirim..." : "Kirim Ucapan ✦"}
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
                  <p style={styles.statusText}>Memuat pesan...</p>
                </div>
              ) : ucapanList.length === 0 ? (
                <p style={styles.statusText}>Belum ada ucapan.</p>
              ) : (
                ucapanList.map((item, i) => (
                  <div key={i} style={styles.ucapanCard} className="card-hover">
                    <div style={styles.cardHeader}>
                      <p style={styles.cardName}>{item.nama}</p>
                      <span style={styles.cardWaktu}>{item.waktu}</span>
                    </div>
                    <p style={styles.cardPesan}>"{item.pesan}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate { opacity: 0; transform: translateY(30px); transition: 1.2s cubic-bezier(0.2, 1, 0.3, 1); }
        .animate.visible { opacity: 1; transform: translateY(0); }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #B8964A; border-radius: 10px; }
        .btn-gold:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .card-hover:hover { background: rgba(255,255,255,0.04) !important; transform: translateX(5px); }
      `}</style>
    </section>
  );
}

// DEFINISI STYLES DENGAN TYPE ASSERTION UNTUK MENGHINDARI ERROR TS
const styles = {
  section: {
    background: "#0d0503",
    padding: "clamp(4rem, 10vw, 8rem) 1.5rem",
    position: "relative",
  } as CSSProperties,

  container: { maxWidth: "1100px", margin: "0 auto" } as CSSProperties,

  header: { textAlign: "center" as const, marginBottom: "4rem" } as CSSProperties,

  sectionLabel: { 
    fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase" as const, 
    color: "#B8964A", marginBottom: "0.8rem", textAlign: "center" as const
  } as CSSProperties,

  sectionTitle: { 
    fontFamily: "var(--font-serif)", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", 
    color: "#FAF0E0", fontWeight: 300, textAlign: "center" as const
  } as CSSProperties,

  ornamentWrapper: { display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "1rem 0" } as CSSProperties,

  ornamentLine: { width: "50px", height: "1px", background: "linear-gradient(90deg, transparent, #B8964A, transparent)" } as CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "5rem",
    alignItems: "start" as const,
  } as CSSProperties,

  glassCard: {
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(184, 150, 74, 0.15)",
    borderRadius: "28px",
    padding: "2.5rem",
  } as CSSProperties,

  subTitle: { color: "#FAF0E0", fontSize: "1.4rem", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" } as CSSProperties,

  form: { display: "flex", flexDirection: "column" as const, gap: "1.5rem" } as CSSProperties,

  formGroup: { display: "flex", flexDirection: "column" as const, gap: "0.6rem" } as CSSProperties,

  label: { fontSize: "0.65rem", color: "rgba(184, 150, 74, 0.8)", textTransform: "uppercase" as const, fontWeight: 600 } as CSSProperties,

  input: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "1rem 1.2rem",
    color: "#FAF0E0",
    outline: "none",
  } as CSSProperties,

  textarea: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "1.1rem 1.2rem",
    color: "#FAF0E0",
    outline: "none",
    resize: "none" as const,
  } as CSSProperties,

  submitBtn: {
    padding: "1.2rem",
    background: "linear-gradient(135deg, #B8964A, #967A3B)",
    color: "#0d0503",
    border: "none",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer" as const,
    textTransform: "uppercase" as const,
  } as CSSProperties,

  listHeader: { 
    display: "flex", justifyContent: "space-between" as const, alignItems: "center" as const, 
    marginBottom: "2rem", borderBottom: "1px solid rgba(184, 150, 74, 0.1)", paddingBottom: "1rem" 
  } as CSSProperties,

  countBadge: { background: "rgba(184, 150, 74, 0.1)", color: "#B8964A", padding: "0.5rem 1.2rem", borderRadius: "50px", fontSize: "0.7rem" } as CSSProperties,

  listContainer: {
    maxHeight: "550px",
    overflowY: "auto" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  } as CSSProperties,

  ucapanCard: {
    background: "rgba(255, 255, 255, 0.02)",
    padding: "1.5rem",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
  } as CSSProperties,

  cardHeader: { display: "flex", justifyContent: "space-between" as const, marginBottom: "0.8rem" } as CSSProperties,
  cardName: { color: "#B8964A", fontWeight: 700 } as CSSProperties,
  cardPesan: { color: "rgba(250, 240, 224, 0.75)", lineHeight: 1.7 } as CSSProperties,
  cardWaktu: { color: "rgba(250, 240, 224, 0.3)", fontSize: "0.7rem" } as CSSProperties,

  errorText: { color: "#ff8a8a", fontSize: "0.8rem" } as CSSProperties,
  successText: { color: "#B8964A", fontSize: "0.8rem" } as CSSProperties,
  statusContainer: { textAlign: "center" as const, padding: "3rem 0" } as CSSProperties,
  statusText: { color: "rgba(250, 240, 224, 0.4)" } as CSSProperties,
};