import ProfileCard from "./ProfileCard";
import { ProfileCardProps } from "./types";

interface ProfilMobileProps {
  priaProps: Omit<ProfileCardProps, "isMobile">;
  wanitaProps: Omit<ProfileCardProps, "isMobile">;
}

export default function ProfilMobile({ priaProps, wanitaProps }: ProfilMobileProps) {
  return (
    <div className="flex md:hidden flex-col items-center justify-center gap-24">
      <div className="flex flex-col items-center">
        <span className="text-[12px] font-bold text-[#B8964A] tracking-[0.5em] uppercase opacity-50 mb-2">
          The Groom
        </span>
        <ProfileCard {...priaProps} isMobile={true} />
      </div>

      <div className="text-[#B8964A] text-5xl italic -my-12 z-10 opacity-20">&</div>

      <div className="flex flex-col items-center">
        <span className="text-[12px] font-bold text-[#B8964A] tracking-[0.5em] uppercase opacity-50 mb-2">
          The Bride
        </span>
        <ProfileCard {...wanitaProps} isMobile={true} />
      </div>
    </div>
  );
}