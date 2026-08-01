"use client";

import "./TechServices.css";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { PORTFOLIO_IMAGES } from "@/lib/home-assets";
import homeContent from "@/data/home-content.json";

const categories = homeContent.techServices.categories;

const portfolioImages = PORTFOLIO_IMAGES;

const CYCLE_SIZE = portfolioImages.length;
const REPEAT_CYCLES = 4;
const ANCHOR_INDEX = CYCLE_SIZE * (REPEAT_CYCLES / 2);
const SLIDE_DURATION = 36;
const MARQUEE_DURATION = 32;
const MARQUEE_COPIES = 2;
const VISIBLE_COUNT = 5;
const HOVER_DURATION = 0.72;
const HOVER_EASE = [0.19, 1, 0.22, 1] as const;

type CardSizes = {
  width: number;
  hoverWidth: number;
  height: number;
  hoverHeight: number;
  gap: number;
  viewportMinExtra: number;
};

function getCardSizes(viewportWidth: number): CardSizes {
  const vw = Math.max(viewportWidth || 0, 320);
  const gap = vw <= 640 ? 10 : vw <= 1024 ? 12 : 16;
  const width = Math.max(
    80,
    Math.floor((vw - gap * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT),
  );
  const hoverScale = vw < 1024 ? 1.35 : vw < 1280 ? 1.5 : 1.9;
  const hoverWidth = Math.min(
    Math.round(width * hoverScale),
    Math.floor(vw * 0.42),
  );
  const height =
    vw <= 640
      ? Math.round(width * 1.5)
      : vw <= 1024
        ? Math.round(width * 1.35)
        : Math.round(width * 1.22);
  const hoverHeight = Math.round(height * 1.18);

  return {
    width,
    hoverWidth,
    height,
    hoverHeight,
    gap,
    viewportMinExtra: vw >= 1024 ? 80 : vw >= 768 ? 40 : 24,
  };
}

/** SSR + first client paint must match — never read window during useState init. */
const SSR_VIEWPORT_WIDTH = 1440;

function useCardSizes(viewportRef: React.RefObject<HTMLDivElement | null>) {
  const [sizes, setSizes] = useState<CardSizes>(() =>
    getCardSizes(SSR_VIEWPORT_WIDTH),
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => {
      const width = viewport.offsetWidth || window.innerWidth;
      setSizes(getCardSizes(width));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [viewportRef]);

  return sizes;
}

function useBelowLg() {
  const [isBelowLg, setIsBelowLg] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsBelowLg(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isBelowLg;
}

const cards = Array.from({ length: CYCLE_SIZE * REPEAT_CYCLES }, (_, i) => ({
  src: portfolioImages[i % portfolioImages.length],
}));

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
  isHovered,
  onEnter,
  onLeave,
  sizes,
}: {
  src: string;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  sizes: CardSizes;
}) {
  const width = isHovered ? sizes.hoverWidth : sizes.width;
  const height = isHovered ? sizes.hoverHeight : sizes.height;

  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      initial={false}
      animate={{
        width,
        height,
        scale: isHovered ? 1.03 : 1,
      }}
      transition={{
        width: { duration: HOVER_DURATION, ease: HOVER_EASE },
        height: { duration: HOVER_DURATION, ease: HOVER_EASE },
        scale: { duration: HOVER_DURATION * 0.85, ease: HOVER_EASE },
      }}
      className="tech-services-card"
      style={{
        width,
        height,
        zIndex: isHovered ? 30 : 1,
        transformOrigin: "center center",
      }}
    >
      <img src={src} alt="" draggable={false} />
    </motion.div>
  );
}

function PortfolioSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const hoveredRef = useRef(false);
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const sizes = useCardSizes(viewportRef);
  const isBelowLg = useBelowLg();

  useLayoutEffect(() => {
    setReady(true);
  }, []);

  const activeHeight =
    hoveredKey !== null ? sizes.hoverHeight : sizes.height;

  const viewportMinHeight = isBelowLg
    ? "auto"
    : activeHeight + sizes.viewportMinExtra;

  const pauseSlide = useCallback(() => {
    tweenRef.current?.pause();
  }, []);

  const resumeSlide = useCallback(() => {
    tweenRef.current?.resume();
  }, []);

  const handleEnter = useCallback(
    (index: number) => {
      hoveredRef.current = true;
      setHoveredKey(index);
      pauseSlide();
    },
    [pauseSlide],
  );

  const handleLeave = useCallback(() => {
    hoveredRef.current = false;
    setHoveredKey(null);
    resumeSlide();
  }, [resumeSlide]);

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
      if (hoveredRef.current) return;

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

    measure(false);

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
      cancelAnimationFrame(resizeRaf);
    };
  }, [sizes]);

  return (
    <div className="tech-services-slider">
      <motion.div
        ref={viewportRef}
        className="tech-services-viewport"
        initial={false}
        style={ready ? undefined : { minHeight: viewportMinHeight }}
        animate={ready ? { minHeight: viewportMinHeight } : false}
        transition={{
          duration: HOVER_DURATION,
          ease: HOVER_EASE,
        }}
      >
        <div
          ref={trackRef}
          className="tech-services-track"
          style={{ gap: sizes.gap }}
        >
          {cards.map((card, i) => (
            <PortfolioCard
              key={i}
              src={card.src}
              isHovered={hoveredKey === i}
              onEnter={() => handleEnter(i)}
              onLeave={handleLeave}
              sizes={sizes}
            />
          ))}
        </div>
      </motion.div>
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
