import { Metadata } from "next";
import WeddingContainer from "@/components/wedding/WeddingContainer";

type Props = {
  searchParams: { to?: string };
};

// FUNGSI INI YANG MEMBUAT PREVIEW WA JADI DINAMIS
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const name = searchParams.to || "Tamu Undangan";
  
  return {
    title: `Undangan Pernikahan - ${name}`, // Muncul di judul chat WA
    description: `Halo ${name}, kami mengundang Anda untuk hadir di hari bahagia Radit & Keiani.`,
    openGraph: {
      title: `Undangan Pernikahan Radit & Keiani`,
      description: `Khusus Untuk: ${name}`,
      url: "https://wedding-invitation-radityaputra.vercel.app/",
      images: [
        {
          url: "https://wedding-invitation-radityaputra.vercel.app/images/undangan.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Page({ searchParams }: Props) {
  return <WeddingContainer guestName={searchParams.to || "Tamu Undangan"} />;
}