interface OrnamentProps {
  className?: string;
}

export default function Ornament({ className = "" }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 w-32 mx-auto ${className}`}>
      <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#B8964A]/60" />
      <span className="text-[#B8964A] text-[8px]">◆</span>
      <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#B8964A]/60" />
    </div>
  );
}