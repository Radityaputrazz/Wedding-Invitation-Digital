import { weddingConfig } from "@/lib/weddingData";
import { styles } from "./styles";

interface FooterActionsProps {
  onScrollTop: () => void;
}

export default function FooterActions({ onScrollTop }: FooterActionsProps) {
  return (
    <>
      <div className="animate" style={{ textAlign: "center", marginTop: "4rem" }}>
        <button onClick={onScrollTop} style={styles.topBtn} className="top-btn">
          ↑ Kembali ke Atas
        </button>
      </div>
      <p style={styles.creditText}>
        Made with 💕 for {weddingConfig.pria.namaPanggilan} &{" "}
        {weddingConfig.wanita.namaPanggilan}
      </p>
    </>
  );
}