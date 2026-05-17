import { navLinks } from "./navLinks";

interface MobileMenuProps {
  open: boolean;
  onScrollTo: (id: string) => void;
}

export default function MobileMenu({ open, onScrollTo }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 bg-[#0d0503] z-100 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="space-y-10 text-center">
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => onScrollTo(link.id)}
            className="block text-3xl font-serif text-[#B8964A] tracking-[0.2em] transition-all hover:tracking-[0.4em]"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Ornamen bawah */}
      <div className="absolute bottom-10 text-[#B8964A]/20 text-4xl">❧</div>
    </div>
  );
}