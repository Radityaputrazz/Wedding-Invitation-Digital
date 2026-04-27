# 🌙 Undangan Digital - Premium Night Gala Edition

Undangan pernikahan digital eksklusif dengan tema **Night Gala** yang mewah, sinematik, dan elegan. Proyek ini dibangun menggunakan teknologi web modern untuk memberikan pengalaman pengguna yang mulus dan responsif.

---

## ✨ Fitur Utama

- **Premium Luxury Design**: Tema gelap dengan aksen emas yang dikurasi untuk memberikan kesan Gala Night yang mewah.
- **Responsive Layout**: Optimal untuk perangkat mobile (smartphone) maupun desktop.
- **Profil Mempelai Sinematik**: Perkenalan mempelai pria dan wanita dengan bingkai artistik dan tombol sosial media premium.
- **Buku Tamu Real-time**: Integrasi dengan Google Sheets (via SheetDB) untuk menyimpan ucapan dan doa dari para tamu.
- **Kado Digital**: Informasi rekening dan QR Code yang interaktif dengan fitur *copy-to-clipboard*.
- **RSVP Management**: Sistem konfirmasi kehadiran yang terhubung langsung ke basis data.
- **Smooth Animations**: Menggunakan Intersection Observer API untuk efek *fade-in* saat scroll.

---

## 🚀 Teknologi yang Digunakan

- [**Next.js**](https://nextjs.org/) - React Framework untuk performa dan SEO yang maksimal.
- [**TypeScript**](https://www.typescriptlang.org/) - Untuk kode yang lebih aman dan terstruktur.
- [**SheetDB**](https://sheetdb.io/) - Sebagai jembatan API untuk menyimpan data ke Google Sheets.
- [**CSS Modules / Styled JSX**](https://nextjs.org/docs/basic-features/built-in-css-support) - Untuk styling komponen yang terisolasi dan bersih.
- [**Vercel**](https://vercel.com/) - Platform deployment dan hosting kelas dunia.

---

## 🛠️ Instalasi & Konfigurasi

Jika Anda ingin menjalankan proyek ini secara lokal:

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username/nama-repo.git](https://github.com/username/nama-repo.git)
   cd nama-repo
   nstal dependensi:

2. **Instal Dependensi:**
    ```bash
    npm install
    # atau
    yarn install
3. **Konfigurasi Environment:**
    Sesuaikan data pernikahan dan URL SheetDB di dalam file @/lib/weddingData.ts.

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev

5. **Akses di browser:**
   Buka http://localhost:3000

## 📂 Struktur Folder
    components/wedding/ - Berisi komponen utama (Hero, Profil, Kado, Ucapan, dll).

    lib/ - Berisi konfigurasi data statis dan fungsi utilitas.

    public/images/ - Folder untuk aset gambar (Foto mempelai, galeri, dll).

## 📝 Catatan Penting
    Pastikan Anda telah membuat spreadsheet di Google Sheets dan menghubungkannya ke SheetDB untuk mengaktifkan fitur Buku       Tamu dan RSVP.

## 🤝 Kontribusi
    Proyek ini dibuat untuk keperluan pribadi, namun jika Anda ingin memberikan saran atau perbaikan, silakan buka Issue         atau ajukan Pull Request.

## Dibuat oleh [Raditya Ananda Putra]
