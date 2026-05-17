"use client";

import { useEffect, useRef } from "react";
import RSVPHeader from "./RSVPHeader";
import RSVPForm from "./RSVPForm";
import SuccessMessage from "./SuccessMessage";
import { useRSVPForm } from "./useRSVPForm";
import { styles } from "./styles";

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    form,
    submitted,
    loading,
    error,
    focusedInput,
    handleChange,
    handleSubmit,
    setFocusedInput,
  } = useRSVPForm();

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
    <section id="rsvp" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        <RSVPHeader />

        <div className="animate fade-up-delay" style={styles.glassCard}>
          {submitted ? (
            <SuccessMessage nama={form.nama} status={form.status} />
          ) : (
            <RSVPForm
              form={form}
              loading={loading}
              error={error}
              focusedInput={focusedInput}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onFocus={setFocusedInput}
              onBlur={() => setFocusedInput(null)}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .rsvp-submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        .rsvp-submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(184, 150, 74, 0.3) !important;
          letter-spacing: 0.25em !important;
        }
        .rsvp-submit-btn::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -60%;
          width: 20%;
          height: 200%;
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(30deg);
          transition: all 0.6s;
          opacity: 0;
        }
        .rsvp-submit-btn:hover::after {
          left: 120%;
          opacity: 1;
        }
        .btn-icon {
          display: inline-block;
          animation: starPulse 2s infinite ease-in-out;
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); color: #fff; }
        }
      `}</style>
    </section>
  );
}