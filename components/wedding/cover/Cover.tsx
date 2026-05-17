"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { weddingConfig } from "@/lib/weddingData";
import CoverBackground from "./CoverBackground";
import CoverOverlay from "./CoverOverlay";
import CoverContent from "./CoverContent";
import { initCoverEntryAnimation, createCoverExitTimeline } from "./animations";

interface CoverProps {
  onOpen: () => void;
  guestName: string;
}

export default function Cover({ onOpen, guestName }: CoverProps) {
  const [open, setOpen] = useState(false);
  const gsapRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formattedGuest =
    guestName?.replace(/\b\w/g, (c: string) => c.toUpperCase()) ||
    "Tamu Undangan";

  // Entry animation
  useEffect(() => {
    const ctx = initCoverEntryAnimation(gsapRef);
    return () => ctx.revert();
  }, []);

  // Exit animation + open handler
  const handleOpen = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }

    createCoverExitTimeline(gsapRef, () => {
      setOpen(true);
      onOpen();
      window.dispatchEvent(new Event("wedding:open"));
    });
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingConfig.musicUrl} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!open && (
          <CoverBackground>
            <CoverOverlay />
            <CoverContent
              gsapRef={gsapRef}
              formattedGuest={formattedGuest}
              onOpen={handleOpen}
            />
          </CoverBackground>
        )}
      </AnimatePresence>
    </>
  );
}