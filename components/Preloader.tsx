"use client";

import { useIsFetching } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Minimum time the overlay stays up (avoids blink). */
const MIN_MS = 600;
/** Hard cap so a stuck request cannot trap the UI. */
const MAX_MS = 12000;
/** Give the new page time to mount (incl. dynamic chunks) and start queries. */
const BOOTSTRAP_MS = 650;
/** Fetches must stay at 0 this long before we treat the page as ready. */
const IDLE_MS = 350;
const EXIT_MS = 550;

export default function Preloader() {
  const pathname = usePathname();
  const fetching = useIsFetching();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(12);

  const cycleRef = useRef(0);
  const startedAtRef = useRef(Date.now());
  const idleSinceRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  // Every route change → show preloader until that page's API work settles.
  useEffect(() => {
    cycleRef.current += 1;
    finishedRef.current = false;
    idleSinceRef.current = null;
    startedAtRef.current = Date.now();
    setVisible(true);
    setExiting(false);
    setProgress(12);
    document.documentElement.classList.add("wk-preloader-active");
  }, [pathname]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("wk-preloader-active");
    };
  }, []);

  // Fade out, then unmount overlay.
  useEffect(() => {
    if (!exiting) return;
    const cycle = cycleRef.current;
    const timer = window.setTimeout(() => {
      if (cycle !== cycleRef.current) return;
      setVisible(false);
      document.documentElement.classList.remove("wk-preloader-active");
    }, EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [exiting]);

  // Stay visible while React Query has in-flight requests for this route.
  useEffect(() => {
    if (!visible || exiting) return;

    const cycle = cycleRef.current;
    let frame = 0;

    const complete = () => {
      if (finishedRef.current || cycle !== cycleRef.current) return;
      finishedRef.current = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      setExiting(true);
    };

    const tick = () => {
      if (finishedRef.current || cycle !== cycleRef.current) return;

      const elapsed = Date.now() - startedAtRef.current;
      const bootstrapped = elapsed >= BOOTSTRAP_MS;

      if (fetching > 0) {
        idleSinceRef.current = null;
        setProgress(Math.min(90, 14 + (elapsed / 5000) * 76));
      } else if (!bootstrapped) {
        // Still waiting for page components to mount / start their queries.
        idleSinceRef.current = null;
        setProgress(Math.min(72, 12 + (elapsed / BOOTSTRAP_MS) * 60));
      } else {
        if (idleSinceRef.current == null) idleSinceRef.current = Date.now();
        const idleFor = Date.now() - idleSinceRef.current;
        setProgress(Math.min(97, 90 + (idleFor / IDLE_MS) * 7));

        if (elapsed >= MIN_MS && idleFor >= IDLE_MS) {
          complete();
          return;
        }
      }

      if (elapsed >= MAX_MS) {
        complete();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [visible, exiting, fetching, pathname]);

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
