import Lenis from "lenis";
import { gsap } from "@/lib/gsap";

const DESKTOP_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Quint-out for programmatic scrollTo only (buttons/anchors).
 * Wheel uses lerp so Lenis can complete on whole pixels (no subpixel tail + snap).
 */
const programmaticEase = (t: number) => {
  const rest = 1 - t;
  return 1 - rest * rest * rest * rest * rest;
};

let lenis: Lenis | null = null;
let refCount = 0;
let tickerAttached = false;
let lagSmoothingBackup: [number, number] | null = null;

let lastWheelSign = 0;
let lastWheelAt = 0;
let lastWheelAbs = 0;
let gainSmoothed = 0.62;
let lastGainAt = 0;
let lastInputTrackpad = false;
let coastVel = 0;
let coastArmed = false;
let lastTickerMs = 0;
const recentWheels: { t: number; abs: number }[] = [];

const WHEEL_IDLE_MS = 70;
const COAST_TAU = 0.19;
const MAX_COAST_SPEED = 720;
const MIN_COAST_SPEED = 90;
const STOP_COAST_SPEED = 26;

function resetWheelState() {
  lastWheelSign = 0;
  lastWheelAt = 0;
  lastWheelAbs = 0;
  gainSmoothed = 0.62;
  lastGainAt = 0;
  lastInputTrackpad = false;
  coastVel = 0;
  coastArmed = false;
  lastTickerMs = 0;
  recentWheels.length = 0;
}

function stopCoast() {
  coastVel = 0;
  coastArmed = false;
}

function pruneWheelWindow(now: number) {
  const oldest = now - 160;
  while (recentWheels.length && recentWheels[0].t < oldest) {
    recentWheels.shift();
  }
}

/** Map recent notch cadence → target gain. Slow stays slow; bursts get real speed. */
function cadenceGain(now: number) {
  pruneWheelWindow(now);
  const n = recentWheels.length;
  if (n <= 1) return 0.48;
  if (n === 2) return 0.7;
  if (n === 3) return 0.92;
  if (n <= 5) return 1.18;
  if (n <= 8) return 1.42;
  return 1.62;
}

function easeGain(target: number, now: number) {
  const dt = lastGainAt ? Math.min(48, now - lastGainAt) : 16;
  lastGainAt = now;
  const alpha = 1 - Math.exp(-dt / 72);
  gainSmoothed += (target - gainSmoothed) * alpha;
  return gainSmoothed;
}

function releaseVelocityPxS() {
  const now = performance.now();
  pruneWheelWindow(now);
  const n = recentWheels.length;
  if (n === 0 || lastWheelSign === 0) return 0;

  const intensity = gainSmoothed;
  const cadence =
    n <= 1 ? 0.38 : n <= 2 ? 0.62 : n <= 3 ? 0.82 : n <= 6 ? 1 : 1.12;
  const fromCadence = ((90 * intensity) / COAST_TAU) * cadence;

  const fromLenis =
    lenis && lastTickerMs
      ? Math.abs(lenis.velocity) / Math.max(0.01, (now - lastTickerMs) / 1000)
      : 0;

  const mixed = Math.max(fromCadence, fromLenis * 0.55);
  return lastWheelSign * Math.min(mixed, MAX_COAST_SPEED);
}

function applyCoast(now: number, dt: number) {
  if (!lenis || lenis.isStopped || lastInputTrackpad || lastWheelAt <= 0) {
    return;
  }

  if (now - lastWheelAt <= WHEEL_IDLE_MS) return;

  if (!coastArmed) {
    const v = releaseVelocityPxS();
    coastArmed = true;
    coastVel = Math.abs(v) >= MIN_COAST_SPEED ? v : 0;
  }

  if (Math.abs(coastVel) <= STOP_COAST_SPEED) {
    coastVel = 0;
    return;
  }

  const add = coastVel * dt;
  coastVel *= Math.exp(-dt / COAST_TAU);
  if (Math.abs(add) < 0.08) {
    coastVel = 0;
    return;
  }

  lenis.scrollTo(lenis.targetScroll + add, {
    programmatic: false,
    lerp: 0.078,
  });
}

function onTicker(time: number) {
  const now = performance.now();
  const dt = lastTickerMs ? Math.min(0.032, (now - lastTickerMs) / 1000) : 1 / 60;
  applyCoast(now, dt);
  lastTickerMs = now;
  lenis?.raf(time * 1000);
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_QUERY).matches;
}

