export type StatusKehadiran = "hadir" | "tidak" | "mungkin";

export interface FormData {
  nama: string;
  telepon: string;
  jumlah: string;
  status: StatusKehadiran;
}

export const JUMLAH_OPTIONS = ["1 orang", "2 orang", "3 orang", "4 orang"] as const;

export const STATUS_OPTIONS: { val: StatusKehadiran; icon: string; label: string }[] = [
  { val: "hadir",   icon: "✨", label: "Hadir" },
  { val: "tidak",   icon: "🙏", label: "Absen" },
  { val: "mungkin", icon: "⏳", label: "Ragu"  },
];