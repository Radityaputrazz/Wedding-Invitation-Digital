import { weddingConfig } from "@/lib/weddingData";
import { styles } from "./styles";

export default function FooterNames() {
  return (
    <div className="animate" style={{ textAlign: "center" }}>
      <p style={styles.sectionLabel}>Dengan Penuh Cinta</p>
      <div style={{ marginTop: "2rem" }}>
        <h2 style={styles.nameGradient}>{weddingConfig.pria.namaPanggilan}</h2>
        <div style={styles.nameDivider}>
          <div style={styles.line} />
          <span style={styles.ampersandLarge}>&</span>
          <div style={styles.line} />
        </div>
        <h2 style={styles.nameGradient}>{weddingConfig.wanita.namaPanggilan}</h2>
      </div>
      <p style={styles.dateText}>{weddingConfig.akad.tanggal}</p>
      <p style={styles.locationText}>Jakarta, Indonesia</p>
    </div>
  );
}