"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/weddingData";
import { Variants } from "framer-motion";

export default function Cover({ onOpen, guestName }: { onOpen: () => void, guestName: string }) {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Formatting nama tamu: Huruf kapital di setiap kata
  const formattedGuest =
    guestName?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ||
    "Tamu Undangan";

  function handleOpen() {
    setOpen(true);
    // Audio dimainkan saat tombol diklik (solusi auto-play browser)
    audioRef.current?.play().catch(() => {});
    // Delay onOpen sedikit agar animasi exit AnimatePresence selesai
    setTimeout(onOpen, 1200);
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 1.2 }}
            style={overlay}
          >
            {/* 🎥 Background cinematic dengan efek Ken Burns */}
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.3, x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                ...bg,
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85)),
                  url('/images/cover.png')
                `,
              }}
            />

            {/* 🌫️ Vignette */}
            <div style={vignette} />

            {/* ✨ Light sweep (cinematic highlight) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 3,
                delay: 1,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
              style={lightSweep}
            />

            {/* 🎬 CONTENT */}
            <div style={content}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={bismillah}
              >
                بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                style={label}
              >
                THE WEDDING OF
              </motion.p>

              {/* HERO NAME */}
              <motion.div 
                initial="hidden"
                animate="show"
                variants={staggerContainer}
              >
                <motion.h2 variants={item} style={signatureStyle}>
                  {weddingConfig.pria.namaPanggilan}
                </motion.h2>

                <motion.div variants={item} style={ampersandStyle}>&</motion.div>

                <motion.h2 variants={item} style={signatureStyle}>
                  {weddingConfig.wanita.namaPanggilan}
                </motion.h2>
              </motion.div>

              {/* GUEST SECTION */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={guestWrapper}
              >
                <p style={dearText}>Dear,</p>
                <h2 style={guestNameStyle}>{formattedGuest}</h2>
              </motion.div>

              {/* BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(184, 150, 74, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                style={button}
              >
                BUKA UNDANGAN
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── ANIMATION VARIANTS ─────────────────

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 1.2 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── STYLES ─────────────────

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  backgroundColor: "#0d0503",
  overflow: "hidden"
};

const bg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 25%",
};

const vignette: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.7) 100%)",
};

const lightSweep: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "50%",
  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
  transform: "skewX(-25deg)",
};

const content: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  textAlign: "center" as const,
  color: "#FAF0E0",
  padding: "2rem",
  width: "100%",
  maxWidth: "600px",
};

const signatureStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)", // Menggunakan serif sesuai Night Gala
  fontSize: "clamp(3rem, 10vw, 5rem)",
  lineHeight: 1.2,
  color: "#FAF0E0",
  textAlign: "center" as const,
  letterSpacing: "0.02em",
  textShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

const ampersandStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "1.8rem",
  color: "#B8964A",
  margin: "0.5rem 0",
  fontStyle: "italic"
};

const bismillah: React.CSSProperties = {
  marginBottom: "1.5rem",
  fontSize: "1.2rem",
  opacity: 0.8,
  letterSpacing: "0.1em"
};

const label: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.5em",
  color: "#B8964A",
  marginBottom: "1rem"
};

const guestWrapper: React.CSSProperties = {
  marginTop: "3rem",
  padding: "1.5rem",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(184, 150, 74, 0.15)"
};

const dearText: React.CSSProperties = {
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  opacity: 0.7,
  marginBottom: "0.5rem"
};

const guestNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.6rem",
  color: "#FAF0E0",
  fontWeight: 400
};

const button: React.CSSProperties = {
  marginTop: "3rem",
  padding: "1rem 2.5rem",
  fontSize: "0.75rem",
  background: "linear-gradient(135deg, #B8964A, #8F7235)",
  color: "#0d0503",
  border: "none",
  borderRadius: "50px",
  letterSpacing: "0.3em",
  cursor: "pointer",
  fontWeight: 700,
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
};