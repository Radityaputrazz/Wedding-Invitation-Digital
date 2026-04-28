"use client";

import React, { useState } from "react";

export default function LinkGenerator() {
  const [name, setName] = useState("");

  const baseUrl =
    "https://wedding-invitation-radityaputra.vercel.app/invitation";

  const slugify = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, "-");

  const finalLink = `${baseUrl}?to=${encodeURIComponent(slugify(name))}`;

  const copyToClipboard = async () => {
    if (!name) return;
    await navigator.clipboard.writeText(finalLink);
    alert("Link berhasil disalin!");
  };

  const shareToWhatsApp = () => {
    if (!name) return;

    const text = `Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i *${name}* untuk hadir di acara pernikahan kami.

Detail undangan:
${finalLink}`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama tamu"
      />

      <button onClick={shareToWhatsApp}>Kirim WA</button>
      <button onClick={copyToClipboard}>Copy Link</button>
    </div>
  );
}