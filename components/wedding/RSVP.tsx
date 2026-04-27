// components/wedding/RSVP.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/weddingData";

type StatusKehadiran = "hadir" | "tidak" | "mungkin";

interface FormData {
  nama: string;
  telepon: string;
  jumlah: string;
  status: StatusKehadiran;
}

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({
    nama: "",
    telepon: "",
    jumlah: "1 orang",
    status: "hadir",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.telepon.trim()) {
      setError("Mohon lengkapi nama dan nomor telepon Anda.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(weddingConfig.sheetdbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { ...form, waktu: new Date().toLocaleString("id-ID") },
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        
        {/* Header Section */}
        <div className="animate" style={styles.header}>
          <p style={styles.sectionLabel}>Join Our Celebration</p>
          <h2 style={styles.sectionTitle}>Konfirmasi Kehadiran</h2>
          <div style={styles.ornamentWrapper}>
            <div style={styles.ornamentLine} />
            <span style={{ color: "var(--gold)" }}>✦</span>
            <div style={styles.ornamentLine} />
          </div>
          <p style={styles.subtitle}>
            Merupakan suatu kehormatan bagi kami jika Anda dapat hadir.<br />
            Mohon konfirmasi sebelum <strong style={{ color: "var(--gold)" }}>14 Juni 2028</strong>
          </p>
        </div>

        {/* Form Container */}
        <div className="animate" style={styles.glassCard}>
          {submitted ? (
            <SuccessMessage nama={form.nama} status={form.status} />
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              
              <FormGroup label="Nama Tamu">
                <input
                  name="nama"
                  placeholder="Masukkan nama lengkap"
                  value={form.nama}
                  onChange={handleChange}
                  style={styles.input}
                />
              </FormGroup>

              <div style={styles.twoCol}>
                <FormGroup label="Nomor WhatsApp">
                  <input
                    name="telepon"
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    value={form.telepon}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </FormGroup>

                <FormGroup label="Jumlah Kehadiran">
                  <select name="jumlah" value={form.jumlah} onChange={handleChange} style={styles.input}>
                    {["1 orang", "2 orang", "3 orang", "4 orang"].map((opt) => (
                      <option key={opt} value={opt} style={{color: '#000'}}>{opt}</option>
                    ))}
                  </select>
                </FormGroup>
              </div>

              <FormGroup label="Pernyataan Kehadiran">
                <div style={styles.radioGroup}>
                  {[
                    { val: "hadir", icon: "✨", label: "Hadir" },
                    { val: "tidak", icon: "🙏", label: "Absen" },
                    { val: "mungkin", icon: "⏳", label: "Mungkin" },
                  ].map((opt) => (
                    <label key={opt.val} style={form.status === opt.val ? styles.radioActive : styles.radioInactive}>
                      <input
                        type="radio"
                        name="status"
                        value={opt.val}
                        checked={form.status === opt.val}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span>{opt.icon} {opt.label}</span>
                    </label>
                  ))}
                </div>
              </FormGroup>

              {error && <p style={styles.error}>{error}</p>}

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? "Sabar ya..." : "Kirim Konfirmasi ✦"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Sub-komponen ──────────────────────────────────────────

const FormGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={styles.formGroup}>
    <label style={styles.label}>{label}</label>
    {children}
  </div>
);

const SuccessMessage = ({ nama, status }: { nama: string; status: StatusKehadiran }) => (
  <div style={styles.success}>
    <div style={styles.successIcon}>✨</div>
    <h3 style={styles.successTitle}>Terima Kasih, {nama}!</h3>
    <p style={styles.successText}>
      {status === "hadir" ? "Senang sekali! Sampai jumpa di hari bahagia kami." : "Doa Anda sudah cukup berarti bagi kami."}
    </p>
  </div>
);

// ─── STYLES (Clean & Elegant) ──────────────────────────────

const styles = {
  section: {
    background: "#0d0503", // Senada dengan Hero & Galeri
    padding: "8rem 1.5rem",
    position: "relative",
  } as React.CSSProperties,

  container: {
    maxWidth: "800px",
    margin: "0 auto",
  } as React.CSSProperties,

  header: {
    textAlign: "center",
    marginBottom: "4rem",
  } as React.CSSProperties,

  sectionLabel: {
    fontSize: "0.8rem",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  sectionTitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    color: "#FAF0E0",
    fontWeight: 300,
  } as React.CSSProperties,

  ornamentWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    margin: "1.5rem 0",
  } as React.CSSProperties,

  ornamentLine: {
    width: "40px",
    height: "1px",
    background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
  } as React.CSSProperties,

  subtitle: {
    color: "rgba(250, 240, 224, 0.7)",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    marginTop: "1rem",
  } as React.CSSProperties,

  glassCard: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(184, 150, 74, 0.2)",
    borderRadius: "24px",
    padding: "3rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  } as React.CSSProperties,

  form: { display: "flex", flexDirection: "column", gap: "2rem" } as React.CSSProperties,

  formGroup: { display: "flex", flexDirection: "column", gap: "0.8rem" } as React.CSSProperties,

  label: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold-light)",
    fontWeight: "bold",
  } as React.CSSProperties,

  input: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem 1.2rem",
    color: "#FAF0E0",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.3s",
  } as React.CSSProperties,

  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  } as React.CSSProperties,

  radioGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  } as React.CSSProperties,

  radioActive: {
    padding: "1rem",
    background: "var(--gold)",
    color: "#000",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
    transition: "0.3s",
  } as React.CSSProperties,

  radioInactive: {
    padding: "1rem",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FAF0E0",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "0.3s",
    border: "1px solid transparent",
  } as React.CSSProperties,

  submitBtn: {
    marginTop: "1rem",
    padding: "1.2rem",
    background: "linear-gradient(45deg, #B8964A, #E5C780)",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(184, 150, 74, 0.2)",
    transition: "transform 0.2s",
  } as React.CSSProperties,

  error: { color: "#ff6b6b", fontSize: "0.85rem", textAlign: "center" } as React.CSSProperties,

  success: { textAlign: "center", padding: "2rem 0" } as React.CSSProperties,
  successIcon: { fontSize: "4rem", marginBottom: "1rem" } as React.CSSProperties,
  successTitle: { color: "#FAF0E0", fontFamily: "var(--font-serif)", fontSize: "2rem" } as React.CSSProperties,
  successText: { color: "var(--gold-light)", marginTop: "1rem", opacity: 0.8 } as React.CSSProperties,
};