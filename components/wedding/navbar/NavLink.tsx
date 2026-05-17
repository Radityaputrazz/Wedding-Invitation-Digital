import { navLinks } from "./navLinks";

interface NavLinksProps {
  activeSection: string;
  onScrollTo: (id: string) => void;
}

export default function NavLinks({ activeSection, onScrollTo }: NavLinksProps) {
  return (
    <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
      {navLinks.map((link) => (
        <li key={link.id}>
          <button
            onClick={() => onScrollTo(link.id)}
            className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative pb-1 ${
              activeSection === link.id
                ? "text-[#B8964A]"
                : "text-[#FAF0E0]/60 hover:text-[#B8964A]"
            }`}
          >
            {link.label}
            {activeSection === link.id && (
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#B8964A] animate-in slide-in-from-left duration-500" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}