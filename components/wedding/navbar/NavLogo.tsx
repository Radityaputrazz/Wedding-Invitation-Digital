import { weddingConfig } from "@/lib/weddingData";
import { logoStyle } from "./styles";

interface NavLogoProps {
  onScrollTo: (id: string) => void;
}

export default function NavLogo({ onScrollTo }: NavLogoProps) {
  return (
    <div style={logoStyle} onClick={() => onScrollTo("hero")} className="group">
      <span className="font-serif text-2xl text-[#B8964A] transition-transform group-hover:scale-110">
        {weddingConfig.pria.namaPanggilan[0]}
      </span>
      <span className="text-2xl text-[#B8964A]/40 mx-2">❧</span>
      <span className="font-serif text-2xl text-[#B8964A] transition-transform group-hover:scale-110">
        {weddingConfig.wanita.namaPanggilan[0]}
      </span>
    </div>
  );
}