export type StatusKehadiran =
  | "hadir"
  | "tidak"
  | "mungkin";

export interface RSVPFormData {
  nama: string;
  telepon: string;
  jumlah: string;
  status: StatusKehadiran;
}

export interface SuccessMessageProps {
  nama: string;
  status: StatusKehadiran;
}