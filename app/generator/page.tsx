"use client";

import React, { useMemo, useState } from "react";

export default function LinkGenerator() {
  const [name, setName] = useState("");

  const baseUrl =
    "https://wedding-invitation-radityaputra.vercel.app";

  const encodedName = useMemo(() => {
    return encodeURIComponent(name.trim());
  }, [name]);

  const finalLink = `${baseUrl}/?to=${encodedName}`;

  const copyToClipboard = async () => {
    if (!name) return;

    try {
      await navigator.clipboard.writeText(finalLink);
      alert("Link berhasil disalin!");
    } catch {
      alert("Gagal menyalin link.");
    }
  };

  const shareToWhatsApp = () => {
    if (!name.trim()) return;

    const text =
      `Assalamualaikum Wr. Wb. 🌿\n` +
      `Kepada Yth.\n` +
      `Bapak/Ibu/Saudara/i *${name.trim()}*\n\n` +
      `Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:\n\n` +
      `👰🤵 *Radit & Keiani*\n` +
      `📅 Sabtu, 28 Juni 2028\n` +
      `📍 The Grand Ballroom, Jakarta\n\n` +
      `Berikut undangan digitalnya:\n` +
      `🔗 ${finalLink}\n\n` +
      `Merupakan kehormatan bagi kami atas kehadiran Bapak/Ibu/Saudara/i. 🙏\n` +
      `_Wassalamualaikum Wr. Wb._\n` +
      `*Radit & Keiani*`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-xl">✉️</span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Undangan Generator
            </h1>
            <p className="text-xs text-slate-500">
              Radit & Keiani Wedding
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Nama Tamu
            </label>

            <input
              type="text"
              placeholder="Contoh: Rafly & Partner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-slate-800 transition-all"
            />
          </div>

          {name && (
            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                Generated Link Preview:
              </p>

              <p className="text-xs font-mono text-blue-600 break-all leading-relaxed">
                {finalLink}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              onClick={shareToWhatsApp}
              disabled={!name.trim()}
              className="bg-green-600 text-white p-4 rounded-xl font-bold hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
            >
              <span>🚀</span>
              Kirim ke WhatsApp
            </button>

            <button
              onClick={copyToClipboard}
              disabled={!name.trim()}
              className="bg-white text-slate-600 p-4 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              Salin Link Saja
            </button>
          </div>
        </div>

        <footer className="mt-8 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400 font-medium tracking-widest uppercase">
          Digital Invitation System v1.0
        </footer>
      </div>
    </div>
  );
}