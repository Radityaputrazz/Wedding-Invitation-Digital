// components/wedding/Ucapan.tsx
"use client";

import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    async function fetchUcapan() {
      try {
        const res = await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`);
        const data = await res.json();
        if (Array.isArray(data)) setUcapanList(data.reverse());
      } catch {
        console.error("Gagal mengambil ucapan");
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
      setTimeout(() => setSubmitted(false), 3000);
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
            <span style={{ color: "var(--gold)" }}>✦</span>
            <div style={styles.ornamentLine} />
          </div>
        </div>

        <div style={styles.grid}>
          {/* Kolom Kiri - Form */}
          <div className="animate">
            <div style={styles.glassCard}>
              <h3 style={styles.subTitle}>Kirim Pesan Doa</h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nama Lengkap</label>
                  <input
                    placeholder="Nama Anda"
                    value={nama}
                    onChange={(e) => { setNama(e.target.value); setError(""); }}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pesan & Doa</label>
                  <textarea
                    placeholder="Tuliskan ucapan terbaik Anda..."
                    value={pesan}
                    onChange={(e) => { setPesan(e.target.value); setError(""); }}
                    rows={4}
                    style={styles.textarea}
                  />
                </div>
                {error && <p style={styles.errorText}>{error}</p>}
                {submitted && <p style={styles.successText}>✓ Pesan terkirim, terima kasih!</p>}
                <button type="submit" disabled={loading} style={styles.submitBtn}>
                  {loading ? "Mengirim..." : "Kirim Ucapan ✦"}
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Kanan - List Ucapan */}
          <div className="animate">
            <div style={styles.listHeader}>
              <h3 style={styles.subTitle}>Ucapan Tamu</h3>
              <span style={styles.countBadge}>{ucapanList.length} Pesan</span>
            </div>
            <div ref={listRef} style={styles.listContainer} className="custom-scroll">
              {fetching ? (
                <p style={styles.statusText}>Memuat ucapan...</p>
              ) : ucapanList.length === 0 ? (
                <p style={styles.statusText}>Belum ada ucapan.</p>
              ) : (
                ucapanList.map((item, i) => (
                  <div key={i} style={styles.ucapanCard}>
                    <p style={styles.cardName}>{item.nama}</p>
                    <p style={styles.cardPesan}>"{item.pesan}"</p>
                    <p style={styles.cardWaktu}>{item.waktu}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 10px; }
      `}</style>
    </section>
  );
}

// ─── STYLES (Dark Premium) ──────────────────────────────────

const styles = {
  section: {
    background: "#1a1510", // Gelap sedikit hangat
    padding: "8rem 1.5rem",
  } as React.CSSProperties,

  container: { maxWidth: "1100px", margin: "0 auto" } as React.CSSProperties,

  header: { textAlign: "center", marginBottom: "4rem" } as React.CSSProperties,
  sectionLabel: { fontSize: "0.8rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" } as React.CSSProperties,
  sectionTitle: { fontFamily: "var(--font-serif)", fontSize: "3rem", color: "#FAF0E0", fontWeight: 300 } as React.CSSProperties,
  ornamentWrapper: { display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "1.5rem 0" } as React.CSSProperties,
  ornamentLine: { width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold), transparent)" } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "4rem",
    alignItems: "start",
  } as React.CSSProperties,

  glassCard: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(184, 150, 74, 0.2)",
    borderRadius: "24px",
    padding: "2.5rem",
  } as React.CSSProperties,

  subTitle: { color: "#FAF0E0", fontSize: "1.5rem", fontFamily: "var(--font-serif)", marginBottom: "1.5rem" } as React.CSSProperties,

  form: { display: "flex", flexDirection: "column", gap: "1.5rem" } as React.CSSProperties,
  formGroup: { display: "flex", flexDirection: "column", gap: "0.5rem" } as React.CSSProperties,
  label: { fontSize: "0.7rem", color: "var(--gold-light)", letterSpacing: "0.1em", textTransform: "uppercase" } as React.CSSProperties,

  input: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem",
    color: "#FAF0E0",
    fontSize: "0.95rem",
    outline: "none",
  } as React.CSSProperties,

  textarea: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem",
    color: "#FAF0E0",
    fontSize: "0.95rem",
    outline: "none",
    resize: "none",
  } as React.CSSProperties,

  submitBtn: {
    padding: "1.2rem",
    background: "var(--gold)",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontSize: "0.85rem",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "0.3s",
  } as React.CSSProperties,

  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" } as React.CSSProperties,
  countBadge: { background: "rgba(184, 150, 74, 0.1)", color: "var(--gold)", padding: "0.4rem 1rem", borderRadius: "30px", fontSize: "0.75rem" } as React.CSSProperties,

  listContainer: {
    maxHeight: "500px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    paddingRight: "10px",
  } as React.CSSProperties,

  ucapanCard: {
    background: "rgba(255, 255, 255, 0.02)",
    borderLeft: "2px solid var(--gold)",
    padding: "1.5rem",
    borderRadius: "0 15px 15px 0",
  } as React.CSSProperties,

  cardName: { color: "var(--gold)", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "0.5rem" } as React.CSSProperties,
  cardPesan: { color: "rgba(250, 240, 224, 0.8)", fontSize: "0.95rem", lineHeight: 1.6, fontStyle: "italic" } as React.CSSProperties,
  cardWaktu: { color: "rgba(250, 240, 224, 0.4)", fontSize: "0.75rem", marginTop: "1rem" } as React.CSSProperties,

  errorText: { color: "#ff6b6b", fontSize: "0.85rem" } as React.CSSProperties,
  successText: { color: "var(--gold)", fontSize: "0.85rem" } as React.CSSProperties,
  statusText: { textAlign: "center", color: "rgba(250, 240, 224, 0.4)", padding: "2rem" } as React.CSSProperties,
};