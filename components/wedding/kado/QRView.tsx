import { QRCodeSVG } from "qrcode.react";
import { qrFrameStyle, qrInnerStyle, qrCornerStyle, qrLabelStyle } from "./styles";

interface QRViewProps {
  value: string;
}

const corners: React.CSSProperties[] = [
  { top: 6, left: 6, borderWidth: "1px 0 0 1px" },
  { top: 6, right: 6, borderWidth: "1px 1px 0 0" },
  { bottom: 6, left: 6, borderWidth: "0 0 1px 1px" },
  { bottom: 6, right: 6, borderWidth: "0 1px 1px 0" },
];

export default function QRView({ value }: QRViewProps) {
  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <div style={qrFrameStyle}>
        <div style={qrInnerStyle}>
          <QRCodeSVG value={value} size={140} fgColor="#1a0a05" bgColor="#FAF6F0" level="H" />
        </div>
        {corners.map((corner, i) => (
          <div key={i} style={{ ...qrCornerStyle, ...corner }} />
        ))}
      </div>
      <p style={qrLabelStyle}>Scan QRIS untuk Transfer</p>
    </div>
  );
}