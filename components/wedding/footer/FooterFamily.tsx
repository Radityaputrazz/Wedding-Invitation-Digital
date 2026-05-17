import { weddingConfig } from "@/lib/weddingData";
import { styles } from "./styles";

export default function FooterFamily() {
  return (
    <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
      <p style={styles.sectionLabel}>Keluarga yang Mengundang</p>
      <div style={styles.familyCard}>
        <p style={styles.familyName}>{weddingConfig.keluargaPria}</p>
        <div style={styles.familyDivider}>
          <div style={styles.line} />
          <span style={styles.ampersandSmall}>&</span>
          <div style={styles.line} />
        </div>
        <p style={styles.familyName}>{weddingConfig.keluargaWanita}</p>
      </div>
    </div>
  );
}