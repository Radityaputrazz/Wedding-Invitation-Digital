import gsap from "gsap";
import { RefObject } from "react";

/**
 * Entry animation — items muncul dari bawah dengan blur
 */
export function initCoverEntryAnimation(gsapRef: RefObject<HTMLDivElement | null>) {
  return gsap.context(() => {
    gsap.from(".cover-item", {
      y: 55,
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.16,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.4,
    });
  }, gsapRef);
}

/**
 * Exit animation — items keluar lalu cover fade out,
 * kemudian memanggil onComplete callback
 */
export function createCoverExitTimeline(
  gsapRef: RefObject<HTMLDivElement | null>,
  onComplete: () => void
) {
  const tl = gsap.timeline({ onComplete });

  // Items keluar ke atas
  tl.to(".cover-item", {
    y: -35,
    opacity: 0,
    filter: "blur(8px)",
    stagger: 0.04,
    duration: 0.45,
    ease: "power2.in",
  });

  // Cover fade + blur — durasi singkat agar Hero langsung ambil alih
  tl.to(
    gsapRef.current,
    {
      opacity: 0,
      filter: "blur(24px)",
      scale: 1.06,
      duration: 0.8,
      ease: "power3.inOut",
    },
    "-=0.2"
  );

  return tl;
}