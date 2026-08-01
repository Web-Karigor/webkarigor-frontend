"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./GlobalCursor.css";

const SIZE = 16;
const POS_EASE = 0.18;

function isProjectsRoute(pathname: string | null) {
  return Boolean(pathname?.startsWith("/projects"));
}

/**
 * Site-wide soft dot cursor (mix-blend difference).
 * Skipped on /projects and /projects/[slug] — those use ProjectHoverCursor.
 */
export default function GlobalCursor() {
  const pathname = usePathname();
  const onProjects = isProjectsRoute(pathname);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const seededRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [pointerOk, setPointerOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setPointerOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const enabled = pointerOk && !onProjects;

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("global-cursor-active");
      return;
    }

    const el = cursorRef.current;
    if (!el) return;

    document.documentElement.classList.add("global-cursor-active");
    seededRef.current = false;
    el.style.opacity = "0";

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!seededRef.current) {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
        seededRef.current = true;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      seededRef.current = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;
      p.x += (t.x - p.x) * POS_EASE;
      p.y += (t.y - p.y) * POS_EASE;
      el.style.transform = `translate3d(${p.x - SIZE / 2}px, ${p.y - SIZE / 2}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("global-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="global-cursor"
      aria-hidden
      style={{ width: SIZE, height: SIZE }}
    />
  );
}
