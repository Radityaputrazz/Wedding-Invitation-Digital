import {
  labelStyle, ornRowStyle, ornLineStyle,
  ornDiamondStyle, titleStyle, subtitleStyle,
} from "./styles";

export default function KadoHeader() {
  return (
    <div className="animate" style={{ textAlign: "center", marginBottom: "clamp(3rem, 10vw, 5rem)" }}>
      <p style={labelStyle}>Wedding Gift</p>
      <div style={ornRowStyle}>
        <div style={ornLineStyle} />
        <span style={ornDiamondStyle}>◆</span>
        <div style={ornLineStyle} />
      </div>
      <h2 style={titleStyle}>Tanda Kasih</h2>
      <p style={subtitleStyle}>
        Doa tulus Anda adalah hadiah terindah bagi kami.
        <br />
        Namun jika ingin mengirimkan tanda kasih, dapat melalui:
      </p>
    </div>
  );
}