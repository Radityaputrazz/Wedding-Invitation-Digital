"use client";

import { useEffect, useRef } from "react";
import { weddingConfig } from "@/lib/weddingData";
import KadoHeader from "./KadoHeader";
import KadoFooter from "./KadoFooter";
import RekeningCard from "./RekeningCard";
import {
  sectionStyle, bgGlow1Style, bgGlow2Style,
  containerStyle, cardsGridStyle,
} from "./styles";

export default function Kado() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="kado" ref={sectionRef} style={sectionStyle}>
      <div style={bgGlow1Style} />
      <div style={bgGlow2Style} />

      <div style={containerStyle}>
        <KadoHeader />

        <div style={cardsGridStyle}>
          {weddingConfig.rekening.map((item, i) => (
            <RekeningCard key={i} item={item} index={i} />
          ))}
        </div>

        <KadoFooter />
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .animate { transform: translateY(20px); }
        }
      `}</style>
    </section>
  );
}