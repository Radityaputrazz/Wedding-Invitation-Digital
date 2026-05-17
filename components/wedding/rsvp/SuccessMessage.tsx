import { StatusKehadiran } from "./types";
import { styles } from "./styles";

interface SuccessMessageProps {
  nama: string;
  status: StatusKehadiran;
}

export default function SuccessMessage({ nama, status }: SuccessMessageProps) {
  return (
    <div style={styles.success}>
      <div style={styles.successIcon}>✨</div>
      <h3 style={styles.successTitle}>Terima Kasih, {nama}!</h3>
      <p style={styles.successText}>
        {status === "hadir"
          ? "Konfirmasi kehadiran Anda telah tersimpan. Sampai jumpa!"
          : "Terima kasih atas konfirmasinya. Doa Anda sangat berarti bagi kami."}
      </p>
    </div>
  );
}