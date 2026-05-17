interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroCountdownProps {
  timeLeft: TimeLeft;
}

export default function HeroCountdown({ timeLeft }: HeroCountdownProps) {
  return (
    <div className="hero-item flex items-center gap-2 md:gap-3">
      <CountdownUnit v={timeLeft.days} l="Hari" />
      <Colon />
      <CountdownUnit v={timeLeft.hours} l="Jam" />
      <Colon />
      <CountdownUnit v={timeLeft.minutes} l="Menit" />
      <Colon />
      <CountdownUnit v={timeLeft.seconds} l="Detik" />
    </div>
  );
}

function CountdownUnit({ v, l }: { v: number; l: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 border border-[#B8964A]/15 bg-[#0d0503]/60 backdrop-blur-md relative">
      <span className="font-serif text-lg text-[#FAF0E0]">
        {String(v).padStart(2, "0")}
      </span>
      <span className="text-[6px] tracking-[0.2em] uppercase text-[#B8964A]/60">{l}</span>
    </div>
  );
}

function Colon() {
  return <span className="font-serif text-xl text-[#B8964A]/30 pb-4">:</span>;
}