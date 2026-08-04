"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_CAPABILITIES } from "@/lib/about-data";

/** Soft circle curve — a bit more step/radius = light gap between lines */
const STEP_DEG = 22;
const RADIUS = 210;

export default function AboutCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActive = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.65;
      const end = viewH * 0.35;
      const raw = (start - rect.top) / (start - end + rect.height);
      const progress = Math.min(1, Math.max(0, raw));
      setActiveIndex(Math.round(progress * (ABOUT_CAPABILITIES.length - 1)));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FFFEFB] py-16 sm:py-20 md:py-28"
      aria-label="Capabilities"
    >
      <div
        className="relative mx-auto h-[min(480px,62vh)] w-full max-w-[900px] px-[clamp(16px,4vw,40px)]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {ABOUT_CAPABILITIES.map((label, index) => {
            const offset = index - activeIndex;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const angle = offset * STEP_DEG;

            return (
              <p
                key={`${label}-${index}`}
                className="absolute left-1/2 top-1/2 m-0 w-full max-w-[900px] whitespace-nowrap text-center font-montserrat text-[clamp(28px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] transition-[transform,color,opacity] duration-500 ease-out will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transformOrigin: "center center",
                  // translate(-50%,-50%) MUST stay in transform so items stay middle
                  transform: `translate(-50%, -50%) rotateX(${-angle}deg) translateZ(${RADIUS}px) scale(${
                    isActive ? 1.06 : Math.max(0.88, 1 - abs * 0.04)
                  })`,
                  color: isActive ? "#111827" : "#D1D5DB",
                  opacity: Math.max(0.25, 1 - abs * 0.17),
                  zIndex: isActive ? 10 : Math.max(0, 5 - abs),
                }}
              >
                {label}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
