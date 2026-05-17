import type { GalleryItem } from "./galeri";
import type { EventData } from "./acara";

export interface Person {
  nama: string;
  namaPanggilan: string;
  ayah: string;
  ibu: string;
  instagram?: string;
}

export interface WeddingConfig {
  musicUrl: string;

  pria: Person;
  wanita: Person;

  akad: EventData;
  resepsi: EventData;

  galeri: GalleryItem[];
}