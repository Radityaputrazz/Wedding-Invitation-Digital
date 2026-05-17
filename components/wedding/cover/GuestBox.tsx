interface GuestBoxProps {
  formattedGuest: string;
}

export default function GuestBox({ formattedGuest }: GuestBoxProps) {
  return (
    <div className="py-5 px-8 border border-[#B8964A]/20 bg-[#0d0503]/50 backdrop-blur-md inline-block min-w-50 relative">
      {/* Ornamen sudut dalam */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#B8964A]/40" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#B8964A]/40" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#B8964A]/40" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#B8964A]/40" />

      <p className="text-[11px] tracking-[0.2em] uppercase text-[#B8964A] mb-1.5">
        Kepada Yth.
      </p>
      <h3 className="font-serif text-xl md:text-2xl text-[#FAF0E0] font-light tracking-wide">
        {formattedGuest}
      </h3>
      <p className="text-[11px] tracking-[0.2em] text-[#B8964A] mt-1.5 uppercase">
        & Partner
      </p>
    </div>
  );
}