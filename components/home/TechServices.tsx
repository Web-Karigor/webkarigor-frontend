"use client";

import "./TechServices.css";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PORTFOLIO_IMAGES } from "@/lib/home-assets";
import homeContent from "@/data/home-content.json";

const categories = homeContent.techServices.categories;

const portfolioImages = PORTFOLIO_IMAGES;

/**
 * Max card sizes (user uploads images at these dimensions):
 *   desktop → 515×448
 *   mobile  → 202×376
 *   large   → 515×584
 * Pattern: desktop | mobile | large | mobile | desktop | …
 */
const DESKTOP_SIZE = { width: 515, height: 448 } as const;
const MOBILE_SIZE = { width: 202, height: 376 } as const;
const LARGE_SIZE = { width: 515, height: 584 } as const;
const SIZE_PATTERN = [
  DESKTOP_SIZE,
  MOBILE_SIZE,
  LARGE_SIZE,
  MOBILE_SIZE,
  DESKTOP_SIZE,
] as const;

/** Per-image size in one seamless cycle (length === portfolioImages.length). */
const CYCLE_SIZES = portfolioImages.map(
  (_, i) => SIZE_PATTERN[i % SIZE_PATTERN.length],
);

const CYCLE_SIZE = portfolioImages.length;
const REPEAT_CYCLES = 4;
const ANCHOR_INDEX = CYCLE_SIZE * (REPEAT_CYCLES / 2);
const SLIDE_DURATION = 40;
const MARQUEE_DURATION = 32;
const MARQUEE_COPIES = 2;
const BASE_GAP = 16;
const MAX_CARD_HEIGHT = LARGE_SIZE.height;
/** Design width of one full 5-card motif — used to pick a sensible scale. */
const PATTERN_WIDTH =
  SIZE_PATTERN.reduce((sum, s) => sum + s.width, 0) +
  (SIZE_PATTERN.length - 1) * BASE_GAP;

const cards = Array.from({ length: CYCLE_SIZE * REPEAT_CYCLES }, (_, i) => {
  const cycleIndex = i % CYCLE_SIZE;
  return {
    src: portfolioImages[cycleIndex],
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
      // Fit roughly one design motif; never upscale past 1.
      setScale(Math.min(1, available / PATTERN_WIDTH));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    return () => observer.disconnect();
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
      gsap.set(track, { x: -setWidth });

      tweenRef.current = gsap.to(track, {
        x: 0,
        duration: MARQUEE_DURATION,
        ease: "none",
        repeat: -1,
      });
    };

    buildMarquee();

    const observer = new ResizeObserver(buildMarquee);
    observer.observe(set);

    return () => {
      tweenRef.current?.kill();
      observer.disconnect();
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
            {categories.map((category, index) => (
              <li key={`${copyIndex}-${category}`} className="tech-services-nav-item">
                {index > 0 && (
                  <span className="tech-services-nav-dot" aria-hidden>
                    ·
                  </span>
                )}
                <span className="tech-services-nav-text">{category}</span>
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
      <img src={src} alt="" draggable={false} />
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

      tweenRef.current = gsap.to(state, {
        offset: scrollOffset + cycleWidth * 1_000_000,
        duration: SLIDE_DURATION * 1_000_000,
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

    return () => {
      tweenRef.current?.kill();
      observer.disconnect();
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
