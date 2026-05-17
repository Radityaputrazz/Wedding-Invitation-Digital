export function sanitizeInput(value: string, max = 100) {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, max);
}