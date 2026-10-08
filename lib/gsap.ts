import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let touchCount = 0;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  const compact = window.matchMedia("(max-width: 1023px)").matches;
  ScrollTrigger.config({
    autoRefreshEvents: compact
      ? "visibilitychange,DOMContentLoaded,load"
      : "visibilitychange,DOMContentLoaded,load,resize",
    ignoreMobileResize: true,
  });

  ScrollTrigger.defaults({
    anticipatePin: 0,
    invalidateOnRefresh: true,
  });

  const bumpTouch = (delta: number) => {
    touchCount = Math.max(0, touchCount + delta);
  };
  window.addEventListener("touchstart", () => bumpTouch(1), {
    passive: true,
    capture: true,
  });
  window.addEventListener("touchend", () => bumpTouch(-1), {
    passive: true,
    capture: true,
  });
  window.addEventListener("touchcancel", () => {
    touchCount = 0;
  }, { passive: true, capture: true });
}

export function isCompactViewport() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

/** iOS/Android URL-bar hide/show fires resize with the same width. */
export function isTouchToolbarResize(prevWidth: number) {
  if (typeof window === "undefined") return false;
  if (!isCompactViewport()) return false;
  return window.innerWidth === prevWidth;
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;

  /* Never refresh on the settle frame — that 1px ST remap is the end-jerk. */
  if (
    document.documentElement.classList.contains("lenis-scrolling") ||
    document.documentElement.classList.contains("lenis-smooth")
  ) {
    return;
  }

  /* ST.refresh remaps pin spacers and yanks window.scrollY mid-gesture. */
  if (touchCount > 0 && isCompactViewport()) return;

  ScrollTrigger.refresh();
}

/** Scroll distance in px for stacked/pinned sections */
export function scrollStepsPx(steps: number) {
  return steps * window.innerHeight;
}

export { gsap, ScrollTrigger };
