"use client";

import { useRef } from "react";

export default function PricingCarousel({
  count,
  className = "",
  children,
}: {
  count: number;
  className?: string;
  children: React.ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const active = count > 4;

  const move = (direction: -1 | 1) => {
    const track = viewport.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".home-pricing-plan");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 280) + gap), behavior: "smooth" });
  };

  return (
    <div className={`pricing-carousel${active ? " is-active" : ""}`}>
      {active && (
        <div className="pricing-carousel-controls">
          <button type="button" aria-label="Previous pricing plans" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next pricing plans" onClick={() => move(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
      <div ref={viewport} className={`${className}${active ? " is-carousel-track" : ""}`}>
        {children}
      </div>
    </div>
  );
}
