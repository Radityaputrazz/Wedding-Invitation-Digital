import { useState, useEffect } from "react";
import { weddingConfig } from "@/lib/weddingData";
import { Ucapan } from "./types";
import { formatTanggal } from "./utils";

export function useUcapan() {
  const [ucapanList, setUcapanList] = useState<Ucapan[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUcapan() {
      try {
        const res = await fetch(`${weddingConfig.sheetdbUrl}?sheet=ucapan`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const cleaned = data.map((item: Ucapan) => ({
            ...item,
            waktu: formatTanggal(item.waktu),
          }));
          setUcapanList(cleaned.reverse());
        }
      } catch {
        setError("Gagal memuat pesan.");
      } finally {
        setFetching(false);
      }
    }
    fetchUcapan();
  }, []);

  const addUcapan = (item: Ucapan) => {
    setUcapanList((prev) => [item, ...prev]);
  };

  return { ucapanList, fetching, error, addUcapan };
}