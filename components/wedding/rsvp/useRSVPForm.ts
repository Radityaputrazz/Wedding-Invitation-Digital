import { useState } from "react";
import { weddingConfig } from "@/lib/weddingData";
import { FormData, StatusKehadiran } from "./types";

const INITIAL_FORM: FormData = {
  nama: "",
  telepon: "",
  jumlah: "1 orang",
  status: "hadir",
};

export function useRSVPForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.telepon.trim()) {
      setError("Mohon lengkapi nama dan nomor telepon Anda.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(weddingConfig.sheetdbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          waktu: new Date().toLocaleString("id-ID"),
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    submitted,
    loading,
    error,
    focusedInput,
    handleChange,
    handleSubmit,
    setFocusedInput,
  };
}