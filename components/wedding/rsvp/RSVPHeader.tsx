import { styles } from "./styles";

export default function RSVPHeader() {
  return (
    <div className="animate fade-up" style={styles.header}>
      <p style={styles.sectionLabel}>Join Our Celebration</p>
      <h2 style={styles.sectionTitle}>Konfirmasi Kehadiran</h2>

      <div style={styles.ornamentWrapper}>
        <div style={styles.ornamentLine} />
        <span style={{ color: "#B8964A" }}>✦</span>
        <div style={styles.ornamentLine} />
      </div>

      <p style={styles.subtitle}>
        Merupakan suatu kehormatan bagi kami jika Anda dapat hadir.
        <br />
        Mohon konfirmasi sebelum{" "}
        <strong style={{ color: "#E5C780" }}>14 Juni 2028</strong>
      </p>
    </div>
  );
}