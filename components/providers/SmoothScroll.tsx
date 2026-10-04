"use client";

import "lenis/dist/lenis.css";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import {
  acquireSmoothScroll,
  releaseSmoothScroll,
  scrollAppToTop,
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
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      releaseSmoothScroll();
    };
  }, []);

  useLayoutEffect(() => {
    if (window.location.hash) return;

    scrollAppToTop({ immediate: true });

    const raf = requestAnimationFrame(() => {
      scrollAppToTop({ immediate: true });
      refreshScrollTriggers();
    });
    const timer = window.setTimeout(() => {
      if (window.location.hash) return;
      scrollAppToTop({ immediate: true });
      refreshScrollTriggers();
    }, 50);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return children;
}
