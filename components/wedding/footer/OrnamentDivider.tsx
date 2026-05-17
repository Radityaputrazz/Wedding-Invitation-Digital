import { styles } from "./styles";

export default function OrnamentDivider() {
  return (
    <div style={styles.ornamentDivider}>
      <div style={styles.dividerLineLeft} />
      <span style={styles.dividerDiamond}>◆ ◆ ◆</span>
      <div style={styles.dividerLineRight} />
    </div>
  );
}