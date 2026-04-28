"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/weddingData";
import { Variants } from "framer-motion";

export default function Cover({ onOpen, guestName }: any) {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formattedGuest =
    guestName?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ||
    "Tamu Undangan";

  function handleOpen() {
    setOpen(true);
    audioRef.current?.play().catch(() => {});
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
            {/* 🎥 Background cinematic */}
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.3, x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{
                duration: 30,
                repeat: Infinity,
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
                ease: "easeInOut",
              }}
              style={lightSweep}
            />

            {/* 🎬 CONTENT */}
            <div style={content}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={bismillah}
              >
                بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                style={label}
              >
                The Wedding Of
              </motion.p>

              {/* HERO NAME */}
              <motion.div variants={item}>
                <h2 style={signatureStyle}>
                  {weddingConfig.pria.namaPanggilan}
                </h2>

                <div style={ampersandStyle}>&</div>

                <h2 style={signatureStyle}>
                  {weddingConfig.wanita.namaPanggilan}
                </h2>
              </motion.div>

              {/* GUEST */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                style={guest}
              >
                <p>Dear,</p>
                <h2>{formattedGuest}</h2>
              </motion.div>

              {/* BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                style={button}
              >
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── STYLES ─────────────────

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem", // 🔥 biar aman di layar kecil
};

const bg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "50% 25%",
};

const vignette: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8))",
};

const lightSweep: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
  background:
    "linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)",
  transform: "skewX(-20deg)",
};
const logoWrap: React.CSSProperties = {
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.6rem",
  filter: "drop-shadow(0 0 10px rgba(212,176,106,0.15))",
};

/* ✨ Nama atas (lebih ringan, sedikit tracking) */
const logoNameTop: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(2.2rem, 7vw, 5.2rem)", // 🔥 lebih aman di mobile
  fontWeight: 400,
  letterSpacing: "clamp(0.08em, 0.5vw, 0.14em)", // 🔥 fleksibel
  lineHeight: 1.1,
  textTransform: "uppercase",
  textAlign: "center",
  background: "linear-gradient(180deg, #F6E7C1, #D4B06A, #9F7A34)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 6px 20px rgba(0,0,0,0.6)",
};

const logoNameBottom: React.CSSProperties = {
  ...logoNameTop,
  fontWeight: 500,
};

const signatureStyle: React.CSSProperties = {
  fontFamily: "var(--font-signature)",
  fontSize: "clamp(3.5rem, 10vw, 5.5rem)",
  lineHeight: 1,
  color: "#E6C27A",

  letterSpacing: "0.05em",
  textAlign: "center",

  background: "linear-gradient(180deg, #F5D08A, #B8964A)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",

  textShadow: `
    0 4px 20px rgba(0,0,0,0.5),
    0 0 25px rgba(212,176,106,0.25)
  `,
} satisfies React.CSSProperties;

const ampersandStyle: React.CSSProperties = {
  fontFamily: "serif",
  fontSize: "2rem",
  color: "#B8964A",
  margin: "0.5rem 0",
  opacity: 0.8,
} satisfies React.CSSProperties;

const content: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "#FAF0E0",
  padding: "clamp(1.5rem, 5vw, 3rem)", // 🔥 penting banget
  maxWidth: "720px",
  width: "100%",
};

const name: React.CSSProperties = {
  fontSize: "clamp(3.5rem, 10vw, 6rem)",
  fontFamily: "var(--font-serif)",
  letterSpacing: "0.08em",
  textShadow: "0 10px 40px rgba(0,0,0,0.7)",
};

const label = {
  fontSize: "0.7rem",
  letterSpacing: "0.6em",
  opacity: 0.8,
};

const bismillah = {
  marginBottom: "1rem",
};

const guest = {
  marginTop: "2rem",
};

const button: React.CSSProperties = {
  marginTop: "2.5rem",
  padding: "clamp(0.9rem, 3vw, 1.2rem) clamp(2rem, 6vw, 3.5rem)",
  fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
  background: "rgba(212,176,106,0.95)",
  color: "#1a0a05",
  border: "none",
  borderRadius: "999px",
  letterSpacing: "0.2em",
  cursor: "pointer",
};

