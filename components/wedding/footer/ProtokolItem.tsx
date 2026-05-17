import { ReactNode } from "react";
import { styles } from "./styles";

interface ProtokolItemProps {
  icon: string;
  title: string;
  desc: ReactNode;
  hasDivider?: boolean;
}

export default function ProtokolItem({ icon, title, desc, hasDivider }: ProtokolItemProps) {
  return (
    <div style={{
      ...styles.protokolItem,
      position: "relative",
    }}>
      {/* Garis pemisah vertikal di kanan item */}
      {hasDivider && (
        <div style={{
          position: "absolute",
          top: "20%",
          right: 0,
          width: "1px",
          height: "60%",
          background: "linear-gradient(180deg, transparent, rgba(184,150,74,0.3), transparent)",
        }} />
      )}

      <span style={styles.protokolIcon}>{icon}</span>
      <p style={styles.protokolTitle}>{title}</p>
      <div style={styles.protokolDesc}>{desc}</div>
    </div>
  );
}