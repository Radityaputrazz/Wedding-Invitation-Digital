"use client";

import { useEffect, useRef } from "react";
import OrnamentDivider from "./OrnamentDivider";
import FooterProtokol from "./FooterProtokol";
import FooterQuote from "./FooterQuote";
import FooterFamily from "./FooterFamily";
import FooterNames from "./FooterNames";
import FooterActions from "./FooterActions";
import { styles } from "./styles";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    footerRef.current?.querySelectorAll(".animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} style={styles.footer}>
      {/* Ambient glow */}
      <div style={styles.bgGlowTop} />
      <div style={styles.bgGlowBottom} />
      <div style={styles.topAccentLine} />

      <div style={styles.innerContainer}>
        <FooterProtokol />
        <OrnamentDivider />

        <FooterQuote />
        <OrnamentDivider />

        <p className="animate" style={styles.thanksText}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada
          kedua mempelai. Atas kehadiran dan doa restunya, kami ucapkan
          terima kasih yang sebesar-besarnya.
        </p>

        <FooterFamily />
        <OrnamentDivider />

        <FooterNames />
        <FooterActions onScrollTop={scrollToTop} />
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .protokol-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: rgba(184, 150, 74, 0.04);
          border-top: 1px solid rgba(184, 150, 74, 0.25);
          border-bottom: 1px solid rgba(184, 150, 74, 0.25);
          border-left: 1px solid rgba(184, 150, 74, 0.1);
          border-right: 1px solid rgba(184, 150, 74, 0.1);
          max-width: 860px;
          margin: 0 auto;
        }
        .top-btn {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .top-btn:hover {
          background: #b8964a !important;
          color: #1a0a05 !important;
          border-color: #b8964a !important;
          letter-spacing: 0.3em !important;
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .protokol-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}