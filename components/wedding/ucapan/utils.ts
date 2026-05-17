/**
 * Ambil inisial huruf pertama dari nama.
 */
export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase() || "?";
}

/**
 * Format nilai waktu dari SheetDB.
 * Nilai bisa berupa angka serial Excel atau string tanggal biasa.
 */
export function formatTanggal(val: unknown): string {
  if (!val) return "";
  if (!isNaN(Number(val)) && typeof val !== "string") {
    const date = new Date((Number(val) - 25569) * 86400 * 1000);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return String(val);
}