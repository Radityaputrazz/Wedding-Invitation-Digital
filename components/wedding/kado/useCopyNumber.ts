import { useState } from "react";

/**
 * Hook untuk menyalin nomor rekening ke clipboard.
 * Menyertakan fallback execCommand untuk browser lama / non-HTTPS.
 */
export function useCopyNumber() {
  const [copied, setCopied] = useState(false);

  const copy = async (nomor: string) => {
    const clean = nomor.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(clean);
    } catch {
      const el = document.createElement("textarea");
      el.value = clean;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}