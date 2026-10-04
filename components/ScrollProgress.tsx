"use client";

import "./ScrollProgress.css";

import { useEffect, useRef } from "react";

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

export default function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const apply = () => {
      const bar = barRef.current;
      if (!bar) return;
      bar.style.transform = `scaleX(${scrollProgress()})`;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <span ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
