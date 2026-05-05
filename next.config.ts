// next.config.ts atau next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tambahkan baris ini untuk mengizinkan quality 100
    qualities: [75, 100],
    // Jika Anda menggunakan remote images nanti, tambahkan juga remotePatterns di sini
  },
};

export default nextConfig;