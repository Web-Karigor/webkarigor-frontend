"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_CAPABILITIES } from "@/lib/about-data";

export default function AboutCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActive = () => {
      const mid = window.innerHeight * 0.48;
      let closest = 3;
      let closestDist = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });

      setActiveIndex(closest);
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
    <section ref={sectionRef} className="bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-3 px-[clamp(16px,4vw,40px)] sm:gap-4 md:gap-5">
        {ABOUT_CAPABILITIES.map((label, index) => {
          const isActive = index === activeIndex;
          return (
            <p
              key={`${label}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`m-0 text-center font-montserrat text-[clamp(28px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] transition-all duration-300 ${
                isActive
                  ? "scale-105 text-[#111827]"
                  : "scale-100 text-[#D1D5DB]"
              }`}
            >
              {label}
            </p>
          );
        })}
      </div>
    </section>
  );
}
