"use client";

import "lenis/dist/lenis.css";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  acquireSmoothScroll,
  getLenis,
  releaseSmoothScroll,
} from "@/lib/smooth-scroll";
import { refreshScrollTriggers } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      releaseSmoothScroll();
      acquireSmoothScroll();
    };

    acquireSmoothScroll();
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      releaseSmoothScroll();
    };
  }, []);

  useLayoutEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => refreshScrollTriggers());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return children;
}
