import GaleriItem from "./GaleriItem";
import { gridStyle } from "./styles";

interface GaleriImage {
  src: string;
  caption: string;
}

interface GaleriGridProps {
  images: GaleriImage[];
  onImageClick: (idx: number) => void;
}

export default function GaleriGrid({ images, onImageClick }: GaleriGridProps) {
  return (
    <>
      <div className="galeri-layout">
        <div className="galeri-grid custom-scroll" style={gridStyle}>
          {images.map((item, idx) => (
            <GaleriItem
              key={idx}
              src={item.src}
              caption={item.caption}
              onClick={() => onImageClick(idx)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .galeri-layout {
          max-width: 700px;
          margin: 0 auto;
        }

        .galeri-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 24px;
          padding-bottom: 50px;
        }

        .grid-item {
          width: 100%;
          position: relative;
        }

        .grid-item:hover img {
          transform: scale(1.02);
        }

        .grid-item:hover .grid-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}