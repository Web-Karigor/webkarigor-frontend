import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    ignoreMobileResize: true,
  });

  ScrollTrigger.defaults({
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

/** Scroll distance in px for stacked/pinned sections */
export function scrollStepsPx(steps: number) {
  return steps * window.innerHeight;
}

export { gsap, ScrollTrigger };
