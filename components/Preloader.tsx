"use client";

import { useEffect, useState } from "react";

const MIN_MS = 2000;
const MAX_MS = 5000;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("wk-preloader-active");

    const startedAt = Date.now();
    let frame = 0;
    let finished = false;
    let exitTimer = 0;
    let hideTimer = 0;

    const tick = () => {
      if (finished) return;
      const elapsed = Date.now() - startedAt;
      const ready = document.readyState === "complete";
      const base = Math.min(90, 12 + (elapsed / MIN_MS) * 78);
      setProgress(ready ? Math.max(base, 94) : base);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const hide = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      setExiting(true);

      exitTimer = window.setTimeout(() => {
        setVisible(false);
        root.classList.remove("wk-preloader-active");
      }, 550);
    };

    const complete = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - startedAt));
      hideTimer = window.setTimeout(hide, remaining);
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    const safety = window.setTimeout(complete, MAX_MS);

    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
      window.clearTimeout(hideTimer);
      window.clearTimeout(exitTimer);
      window.removeEventListener("load", complete);
      root.classList.remove("wk-preloader-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="wk-preloader"
      className={`wk-preloader${exiting ? " wk-preloader--exit" : ""}`}
      role="status"
      aria-busy="true"
      aria-label="Loading Web Karigor"
      suppressHydrationWarning
    >
      <div className="wk-preloader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="wk-preloader-logo"
          src="/logo.svg"
          alt="Web Karigor"
          width={240}
          height={32}
        />
        <div className="wk-preloader-track" aria-hidden>
          <div
            className="wk-preloader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="wk-preloader-label">Loading</p>
      </div>
    </div>
  );
}
