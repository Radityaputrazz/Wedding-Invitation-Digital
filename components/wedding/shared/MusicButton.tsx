"use client";

interface MusicButtonProps {
  musicPlaying: boolean;
  toggleMusic: () => void;
}

export default function MusicButton({
  musicPlaying,
  toggleMusic,
}: MusicButtonProps) {
  return (
    <>
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-500 ${
          musicPlaying
            ? "border-[#B8964A] text-[#B8964A]"
            : "border-[#FAF0E0]/20 text-[#FAF0E0]/40"
        }`}
      >
        <span
          className={
            musicPlaying
              ? "animate-spin-slow"
              : ""
          }
        >
          {musicPlaying ? "♪" : "✕"}
        </span>

        <span className="text-[9px] uppercase tracking-widest">
          {musicPlaying
            ? "Playing"
            : "Muted"}
        </span>
      </button>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
}