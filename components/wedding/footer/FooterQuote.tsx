import { styles } from "./styles";

export default function FooterQuote() {
  return (
    <div className="animate" style={{ textAlign: "center" }}>
      <p style={styles.sectionLabel}>Penutup</p>
      <blockquote style={styles.quote}>
        <span style={styles.quoteMark}>"</span>
        Maka nikmat Tuhan kamu yang manakah yang kamu dustakan?
        <span style={styles.quoteMark}>"</span>
      </blockquote>
      <cite style={styles.cite}>— QS. Ar-Rahman: 13</cite>
    </div>
  );
}