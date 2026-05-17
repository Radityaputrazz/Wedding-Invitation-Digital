import Image from "next/image";
import Link from "next/link";
import { ProfileCardProps } from "./types";
import InstagramIcon from "./InstagramIcon";

export default function ProfileCard({
  gallery,
  index,
  data,
  side,
  labelParent,
  isMobile,
}: ProfileCardProps) {
  return (
    <div className={`profil-card relative flex flex-col items-center ${isMobile ? "w-45" : "w-65 lg:w-70"}`}>
      {/* Foto dengan border */}
      <div className="relative w-full aspect-3/4 z-10 shadow-2xl p-1.5 border-2 md:border-4 border-[#B8964A]/80 rounded-2xl bg-[#0d0503]">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1a0c0a]">
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === i ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={img}
                alt={data.namaLengkap}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-all duration-1500 ease-in-out ${
                  index === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Kotak biodata */}
      <div
        className={`relative w-[115%] p-4 md:p-6 border-2 md:border-4 border-[#B8964A] bg-[#0d0503]/95 backdrop-blur-md rounded-xl text-center shadow-2xl -mt-10 md:-mt-14 z-20 transition-transform duration-500 ${
          side === "left"
            ? isMobile
              ? "-translate-x-6"
              : "md:-translate-x-12 lg:-translate-x-16"
            : isMobile
            ? "translate-x-6"
            : "md:translate-x-12 lg:translate-x-16"
        }`}
      >
        <h3 className={`${isMobile ? "text-sm" : "text-lg lg:text-xl"} text-[#FAF0E0] mb-2 font-bold tracking-tight whitespace-nowrap`}>
          {data.namaLengkap}
        </h3>

        <div className="w-8 h-px bg-[#B8964A] mb-3 mx-auto opacity-50" />

        <div className="flex flex-col items-center scale-90 opacity-80 italic mb-4">
          <p className="text-[8px] lg:text-[10px] uppercase tracking-widest text-[#B8964A] mb-1">
            {labelParent}
          </p>
          <p className="text-xs lg:text-sm">
            {data.namaAyah} & {data.namaIbu}
          </p>
        </div>

        {/* Instagram */}
        <div className="pt-2 border-t border-[#B8964A]/20">
          <Link
            href={`https://instagram.com/${data.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B8964A]/30 hover:border-[#B8964A] hover:bg-[#B8964A]/10 transition-all duration-300"
          >
            <InstagramIcon />
            <span className="text-[10px] lg:text-xs text-[#B8964A] tracking-widest font-medium">
              @{data.instagram}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}