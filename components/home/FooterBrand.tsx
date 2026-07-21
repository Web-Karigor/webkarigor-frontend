"use client";

import { useLayoutEffect, useRef } from "react";

export default function FooterBrand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      const inset = 20;
      text.style.transform = "scale(1)";
      text.style.transformOrigin = "center bottom";

      const available = Math.max(0, wrap.clientWidth - inset * 2);
      const needed = text.scrollWidth;

      if (needed > 0 && available > 0) {
        const scale = Math.min(1, available / needed);
        text.style.transform = `scale(${scale})`;
      }
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(wrap);

    if (document.fonts?.ready) {
      document.fonts.ready.then(fit);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="footer-brand-wrap" aria-hidden>
      <p ref={textRef} className="footer-brand">
        WEBKARIGOR
      </p>
    </div>
  );
}
