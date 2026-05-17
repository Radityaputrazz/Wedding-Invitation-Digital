export const navLinks = [
  { label: "Beranda", id: "hero" },
  { label: "Mempelai", id: "profil" },
  { label: "Acara", id: "acara" },
  { label: "Galeri", id: "galeri" },
  { label: "RSVP", id: "rsvp" },
] as const;

export type NavLinkId = (typeof navLinks)[number]["id"];