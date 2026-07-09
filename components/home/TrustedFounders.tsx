"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SLIDER_IMAGES } from "@/lib/home-assets";

const images = SLIDER_IMAGES;

export default function TrustedFounders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          containerRef.current,
          { x: -60 },
          {
            x: 60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1,
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          containerRef.current,
          { x: -24 },
          {
            x: 24,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "bottom 10%",
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="trusted-wrapper">
      <div className="trusted-layout">
        <div className="trusted-text">
          <span className="trusted-badge">Testimonials</span>
          <h2 className="trusted-heading font-bold">
            Trusted <br />
            by <br />
            <span className="text-[#BABABA] font-museoModerno font-bold">
              Founders
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="trusted-image-row"
          style={{ willChange: "transform" }}
        >
          {images.map((src, i) => (
            <div key={src} className={`trusted-image-card size-${i + 1}`}>
              <img src={src} alt="" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
