"use client";

import React, { useState } from "react";

export default function LinkGenerator() {
  const [name, setName] = useState("");
  const baseUrl = "https://wedding-invitation-radityaputra.vercel.app";

  // Fungsi untuk memformat nama agar aman di URL (spasi jadi +)
  const formatName = (str: string) => {
    return str.trim().replace(/\s+/g, "+");
  };

  const finalLink = `${baseUrl}/?to=${formatName(name)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalLink);
    alert("Link berhasil disalin!");
  };

  const shareToWhatsApp = () => {
    const text = `Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i *${name}* untuk hadir di acara pernikahan kami.\n\nDetail undangan dapat dilihat di link berikut:\n${finalLink}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Undangan Generator</h1>
        <p className="text-sm text-slate-500 mb-6">Ketik nama tamu untuk membuat link otomatis.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Tamu</label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
            />
          </div>

          {name && (
            <div className="p-4 bg-slate-100 rounded-lg break-all">
              <p className="text-xs font-mono text-slate-600">{finalLink}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={copyToClipboard}
              disabled={!name}
              className="bg-slate-200 text-slate-700 p-3 rounded-lg font-semibold hover:bg-slate-300 disabled:opacity-50"
            >
              Salin Link
            </button>
            <button
              onClick={shareToWhatsApp}
              disabled={!name}
              className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Kirim ke WA
            </button>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          Wedding Project - Radit & Keiani
        </footer>
      </div>
    </div>
  );
}