function isDesktopPointer() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function isWheelEvent(event: WheelEvent | TouchEvent): event is WheelEvent {
  return event.type.includes("wheel");
}

function acceptVirtualScroll(data: {
  deltaX: number;
  deltaY: number;
  event: WheelEvent | TouchEvent;
}) {
  const { deltaY, event } = data;
  if (!isWheelEvent(event)) return true;

  const abs = Math.abs(deltaY);
  const sign = Math.sign(deltaY);
  const now = performance.now();
  const lineWheel = event.deltaMode === 1;
  const pixelWheel = event.deltaMode === 0;

  /* Tiny opposite notch after a real mouse tick — hardware bounce, not a reverse. */
  if (
    lastWheelAbs >= 50 &&
    sign !== 0 &&
    lastWheelSign !== 0 &&
    sign !== lastWheelSign &&
    abs < 28 &&
    now - lastWheelAt < 90
  ) {
    return false;
  }

  const likelyTrackpad = pixelWheel && !lineWheel && abs < 42;
  lastInputTrackpad = likelyTrackpad;
  stopCoast();

  if (abs > 1.2) {
    recentWheels.push({ t: now, abs });
    lastWheelAt = now;
    lastWheelAbs = abs;
    if (sign !== 0 && sign !== lastWheelSign && lastWheelSign !== 0 && abs >= 28) {
      gainSmoothed *= 0.42;
    }
    lastWheelSign = sign || lastWheelSign;
  }

  if (likelyTrackpad) {
    const track = Math.min(abs * (abs < 12 ? 0.92 : 1.05), 72);
    data.deltaY = sign * track;
    return true;
  }

  const gain = easeGain(cadenceGain(now), now);
  const perTick = Math.min(abs, 118) * gain;
  data.deltaY = sign * Math.min(perTick, 168);

  return true;
}

function attachTicker() {
  if (tickerAttached) return;
  lagSmoothingBackup = [500, 33];
  gsap.ticker.lagSmoothing(0);
  /* Run before ScrollTrigger's ticker listener so ST sees this frame's scroll once. */
  gsap.ticker.add(onTicker, false, true);
  tickerAttached = true;
}

function detachTicker() {
  if (!tickerAttached) return;
  gsap.ticker.remove(onTicker);
  if (lagSmoothingBackup) {
    gsap.ticker.lagSmoothing(lagSmoothingBackup[0], lagSmoothingBackup[1]);
    lagSmoothingBackup = null;
  }
  tickerAttached = false;
}

function createLenis() {
  if (lenis) return lenis;

  resetWheelState();

  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.078,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
    wheelMultiplier: 1,
    anchors: false,
    virtualScroll: acceptVirtualScroll,
  });

  attachTicker();
  return lenis;
}

function destroyLenis() {
  if (!lenis) return;
  detachTicker();
  lenis.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export function acquireSmoothScroll() {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion() || !isDesktopPointer()) {
    destroyLenis();
    refCount = 0;
    return null;
  }

  refCount += 1;
  return createLenis();
}

export function releaseSmoothScroll() {
  refCount = Math.max(0, refCount - 1);
  if (refCount === 0) destroyLenis();
}

export function setSmoothScrollLocked(locked: boolean) {
  if (!lenis) return;
  stopCoast();
  if (locked) lenis.stop();
  else lenis.start();
}

export function scrollAppTo(
  target: number | string | HTMLElement,
  options?: { immediate?: boolean },
) {
  if (typeof window === "undefined") return;

  if (lenis) {
    stopCoast();
    lenis.scrollTo(target, {
      immediate: Boolean(options?.immediate),
      duration: options?.immediate ? 0 : 0.78,
      easing: programmaticEase,
      lerp: undefined,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({
      top: target,
      behavior: options?.immediate ? "auto" : "smooth",
    });
    return;
  }

  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({
    behavior: options?.immediate ? "auto" : "smooth",
    block: "start",
  });
}

export function scrollAppToTop(options?: { immediate?: boolean }) {
  scrollAppTo(0, { immediate: options?.immediate ?? true });
  if (typeof window === "undefined") return;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: options?.immediate === false ? "smooth" : "auto",
  });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
