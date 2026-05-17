import { styles } from "./styles";

export default function UcapanHeader() {
  return (
    <div className="animate" style={styles.header}>
      <p style={styles.sectionLabel}>Guest Book</p>
      <h2 style={styles.sectionTitle}>Doa & Harapan</h2>
      <div style={styles.ornamentWrapper}>
        <div style={styles.ornamentLine} />
        <span style={{ color: "#B8964A", fontSize: "1.2rem" }}>✦</span>
        <div style={styles.ornamentLine} />
      </div>
    </div>
  );
}