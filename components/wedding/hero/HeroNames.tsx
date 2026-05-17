import { weddingConfig } from "@/lib/weddingData";

export default function HeroNames() {
  return (
    <div className="space-y-0">
      <h1
        className="hero-item font-serif font-light text-[#FAF0E0]/70 leading-none"
        style={{ fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "0.04em" }}
      >
        {weddingConfig.pria.namaPanggilan}
      </h1>

      <div className="hero-item flex items-center justify-center gap-4 w-36 mx-auto py-2">
        <div className="flex-1 h-px bg-[#B8964A]/20" />
        <span className="font-serif italic text-[#B8964A]/70 text-3xl leading-none">&</span>
        <div className="flex-1 h-px bg-[#B8964A]/20" />
      </div>

      <h1
        className="hero-item font-serif font-light text-[#FAF0E0]/70 leading-none"
        style={{ fontSize: "clamp(3rem, 12vw, 6rem)", letterSpacing: "0.04em" }}
      >
        {weddingConfig.wanita.namaPanggilan}
      </h1>
    </div>
  );
}