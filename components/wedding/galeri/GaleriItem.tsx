import {
  gridItemWrapStyle,
  imageContainerStyle,
  imageStyle,
  gridOverlayStyle,
} from "./styles";

interface GaleriItemProps {
  src: string;
  caption: string;
  onClick: () => void;
}

export default function GaleriItem({ src, caption, onClick }: GaleriItemProps) {
  return (
    <div
      className="grid-thumb grid-item"
      style={gridItemWrapStyle}
      onClick={onClick}
    >
      <div style={imageContainerStyle}>
        <img src={src} alt={caption} style={imageStyle} />
        <div className="grid-overlay" style={gridOverlayStyle} />
      </div>
    </div>
  );
}