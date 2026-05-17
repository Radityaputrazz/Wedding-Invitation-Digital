import { weddingConfig } from "@/lib/weddingData";

interface HeroSaveButtonsProps {
  onDownloadICal: () => void;
}

export default function HeroSaveButtons({ onDownloadICal }: HeroSaveButtonsProps) {
  return (
    <div className="hero-item mt-12 flex flex-wrap justify-center gap-4">
      <SaveButton
        label="Google Calendar"
        onClick={() => window.open(weddingConfig.googleCalendarUrl, "_blank")}
      />
      <SaveButton label="iCal / Outlook" onClick={onDownloadICal} />
    </div>
  );
}

function SaveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative px-6 py-3 border border-[#B8964A]/30 bg-[#0d0503]/40 backdrop-blur-md transition-all hover:border-[#B8964A]/80 overflow-hidden"
    >
      <span className="relative z-10 text-[9px] tracking-[0.3em] uppercase text-[#FAF0E0]/80 group-hover:text-[#FAF0E0]">
        {label}
      </span>
      <div className="absolute inset-0 z-0 bg-[#B8964A]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
    </button>
  );
}