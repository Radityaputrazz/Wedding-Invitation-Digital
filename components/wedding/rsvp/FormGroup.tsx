import { ReactNode } from "react";
import { styles } from "./styles";

interface FormGroupProps {
  label: string;
  children: ReactNode;
}

export default function FormGroup({ label, children }: FormGroupProps) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}