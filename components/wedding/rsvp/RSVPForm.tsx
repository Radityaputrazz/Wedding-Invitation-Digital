import { styles } from "./styles";
import { JUMLAH_OPTIONS, STATUS_OPTIONS, FormData } from "./types";
import FormGroup from "./FormGroup";

interface RSVPFormProps {
  form: FormData;
  loading: boolean;
  error: string;
  focusedInput: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFocus: (name: string) => void;
  onBlur: () => void;
}

export default function RSVPForm({
  form,
  loading,
  error,
  focusedInput,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
}: RSVPFormProps) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      {/* Nama */}
      <FormGroup label="Nama Tamu">
        <input
          name="nama"
          placeholder="Masukkan nama lengkap"
          value={form.nama}
          onChange={onChange}
          onFocus={() => onFocus("nama")}
          onBlur={onBlur}
          style={{
            ...styles.input,
            borderColor: focusedInput === "nama" ? "#B8964A" : "rgba(255,255,255,0.1)",
          }}
        />
      </FormGroup>

      {/* Telepon + Jumlah */}
      <div style={styles.twoCol}>
        <FormGroup label="Nomor WhatsApp">
          <input
            name="telepon"
            type="tel"
            placeholder="08xx xxxx xxxx"
            value={form.telepon}
            onChange={onChange}
            onFocus={() => onFocus("telepon")}
            onBlur={onBlur}
            style={{
              ...styles.input,
              borderColor: focusedInput === "telepon" ? "#B8964A" : "rgba(255,255,255,0.1)",
            }}
          />
        </FormGroup>

        <FormGroup label="Jumlah Kehadiran">
          <select name="jumlah" value={form.jumlah} onChange={onChange} style={styles.input}>
            {JUMLAH_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#000" }}>
                {opt}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>

      {/* Status kehadiran */}
      <FormGroup label="Pernyataan Kehadiran">
        <div style={styles.radioGroup}>
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.val}
              style={form.status === opt.val ? styles.radioActive : styles.radioInactive}
            >
              <input
                type="radio"
                name="status"
                value={opt.val}
                checked={form.status === opt.val}
                onChange={onChange}
                style={{ display: "none" }}
              />
              <span>
                {opt.icon} {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FormGroup>

      {error && <p style={styles.error}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rsvp-submit-btn"
        style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
      >
        <div style={styles.btnContent}>
          {loading ? "MENGIRIM..." : "KIRIM KONFIRMASI"}
          {!loading && <span className="btn-icon"> ✦</span>}
        </div>
      </button>
    </form>
  );
}