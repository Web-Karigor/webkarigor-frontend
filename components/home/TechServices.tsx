"use client";

import "./TechServices.css";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

const categories = homeContent.techServices.categories;
const portfolioItems = homeContent.techServices.portfolioImages;

/**
 * Max card sizes (user uploads images at these dimensions):
 *   web     → 515×448
 *   mobile  → 202×376
 *   tab     → 515×584
 */
const DESKTOP_SIZE = { width: 515, height: 448 } as const;
const MOBILE_SIZE = { width: 202, height: 376 } as const;
const LARGE_SIZE = { width: 515, height: 584 } as const;

const VARIANT_SIZES = {
  web: DESKTOP_SIZE,
  mobile: MOBILE_SIZE,
  tab: LARGE_SIZE,
} as const;

/** Desktop viewport shows ~5 cards; edge tab cards clip slightly (overflow hidden). */
const VISIBLE_MOTIF = [
  LARGE_SIZE,
  MOBILE_SIZE,
  DESKTOP_SIZE,
  MOBILE_SIZE,
  LARGE_SIZE,
] as const;

/** Scale from center 3 so outer tab/mobile cards overflow and clip at edges. */
const DESKTOP_SCALE_MOTIF = [
  MOBILE_SIZE,
  DESKTOP_SIZE,
  MOBILE_SIZE,
] as const;

const portfolioImages = portfolioItems.map((item) => ({
  src: item.src,
  size: VARIANT_SIZES[item.variant as keyof typeof VARIANT_SIZES],
}));

/** Per-image size in one seamless cycle (length === portfolioImages.length). */
const CYCLE_SIZES = portfolioImages.map((item) => item.size);

const CYCLE_SIZE = portfolioImages.length;
const REPEAT_CYCLES = 4;
const ANCHOR_INDEX = CYCLE_SIZE * (REPEAT_CYCLES / 2);
/** Shared linear speed so text marquee + image strip stay in sync. */
const SCROLL_SPEED_PX_PER_SEC = 72;
/** Slower on mobile so the strip is easier to follow. */
const SCROLL_SPEED_MOBILE_PX_PER_SEC = 40;
const MARQUEE_COPIES = 2;
const BASE_GAP = 28;
const MAX_CARD_HEIGHT = LARGE_SIZE.height;
const MOBILE_BREAKPOINT = 768;
const MOBILE_VISIBLE_CARDS = 3;

function getScrollSpeedPxPerSec() {
  if (typeof window === "undefined") return SCROLL_SPEED_PX_PER_SEC;
  return window.innerWidth < MOBILE_BREAKPOINT
    ? SCROLL_SPEED_MOBILE_PX_PER_SEC
    : SCROLL_SPEED_PX_PER_SEC;
}
/** Fit center 3 on desktop → ~5 visible with edge tabs slightly clipped. */
const PATTERN_WIDTH =
  DESKTOP_SCALE_MOTIF.reduce((sum, size) => sum + size.width, 0) +
  (DESKTOP_SCALE_MOTIF.length - 1) * BASE_GAP;
/** Width of first 3 cards in the motif — mobile shows ~3 at a time. */
const MOBILE_THREE_CARD_WIDTH =
  VISIBLE_MOTIF.slice(0, MOBILE_VISIBLE_CARDS).reduce(
    (sum, size) => sum + size.width,
    0,
  ) +
  (MOBILE_VISIBLE_CARDS - 1) * BASE_GAP;

const cards = Array.from({ length: CYCLE_SIZE * REPEAT_CYCLES }, (_, i) => {
  const cycleIndex = i % CYCLE_SIZE;
  return {
    src: portfolioImages[cycleIndex].src,
    size: CYCLE_SIZES[cycleIndex],
  };
});

function getSeamlessCycleWidth(track: HTMLElement) {
  const children = Array.from(track.children) as HTMLElement[];
  if (children.length <= CYCLE_SIZE) return 0;
  return children[CYCLE_SIZE].offsetLeft - children[0].offsetLeft;
}

function getCardCenter(track: HTMLElement, index: number) {
  const card = track.children[index] as HTMLElement | undefined;
  if (!card) return 0;
  return card.offsetLeft + card.offsetWidth / 2;
}

function useTrackScale(viewportRef: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      const available = viewport.clientWidth;
      if (available <= 0) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const motifWidth = isMobile ? MOBILE_THREE_CARD_WIDTH : PATTERN_WIDTH;
      // Fit motif to viewport; never upscale past 1.
      setScale(Math.min(1, available / motifWidth));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [viewportRef]);

  return scale;
}

function CategoryMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const buildMarquee = () => {
      tweenRef.current?.kill();
      const setWidth = set.offsetWidth;
      if (setWidth <= 0) return;

      const duration = Math.max(setWidth / getScrollSpeedPxPerSec(), 1);
      gsap.set(track, { x: -setWidth });

      tweenRef.current = gsap.to(track, {
        x: 0,
        duration,
        ease: "none",
        repeat: -1,
      });
    };

    buildMarquee();

    const observer = new ResizeObserver(buildMarquee);
    observer.observe(set);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        const tween = tweenRef.current;
        if (!tween) return;
        if (entry?.isIntersecting) tween.resume();
        else tween.pause();
      },
      { rootMargin: "120px 0px" },
    );
    visibility.observe(track);

    return () => {
      tweenRef.current?.kill();
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div className="tech-services-nav">
      <div ref={trackRef} className="tech-services-nav-track">
        {Array.from({ length: MARQUEE_COPIES }).map((_, copyIndex) => (
          <ul
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="tech-services-nav-list"
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {categories.map((category) => (
              <li key={`${copyIndex}-${category}`} className="tech-services-nav-item">
                <span className="tech-services-nav-text">{category}</span>
                <span className="tech-services-nav-dot" aria-hidden>
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function PortfolioCard({
  src,
  size,
  scale,
}: {
  src: string;
  size: { width: number; height: number };
  scale: number;
}) {
  return (
    <div
      className="tech-services-card"
      style={{
        width: size.width * scale,
        height: size.height * scale,
      }}
    >
      <div className="tech-services-card-mid">
        <div className="tech-services-card-frame">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 202px, 515px"
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

function PortfolioSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scale = useTrackScale(viewportRef);
  const gap = BASE_GAP * scale;
  const viewportHeight = MAX_CARD_HEIGHT * scale;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let cycleWidth = 0;
    let anchorCenter = 0;
    let scrollOffset = 0;
    let resizeRaf = 0;

    const wrapOffset = (value: number) => {
      if (!cycleWidth) return 0;
      return gsap.utils.wrap(0, cycleWidth, value);
    };

    const render = () => {
      const viewportCenter = viewport.offsetWidth / 2;
      const trackX = viewportCenter - anchorCenter - scrollOffset;
      gsap.set(track, { x: trackX });
    };

    const startMarquee = (initialOffset = 0) => {
      tweenRef.current?.kill();
      if (!cycleWidth) return;

      scrollOffset = wrapOffset(initialOffset);
      render();

      const state = { offset: scrollOffset };
      const durationPerCycle = Math.max(
        cycleWidth / getScrollSpeedPxPerSec(),
        1,
      );

      tweenRef.current = gsap.to(state, {
        offset: scrollOffset + cycleWidth * 1_000_000,
        duration: durationPerCycle * 1_000_000,
        ease: "none",
        modifiers: {
          offset: (value) => String(wrapOffset(parseFloat(value))),
        },
        onUpdate: () => {
          scrollOffset = parseFloat(String(state.offset));
          render();
        },
      });
    };

    const measure = (preservePosition = true) => {
      const prevCycleWidth = cycleWidth;
      const ratio =
        prevCycleWidth > 0 && preservePosition ? scrollOffset / prevCycleWidth : 0;

      cycleWidth = getSeamlessCycleWidth(track);
      anchorCenter = getCardCenter(track, ANCHOR_INDEX);

      const nextOffset =
        preservePosition && prevCycleWidth > 0 && cycleWidth > 0
          ? ratio * cycleWidth
          : 0;

      startMarquee(nextOffset);
    };

    // Wait a frame so scaled widths are laid out before measuring.
    const kickoff = requestAnimationFrame(() => measure(false));

    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => measure(true));
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(viewport);
    observer.observe(track);

    let inView = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        const next = Boolean(entry?.isIntersecting);
        if (next === inView) return;
        inView = next;
        if (inView) {
          startMarquee(scrollOffset);
        } else {
          tweenRef.current?.pause();
        }
      },
      { rootMargin: "160px 0px" },
    );
    visibility.observe(viewport);

    return () => {
      tweenRef.current?.kill();
      observer.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(kickoff);
      cancelAnimationFrame(resizeRaf);
    };
  }, [scale]);

  return (
    <div className="tech-services-slider">
      <div
        ref={viewportRef}
        className="tech-services-viewport"
        style={{ height: viewportHeight }}
      >
        <div
          ref={trackRef}
          className="tech-services-track"
          style={{ gap }}
        >
          {cards.map((card, i) => (
            <PortfolioCard
              key={i}
              src={card.src}
              size={card.size}
              scale={scale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechServices() {
  return (
    <section className="tech-services relative z-[2]">
      <CategoryMarquee />
      <PortfolioSlider />
    </section>
  );
}
