"use client";

import { useEffect, useRef, useState } from "react";
import "./GlobalCursor.css";

const SIZE = 16;
const POS_EASE = 0.4;
const SCALE_EASE = 0.22;
const IDLE_SCALE = 1;
const HOVER_SCALE = 1.65;
/** Offset so dot sits near cursor tip without hiding the arrow */
const OFFSET_X = -6;
const OFFSET_Y = -10;

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  const interactive = target.closest(
    [
      "a[href]",
      "button",
      "label[for]",
      "summary",
      "select",
      "input:not([type='hidden'])",
      "textarea",
      "[role='button']",
      "[role='link']",
      "[data-cursor='pointer']",
      ".cursor-pointer",
      "[tabindex]:not([tabindex='-1'])",
    ].join(","),
  );

  if (!interactive) return false;
  if (interactive.hasAttribute("disabled")) return false;
  if (interactive.getAttribute("aria-disabled") === "true") return false;
  return true;
}

function isProjectImageTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("[data-project-cursor]"));
}

/**
 * Site-wide soft dot cursor (mix-blend difference).
 * On /projects, hides smoothly over images so ProjectHoverCursor can take over.
 */
export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(IDLE_SCALE);
  const targetScaleRef = useRef(IDLE_SCALE);
  const seededRef = useRef(false);
  const hiddenForProjectRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [pointerOk, setPointerOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setPointerOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pointerOk) return;

    const el = cursorRef.current;
    if (!el) return;

    seededRef.current = false;
    hiddenForProjectRef.current = false;
    el.style.opacity = "0";

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX + OFFSET_X;
      targetRef.current.y = e.clientY + OFFSET_Y;

      const onProjectImage = isProjectImageTarget(e.target);

      if (onProjectImage) {
        hiddenForProjectRef.current = true;
        targetScaleRef.current = IDLE_SCALE;
        el.style.opacity = "0";
        return;
      }

      targetScaleRef.current = isInteractiveTarget(e.target)
        ? HOVER_SCALE
        : IDLE_SCALE;

      if (!seededRef.current) {
        posRef.current.x = e.clientX + OFFSET_X;
        posRef.current.y = e.clientY + OFFSET_Y;
        seededRef.current = true;
      }

      // Re-show smoothly after leaving a project image
      if (hiddenForProjectRef.current || el.style.opacity !== "1") {
        hiddenForProjectRef.current = false;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      seededRef.current = false;
      hiddenForProjectRef.current = false;
      targetScaleRef.current = IDLE_SCALE;
      scaleRef.current = IDLE_SCALE;
      el.style.opacity = "0";
    };

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;
      const currentScale = scaleRef.current;
      const targetScale = targetScaleRef.current;
      p.x += (t.x - p.x) * POS_EASE;
      p.y += (t.y - p.y) * POS_EASE;
      scaleRef.current += (targetScale - currentScale) * SCALE_EASE;
      el.style.transform =
        `translate3d(${p.x - SIZE / 2}px, ${p.y - SIZE / 2}px, 0) ` +
        `scale(${scaleRef.current})`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [pointerOk]);

  if (!pointerOk) return null;

  return (
    <div
      ref={cursorRef}
      className="global-cursor"
      aria-hidden
      style={{ width: SIZE, height: SIZE }}
    />
  );
}
