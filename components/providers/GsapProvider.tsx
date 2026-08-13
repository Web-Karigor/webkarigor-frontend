"use client";

import { useLayoutEffect } from "react";
import { refreshScrollTriggers } from "@/lib/gsap";

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

    refresh();
    const rafId = requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 400);

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", refreshDebounced);
    document.fonts?.ready?.then(refresh);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", refreshDebounced);
    };
  }, []);

  return children;
}
