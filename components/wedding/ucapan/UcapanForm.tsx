import { styles } from "./styles";
import { useUcapanForm } from "./useUcapanForm";
import { Ucapan } from "./types";

interface UcapanFormProps {
  onSuccess: (item: Ucapan) => void;
}

export default function UcapanForm({ onSuccess }: UcapanFormProps) {
  const {
    nama, setNama,
    pesan, setPesan,
    loading, error, setError,
    submitted, focused, setFocused,
    handleSubmit,
  } = useUcapanForm({ onSuccess });

  const focusBorder = (field: string) =>
    focused === field ? "#B8964A" : "rgba(255, 255, 255, 0.1)";
  const focusShadow = (field: string) =>
    focused === field ? "0 0 15px rgba(184, 150, 74, 0.1)" : "none";

  return (
    <div style={styles.glassCard}>
      <h3 style={styles.subTitle}>Kirim Doa Restu</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Nama */}
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
              borderColor: focusBorder("nama"),
              boxShadow: focusShadow("nama"),
            }}
          />
        </div>

        {/* Pesan */}
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
              borderColor: focusBorder("pesan"),
              boxShadow: focusShadow("pesan"),
            }}
          />
        </div>

        {error    && <p style={styles.errorText}>{error}</p>}
        {submitted && <p style={styles.successText}>✓ Pesan Anda telah kami terima.</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          className="btn-gold-action"
        >
          {loading ? "MENGIRIM..." : "KIRIM UCAPAN ✦"}
        </button>
      </form>
    </div>
  );
}