import { weddingConfig } from "@/lib/weddingData";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="hero-bg absolute inset-0 z-0">
      <div
        className="hero-bg-inner absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url('${weddingConfig.fotoCover}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Gradient overlay statis */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0503]/50 via-transparent to-[#0d0503]/90" />
      {/* Overlay dinamis (fade saat scroll) */}
      <div className="hero-dynamic-overlay absolute inset-0 bg-[#0d0503]/80 opacity-0 pointer-events-none" />
    </div>
  );
}