import { ornRowStyle, ornLineStyle, ornDiamondStyle, noteWrapStyle, noteStyle } from "./styles";

export default function KadoFooter() {
  return (
    <div className="animate" style={noteWrapStyle}>
      <div style={ornRowStyle}>
        <div style={ornLineStyle} />
        <span style={ornDiamondStyle}>◆</span>
        <div style={ornLineStyle} />
      </div>
      <p style={noteStyle}>
        Kehadiran dan doa restu Anda jauh lebih berarti dari hadiah apapun.
        <br />
        Terima kasih atas segala perhatian dan kasih sayang Anda. 🙏
      </p>
    </div>
  );
}