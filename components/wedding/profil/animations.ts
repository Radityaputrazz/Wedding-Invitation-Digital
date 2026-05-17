import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animasi scroll-triggered untuk section Profil.
 * Header fade up terlebih dahulu, lalu dua kartu menyusul.
 */
export function initProfilAnimations(sectionRef: RefObject<HTMLDivElement | null>) {
  return gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    tl.from(".profil-header", { y: 50, opacity: 0, duration: 1 }).from(
      ".profil-card",
      { y: 80, opacity: 0, stagger: 0.4, duration: 1.5, ease: "power4.out" },
      "-=0.5"
    );
  }, sectionRef);
}