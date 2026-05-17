import { useState } from "react";
import { weddingConfig } from "@/lib/weddingData";
import { Ucapan } from "./types";

interface UseUcapanFormOptions {
  onSuccess: (item: Ucapan) => void;
}

export function useUcapanForm({ onSuccess }: UseUcapanFormOptions) {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) {
      setError("Mohon isi nama dan pesan doa Anda.");
      return;
    }

    setLoading(true);
    const waktu = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const payload: Ucapan = { nama: nama.trim(), pesan: pesan.trim(), waktu };

    try {
      const res = await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      onSuccess(payload);
      setNama("");
      setPesan("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nama, setNama,
    pesan, setPesan,
    loading, error, setError,
    submitted, focused, setFocused,
    handleSubmit,
  };
}