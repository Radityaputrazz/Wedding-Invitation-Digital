export interface PersonData {
  namaLengkap: string;
  namaAyah: string;
  namaIbu: string;
  instagram: string;
}

export interface ProfileCardProps {
  gallery: string[];
  index: number;
  data: PersonData;
  side: "left" | "right";
  labelParent: string;
  isMobile: boolean;
}