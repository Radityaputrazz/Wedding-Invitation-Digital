// lib/weddingData.ts

export const weddingConfig = {
  // ─── MEMPELAI ───────────────────────────────────────────
  pria: {
    namaLengkap: "Raditya Ananda Putra",
    namaPanggilan: "Radit",
    namaAyah: "Agus Budi Dharmawan",
    namaIbu: "Niluh Herlina Arya Ningsih",
    instagram: "rdtyaptraa",
    instagramUrl: "https://instagram.com/rdtyaptraa",
    foto: "/images/radit.jpeg",   // taruh di /public/images/
  },

  wanita: {
    namaLengkap: "Keiani Mabe",
    namaPanggilan: "Keiani",
    namaAyah: "Dustin Mabe",
    namaIbu: "Alexandra Christabel Claire",
    instagram: "keiani",
    instagramUrl: "https://instagram.com/keiani",
    foto: "/images/keiani.jpg",
  },

  // ─── ACARA ──────────────────────────────────────────────
  akad: {
    tanggal: "Sabtu, 28 Juni 2028",
    waktu: "08.00 – 10.00 WIB",
    namaGedung: "Masjid Al-Muhajirin",
    alamat: "Jl. Flamboyan No. 27, Rt 13/06 Pesanggrahan, Jakarta Selatan",
    mapsUrl: "https://maps.app.goo.gl/gBDeWoXcJZkCPgkWA",
  },

  resepsi: {
    tanggal: "Sabtu, 28 Juni 2028",
    waktu: "11.00 – 15.00 WIB",
    namaGedung: "The Grand Ballroom",
    alamat: "Hotel Sahid Jaya Lt. 2, Jl. Jend. Sudirman Kav. 86, Jakarta",
    mapsUrl: "https://maps.google.com/?q=Hotel+Sahid+Jaya+Jakarta",
  },

  // ─── TANGGAL (untuk countdown) ──────────────────────────
  // Format: YYYY-MM-DDTHH:mm:ss (waktu lokal)
  weddingDate: "2028-06-28T08:00:00+07:00", // Waktu Jakarta,

  // ─── KADO DIGITAL ───────────────────────────────────────
  rekening: [
    {
      bank: "Bank BCA",
      atasNama: "Raditya Ananda Putra",
      nomor: "5010 621 056",
      icon: "🏦",
      qris: "5010621056"
    },
    {
      bank: "Bank Mandiri",
      atasNama: "Keiani Mabe",
      nomor: "133 000 123 4567",
      icon: "💚",
      qris: "1330001234567"
    },
  ],

  // ─── RSVP & Ucapan ──────────────────────────────────────────────
  // lib/weddingData.ts — tambahkan field ini
  sheetdbUrl: "https://sheetdb.io/api/v1/saa3bvq41m0vz", // ganti dengan URL Anda

  // ─── PROTOKOL ───────────────────────────────────────────
  dressCode: "Batik atau Formal – Warna Sage Green & Cream",
  hashtag: "#WeddingRaditKeiani",

  // ─── KELUARGA PENGUNDANG ─────────────────────────────────
  keluargaPria: "Keluarga Besar Agus Budi Dharmawan",
  keluargaWanita: "Keluarga Besar Dustin Mabe",

  // ─── Foto Pre-Wedding ──────────────────────────────────────────────
  fotoCover: "/images/cover.png", // taruh di /public/images/

    // ─── GALERI ─────────────────────────────────────────────
  galeri: [
    { src: "/images/prewed.png", caption: "Pre-Wedding", emoji: "🌹" },
    { src: "/images/cover.png", caption: "Foto Berdua",  emoji: "💐" },
    { src: "/images/hug.png", caption: "Momen Manis",  emoji: "🌸" },
    { src: "/images/love.png", caption: "Bersama",      emoji: "🏵️" },
    { src: "/images/sweetie.png", caption: "Kenangan",     emoji: "✨" },
    { src: "/images/loveit.jpg", caption: "Romantis",    emoji: "💖" },
  ],

  // ─── MUSIK ──────────────────────────────────────────────
  // Taruh file mp3 di /public/music/ atau pakai URL eksternal
  musicUrl: "/music/musicWedding.mp3",

  // ─── ADD TO CALENDAR ─────────────────────────────────────
  // Gunakan encodeURIComponent untuk keamanan string di URL
googleCalendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Pernikahan Radit & Keiani")}&dates=20280628T010000Z/20280628T080000Z&details=Akad+Nikah+dan+Resepsi&location=Jakarta`,
};
