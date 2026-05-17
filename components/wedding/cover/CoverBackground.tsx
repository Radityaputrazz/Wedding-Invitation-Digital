import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CoverBackgroundProps {
  children: ReactNode;
}

export default function CoverBackground({ children }: CoverBackgroundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 w-full h-screen z-9999 flex items-center justify-center bg-[#0d0503] overflow-hidden"
    >
      {/* Background Ken Burns */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1.05, 1.08, 1.05], x: [0, 6, 0], y: [0, -3, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/sweet.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center 36%",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Ornamen sudut */}
      <div className="absolute top-6 left-6 w-14 h-14 border-t border-l border-[#B8964A]/30" />
      <div className="absolute top-6 right-6 w-14 h-14 border-t border-r border-[#B8964A]/30" />
      <div className="absolute bottom-6 left-6 w-14 h-14 border-b border-l border-[#B8964A]/30" />
      <div className="absolute bottom-6 right-6 w-14 h-14 border-b border-r border-[#B8964A]/30" />

      {/* Garis vertikal */}
      <div className="absolute top-[15%] bottom-[15%] left-10 w-px bg-linear-to-b from-transparent via-[#B8964A]/15 to-transparent hidden md:block" />
      <div className="absolute top-[15%] bottom-[15%] right-10 w-px bg-linear-to-b from-transparent via-[#B8964A]/15 to-transparent hidden md:block" />

      {children}
    </motion.div>
  );
}