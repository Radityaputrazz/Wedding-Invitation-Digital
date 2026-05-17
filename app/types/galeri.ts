// app/types/galeri.ts

export interface GalleryItem {
  src: string;
  caption: string;
  emoji?: string;
}

export interface GaleriGridProps {
  images: GalleryItem[];
  onOpen: (index: number) => void;
}

export interface LightboxProps {
  index: number;
  images: GalleryItem[];
  onClose: () => void;
}