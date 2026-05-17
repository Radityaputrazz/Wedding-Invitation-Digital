import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>

        <p>Halaman tidak ditemukan</p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-black rounded-xl"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}