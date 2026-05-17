import { infoItemStyle, infoIconBoxStyle, infoLabelStyle, infoValueStyle } from "./styles";

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div style={infoItemStyle}>
      <div style={infoIconBoxStyle}>{icon}</div>
      <div style={{ textAlign: "left" }}>
        <span style={infoLabelStyle}>{label}</span>
        <span style={infoValueStyle}>{value}</span>
      </div>
    </div>
  );
}