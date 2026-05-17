import { useState } from "react";
import { RekeningItem } from "./types";
import { useCopyNumber } from "./useCopyNumber";
import QRView from "./QRView";
import AccountView from "./AccountView";
import {
  cardStyle, cardTopLineStyle, cardIndexStyle,
  cardHeaderStyle, bankIconStyle, bankNameStyle,
  holderNameStyle, dividerStyle, cardBodyStyle, toggleBtnStyle,
} from "./styles";

interface RekeningCardProps {
  item: RekeningItem;
  index: number;
}

export default function RekeningCard({ item, index }: RekeningCardProps) {
  const [showQR, setShowQR] = useState(false);
  const { copied, copy } = useCopyNumber();

  return (
    <div className="animate kado-card" style={cardStyle}>
      <div style={cardTopLineStyle} />
      <div style={cardIndexStyle}>0{index + 1}</div>

      {/* Bank info */}
      <div style={cardHeaderStyle}>
        <span style={bankIconStyle}>{item.icon}</span>
        <div style={{ textAlign: "left" }}>
          <p style={bankNameStyle}>{item.bank}</p>
          <p style={holderNameStyle}>a.n. {item.atasNama}</p>
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Body: nomor atau QR */}
      <div style={cardBodyStyle}>
        {showQR ? (
          <QRView value={item.qris} />
        ) : (
          <AccountView nomor={item.nomor} copied={copied} onCopy={() => copy(item.nomor)} />
        )}
      </div>

      {/* Toggle */}
      <button onClick={() => setShowQR(!showQR)} className="toggle-btn" style={toggleBtnStyle}>
        {showQR ? "← Lihat Nomor Rekening" : "Lihat QR Code →"}
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        .kado-card { transition: all 0.4s ease; cursor: default; }
        .kado-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(184,150,74,0.4) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .copy-btn:hover { background: #B8964A !important; color: #0d0503 !important; }
        .toggle-btn { transition: all 0.3s ease; }
        .toggle-btn:hover { color: #B8964A !important; opacity: 1 !important; }
      `}</style>
    </div>
  );
}