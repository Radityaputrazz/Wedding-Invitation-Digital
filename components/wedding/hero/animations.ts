import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inisialisasi semua animasi GSAP untuk Hero section.
 * Mengembalikan GSAP context untuk di-revert saat unmount.
 */
export function initHeroAnimations(sectionRef: RefObject<HTMLDivElement | null>) {
  return gsap.context(() => {
    // Entry animation
    const tl = gsap.timeline();
    tl.from(".hero-bg", { scale: 1.3, opacity: 0, duration: 2.5, ease: "expo.out" });
    tl.from(".hero-item", { y: 40, opacity: 0, stagger: 0.2, duration: 1.4, ease: "power4.out" }, "-=1.8");

    // Parallax + fade saat scroll
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    scrollTl
      .to(".hero-bg-inner", { y: "15%", scale: 1.2, ease: "none" }, 0)
      .fromTo(".hero-dynamic-overlay", { opacity: 0 }, { opacity: 1, ease: "none", immediateRender: false }, 0)
      .fromTo(
        ".hero-content",
        { opacity: 1, filter: "blur(0px)", y: 0 },
        { opacity: 0, filter: "blur(20px)", y: -100, ease: "none", immediateRender: false },
        0
      );
  }, sectionRef);
}