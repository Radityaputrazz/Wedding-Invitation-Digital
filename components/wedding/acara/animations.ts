import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inisialisasi semua animasi GSAP untuk section Acara.
 * Mengembalikan context GSAP yang bisa di-revert saat unmount.
 */
export function initAcaraAnimations(sectionRef: RefObject<HTMLElement | null>) {
  return gsap.context(() => {
    // Animasi scroll-triggered untuk setiap event card
    gsap.fromTo(".event-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1.5,
        ease: "power4.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".event-card",
          start: "top 95%",
        },
      }
    );

    // Efek magnetic hover pada tombol
    const buttons = document.querySelectorAll(".btn-magnetic");
    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = (mouseEvent.clientX - left - width / 2) * 0.3;
        const y = (mouseEvent.clientY - top - height / 2) * 0.3;
        gsap.to(btn, { x, y, duration: 0.3 });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      });
    });
  }, sectionRef);
}