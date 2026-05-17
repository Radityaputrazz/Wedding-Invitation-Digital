import ProfileCard from "./ProfileCard";
import { ProfileCardProps } from "./types";

interface ProfilDesktopProps {
  priaProps: Omit<ProfileCardProps, "isMobile">;
  wanitaProps: Omit<ProfileCardProps, "isMobile">;
}

export default function ProfilDesktop({ priaProps, wanitaProps }: ProfilDesktopProps) {
  return (
    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center justify-items-center w-full max-w-5xl mx-auto">
      {/* Pria */}
      <div className="flex flex-col items-center md:-translate-x-8 lg:-translate-x-12">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-xl font-bold text-[#B8964A] tracking-[0.6em] uppercase opacity-50">The</span>
          <span className="text-3xl lg:text-4xl font-bold text-[#B8964A] uppercase tracking-[0.2em] mt-1">Groom</span>
        </div>
        <ProfileCard {...priaProps} isMobile={false} />
      </div>

      {/* Ampersand */}
      <div className="text-[#B8964A] md:text-6xl lg:text-7xl italic mt-32 z-10 px-6 select-none opacity-30">
        &
      </div>

      {/* Wanita */}
      <div className="flex flex-col items-center md:translate-x-8 lg:translate-x-12">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-xl font-bold text-[#B8964A] tracking-[0.6em] uppercase opacity-50">The</span>
          <span className="text-3xl lg:text-4xl font-bold text-[#B8964A] uppercase tracking-[0.2em] mt-1">Bride</span>
        </div>
        <ProfileCard {...wanitaProps} isMobile={false} />
      </div>
    </div>
  );
}