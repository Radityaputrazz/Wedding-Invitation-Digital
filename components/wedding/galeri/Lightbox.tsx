import { lbBgStyle, lbImageWrapStyle } from "./styles";

interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  index: number;
  images: LightboxImage[];
  onClose: () => void;
  setIndex: (idx: number) => void;
}

export default function Lightbox({ index, images, onClose, setIndex }: LightboxProps) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <div style={lbBgStyle} onClick={onClose}>
      {/* Navigasi prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex(index - 1); }}
          style={navBtnStyle("left")}
          aria-label="Sebelumnya"
        >
          ‹
        </button>
      )}

      <div style={lbImageWrapStyle} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[index].src}
          alt={images[index].caption}
          style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain" }}
        />
      </div>

      {/* Navigasi next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex(index + 1); }}
          style={navBtnStyle("right")}
          aria-label="Berikutnya"
        >
          ›
        </button>
      )}

      <div style={{ color: "#B8964A", marginTop: "1rem", fontSize: "0.8rem", letterSpacing: "0.2em" }}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "fixed",
    top: "50%",
    [side]: "1.5rem",
    transform: "translateY(-50%)",
    background: "rgba(184,150,74,0.15)",
    border: "1px solid rgba(184,150,74,0.3)",
    color: "#B8964A",
    fontSize: "2.5rem",
    lineHeight: 1,
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "4px",
    zIndex: 1000,
  };
}