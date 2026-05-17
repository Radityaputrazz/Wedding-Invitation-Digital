"use client";

import { useEffect, useRef } from "react";
import UcapanHeader from "./UcapanHeader";
import UcapanForm from "./UcapanForm";
import UcapanList from "./UcapanList";
import { useUcapan } from "./useUcapan";
import { styles } from "./styles";

export default function Ucapan() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ucapanList, fetching, addUcapan } = useUcapan();

  // IntersectionObserver untuk animasi fade-up
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
    <section id="ucapan" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <UcapanHeader />

        <div style={styles.grid}>
          <div className="animate">
            <UcapanForm onSuccess={addUcapan} />
          </div>

          <div className="animate">
            <UcapanList ucapanList={ucapanList} fetching={fetching} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate {
          opacity: 0;
          transform: translateY(40px);
          transition: 1.2s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(184, 150, 74, 0.3);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #B8964A; }

        .btn-gold-action {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .btn-gold-action:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          filter: brightness(1.2);
        }
        .btn-gold-action:active { transform: translateY(-1px); }

        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          transform: translateX(8px);
          border-left: 3px solid #B8964A !important;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 2px solid rgba(184, 150, 74, 0.1);
          border-top: 2px solid #B8964A;
          border-radius: 50%;
          margin: 0 auto 1rem;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}