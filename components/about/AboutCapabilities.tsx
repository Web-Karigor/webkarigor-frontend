"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ABOUT_CAPABILITIES } from "@/lib/about-data";

/** Soft circle curve — larger step/radius = more gap between lines */
const STEP_DEG = 30;
const RADIUS = 280;
/** Scroll room per capability — all items pin-scroll before page continues */
const SCROLL_VH_PER_STEP = 0.9;

export default function AboutCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = ABOUT_CAPABILITIES.length;
  const sectionHeight = useMemo(
    () => `${total * SCROLL_VH_PER_STEP * 100}vh`,
    [total],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActive = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), scrollable);
      const progress = passed / scrollable;
      const next = Math.round(progress * Math.max(total - 1, 0));
      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FFFEFB]"
      style={{ height: sectionHeight }}
      aria-label="Capabilities"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        <div
          className="relative mx-auto h-[min(580px,74vh)] w-full max-w-[900px] px-[clamp(16px,4vw,40px)]"
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
                  className="about-cap-label absolute left-1/2 top-1/2 m-0 w-full max-w-[900px] whitespace-nowrap text-center font-montserrat text-[clamp(28px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] transition-[transform,color,opacity] duration-500 ease-out will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transformOrigin: "center center",
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
      </div>
    </section>
  );
}
