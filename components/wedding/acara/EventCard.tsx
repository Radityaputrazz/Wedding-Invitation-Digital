interface EventData {
  tanggal: string;
  waktu: string;
  namaGedung: string;
  alamat: string;
  mapsUrl: string;
}

interface EventCardProps {
  type: string;
  data: EventData;
  icon: string;
}

export default function EventCard({ type, data, icon }: EventCardProps) {
  return (
    <div className="event-card relative p-12 bg-white/5 backdrop-blur-sm border border-[#B8964A]/10 rounded-[2.5rem] flex flex-col items-center" style={{ opacity: 0 }}>
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-[#B8964A]/5 rounded-full text-2xl mb-6 border border-[#B8964A]/20">
        {icon}
      </div>

      {/* Judul event */}
      <h3 className="text-2xl mb-8 font-medium tracking-widest uppercase text-[#B8964A]">
        {type}
      </h3>

      {/* Detail info */}
      <div className="space-y-6 text-center w-full" style={{ marginBottom: "2.5rem" }}>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1 font-sans">
            Tanggal
          </p>
          <span className="text-lg tracking-wide">{data.tanggal}</span>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1 font-sans">
            Waktu
          </p>
          <span className="text-lg tracking-wide">{data.waktu}</span>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2 font-sans">
            Lokasi
          </p>
          <strong className="block text-xl mb-2">{data.namaGedung}</strong>
          {/* max-w-62.5 tidak valid di Tailwind — ganti inline style */}
          <p
            className="opacity-60 text-xs leading-relaxed mx-auto italic"
            style={{ maxWidth: "250px" }}
          >
            {data.alamat}
          </p>
        </div>
      </div>

      {/* Tombol Maps — hapus mapsBtnStyle agar tidak konflik dengan class Tailwind */}
      <a
        href={data.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-magnetic group flex items-center justify-center w-full py-4 rounded-xl border border-[#B8964A]/30 text-[#B8964A] text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:bg-[#B8964A] hover:text-[#1a1510]"
      >
        Buka Maps
      </a>
    </div>
  );
}