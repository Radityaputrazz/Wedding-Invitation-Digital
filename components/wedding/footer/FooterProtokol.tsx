import { weddingConfig } from "@/lib/weddingData";
import ProtokolItem from "./ProtokolItem";
import { styles } from "./styles";

export default function FooterProtokol() {
  return (
    <div
      className="animate"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        background: "rgba(184, 150, 74, 0.04)",
        borderTop: "1px solid rgba(184, 150, 74, 0.25)",
        borderBottom: "1px solid rgba(184, 150, 74, 0.25)",
        borderLeft: "1px solid rgba(184, 150, 74, 0.1)",
        borderRight: "1px solid rgba(184, 150, 74, 0.1)",
        maxWidth: "860px",
        margin: "0 auto",
      }}
    >
      <ProtokolItem
        icon="👔"
        title="Dress Code"
        desc={weddingConfig.dressCode}
        hasDivider
      />
      <ProtokolItem
        icon="📸"
        title="Tagar Foto"
        desc={
          <>
            Bagikan momen Anda dengan{" "}
            <strong style={styles.hashtagText}>{weddingConfig.hashtag}</strong>
          </>
        }
        hasDivider
      />
      <ProtokolItem
        icon="🅿️"
        title="Parkir"
        desc="Tersedia di Basement B1 & B2. Kapasitas terbatas."
      />
    </div>
  );
}