interface NavControlsProps {
  musicPlaying: boolean;
  menuOpen: boolean;
  onToggleMusic: () => void;
  onToggleMenu: () => void;
}

export default function NavControls({
  musicPlaying,
  menuOpen,
  onToggleMusic,
  onToggleMenu,
}: NavControlsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Tombol musik */}
      <button
        onClick={onToggleMusic}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
          musicPlaying
            ? "border-[#B8964A] text-[#B8964A]"
            : "border-[#FAF0E0]/20 text-[#FAF0E0]/40"
        }`}
      >
        <span className={musicPlaying ? "animate-spin-slow" : ""}>
          {musicPlaying ? "♪" : "✕"}
        </span>
        <span className="text-[9px] tracking-widest uppercase">
          {musicPlaying ? "Playing" : "Muted"}
        </span>
      </button>

      {/* Hamburger (Mobile) */}
      <button
        onClick={onToggleMenu}
        className="md:hidden flex flex-col gap-1.5 z-110"
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <div className={`w-6 h-px bg-[#B8964A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}