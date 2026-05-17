import { accountNumStyle, copyBtnStyle } from "./styles";

interface AccountViewProps {
  nomor: string;
  copied: boolean;
  onCopy: () => void;
}

export default function AccountView({ nomor, copied, onCopy }: AccountViewProps) {
  return (
    <div style={{ width: "100%", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
      <p style={accountNumStyle}>{nomor}</p>
      <button
        onClick={onCopy}
        className="copy-btn"
        style={{
          ...copyBtnStyle,
          background: copied ? "#B8964A" : "transparent",
          color: copied ? "#0d0503" : "#B8964A",
          borderColor: copied ? "#B8964A" : "rgba(184,150,74,0.4)",
        }}
      >
        {copied ? "✓ Tersalin!" : "📋 Salin Nomor"}
      </button>
    </div>
  );
}