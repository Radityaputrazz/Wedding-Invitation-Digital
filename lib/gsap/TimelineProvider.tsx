"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import gsap from "gsap";

type TLContextType = {
  master: gsap.core.Timeline | null;
};

const TLContext = createContext<TLContextType>({ master: null });

export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tlRef.current = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 1.2,
      },
    });
  }, []);

  return (
    <TLContext.Provider value={{ master: tlRef.current }}>
      {children}
    </TLContext.Provider>
  );
}

export function useMasterTimeline() {
  return useContext(TLContext);
}