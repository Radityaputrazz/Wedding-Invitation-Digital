export default function HeroScrollIndicator() {
  return (
    <>
      <div className="hero-item mt-8 flex flex-col items-center gap-2">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8964A]/55">Scroll</p>
        <div className="scroll-line w-px h-10 bg-linear-to-b from-[#B8964A]/55 to-transparent" />
      </div>

      <style jsx>{`
        .scroll-line {
          animation: scrollDown 2s ease infinite;
        }
        @keyframes scrollDown {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          40%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          80%  { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          100% { transform: scaleY(0);                           opacity: 0; }
        }
      `}</style>
    </>
  );
}