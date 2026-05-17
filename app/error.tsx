"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Terjadi Kesalahan</h1>

        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-white text-black rounded-xl"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}