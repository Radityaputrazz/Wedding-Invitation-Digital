import { weddingConfig } from "@/lib/weddingData";

/**
 * Generate dan download file iCal (.ics) untuk Apple Calendar / Outlook.
 */
export function downloadICal(): void {
  const title = `The Wedding of ${weddingConfig.pria.namaPanggilan} & ${weddingConfig.wanita.namaPanggilan}`;
  const location = weddingConfig.resepsi.namaGedung;
  const description = "Mohon doa restu atas pernikahan kami.";

  // Format: YYYYMMDDTHHMMSS (local time)
  const startDate = "20260524T090000";
  const endDate   = "20260524T210000";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//ID",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    `DTSTART;TZID=Asia/Jakarta:${startDate}`,
    `DTEND;TZID=Asia/Jakarta:${endDate}`,
    `UID:${Date.now()}@wedding-invitation`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n"); // iCal spec requires CRLF

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url  = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href  = url;
  link.setAttribute("download", "wedding-event.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}