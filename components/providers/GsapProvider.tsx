"use client";

import { useLayoutEffect } from "react";
import { isTouchToolbarResize, refreshScrollTriggers } from "@/lib/gsap";

function debounce(fn: () => void, ms: number) {
  let t = 0;
  return () => {
    window.clearTimeout(t);
    t = window.setTimeout(fn, ms);
  };
}

export default function GsapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const refresh = () => refreshScrollTriggers();
    const refreshDebounced = debounce(refresh, 180);

    const rafId = requestAnimationFrame(refresh);
    let viewportWidth = window.innerWidth;

    const onViewportResize = () => {
      if (isTouchToolbarResize(viewportWidth)) return;
      viewportWidth = window.innerWidth;
      refreshDebounced();
    };

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onViewportResize);
    document.fonts?.ready?.then(refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onViewportResize);
    };
  }, []);

  return children;
}
