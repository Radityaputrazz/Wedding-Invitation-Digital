"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/lib/weddingData";
import GaleriGrid from "./GaleriGrid";
import Lightbox from "./Lightbox";
import { sectionStyle, containerStyle, labelStyle, titleStyle } from "./styles";

gsap.registerPlugin(ScrollTrigger);

export default function Galeri() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".grid-thumb", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".galeri-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="galeri" ref={sectionRef} style={sectionStyle}>
        <div style={containerStyle}>
          <div className="galeri-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={labelStyle}>Our Precious Moments</p>
            <h2 style={titleStyle}>Galeri Foto</h2>
          </div>

          <GaleriGrid
            images={weddingConfig.galeri}
            onImageClick={(idx) => setLightbox(idx)}
          />
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          index={lightbox}
          images={weddingConfig.galeri}
          onClose={() => setLightbox(null)}
          setIndex={setLightbox}
        />
      )}
    </>
  );
}