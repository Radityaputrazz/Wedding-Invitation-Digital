import { motion } from "framer-motion";

export default function CoverOverlay() {
  return (
    <>
      {/* Overlay sinematik */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0503]/60 via-transparent to-[#0d0503]/95" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0d0503]/40 via-transparent to-[#0d0503]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(13,5,3,0.75)_100%)]" />

      {/* Light sweep */}
      <motion.div
        initial={{ x: "-150%" }}
        animate={{ x: "150%" }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 7 }}
        className="absolute top-0 bottom-0 w-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          transform: "skewX(-25deg)",
        }}
      />

      {/* Atmospheric glow */}
      <div className="absolute w-125 h-75 bg-[#B8964A]/8 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </>
  );
}