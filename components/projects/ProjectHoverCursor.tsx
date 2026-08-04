"use client";

import { useEffect, useRef, useState } from "react";
import "./ProjectHoverCursor.css";

const SIZE = 112;
/** Position ease — higher = snappier, lower = softer trail */
const POS_EASE = 0.12;
/** Scale ease — keep separate so open/close never snaps */
const SCALE_EASE = 0.12;
const SCALE_HIDDEN = 0;
const SCALE_VISIBLE = 1;

/**
 * Project image cursor only. Visible while hovering
 * `[data-project-cursor]` zones; smoothly closes elsewhere.
 */
export default function ProjectHoverCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(SCALE_HIDDEN);
  const targetScaleRef = useRef(SCALE_HIDDEN);
  const hotRef = useRef(false);
  const seededRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const el = cursorRef.current;
    if (!el) return;

    const setHot = (hot: boolean) => {
      if (hot === hotRef.current) return;
      hotRef.current = hot;
      targetScaleRef.current = hot ? SCALE_VISIBLE : SCALE_HIDDEN;
      el.style.opacity = hot ? "1" : "0";
      document.documentElement.classList.toggle("project-cursor-active", hot);
    };

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!seededRef.current) {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
        seededRef.current = true;
      }

      const hot = Boolean(
        (e.target as Element | null)?.closest?.("[data-project-cursor]"),
      );
      setHot(hot);
    };

    const onLeaveWindow = () => {
      seededRef.current = false;
      setHot(false);
    };

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;

      p.x += (t.x - p.x) * POS_EASE;
      p.y += (t.y - p.y) * POS_EASE;

      scaleRef.current +=
        (targetScaleRef.current - scaleRef.current) * SCALE_EASE;

      const s = scaleRef.current;
      el.style.transform = `translate3d(${p.x - SIZE / 2}px, ${p.y - SIZE / 2}px, 0) scale(${s})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("project-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        onLeaveWindow,
      );
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="project-hover-cursor"
      aria-hidden
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        className="project-hover-cursor__icon"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="56"
          cy="56"
          r="49"
          stroke="currentColor"
          strokeWidth="6.5"
        />
        <path
          d="M42 70L70 42M70 42H50M70 42V62"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
