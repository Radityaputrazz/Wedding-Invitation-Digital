"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";

import gsap from "gsap";

interface TimelineContextType {
  master: gsap.core.Timeline;
}

const TLContext =
  createContext<
    TimelineContextType | null
  >(null);

export function TimelineProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const tlRef =
    useRef(
      gsap.timeline({
        paused: true,
      })
    );

  const value =
    useMemo(
      () => ({
        master: tlRef.current,
      }),
      []
    );

  return (
    <TLContext.Provider
      value={value}
    >
      {children}
    </TLContext.Provider>
  );
}

export function useTimeline() {

  const context =
    useContext(TLContext);

  if (!context) {
    throw new Error(
      "useTimeline must be used within TimelineProvider"
    );
  }

  return context;
}