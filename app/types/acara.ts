export interface EventData {
  tanggal: string;
  waktu: string;
  namaGedung: string;
  alamat: string;
  mapsUrl: string;
}

export interface EventCardProps {
  type: string;
  icon: string;
  data: EventData;
}