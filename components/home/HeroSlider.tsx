"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SLIDER_IMAGES } from "@/lib/home-assets";

const images = SLIDER_IMAGES;
const CYCLE_SIZE = images.length;
const REPEAT_CYCLES = 4;
const ANCHOR_INDEX = CYCLE_SIZE * (REPEAT_CYCLES / 2);
const SLIDE_DURATION = 36;

const SCALE_MAX = 1;
const SCALE_MIN = 0.7;

const cards = Array.from({ length: CYCLE_SIZE * REPEAT_CYCLES }, (_, i) => ({
  src: images[i % images.length],
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

function computeScale(cardCenterX: number, viewportRect: DOMRect) {
  const progress = gsap.utils.clamp(
    0,
    1,
    (viewportRect.right - cardCenterX) / viewportRect.width,
  );
  return gsap.utils.interpolate(SCALE_MAX, SCALE_MIN, progress);
}

export default function HeroSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let cycleWidth = 0;
    let anchorCenter = 0;
    let scrollOffset = 0;
    let tween: gsap.core.Tween | null = null;
    let resizeRaf = 0;

    const wrapOffset = (value: number) => {
      if (!cycleWidth) return 0;
      return gsap.utils.wrap(0, cycleWidth, value);
    };

    const updateCardScales = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const cardEls = Array.from(track.children) as HTMLElement[];

      cardEls.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const scale = computeScale(cardCenterX, viewportRect);

        gsap.set(card, {
          scale,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      });
    };

    const render = () => {
      const viewportCenter = viewport.offsetWidth / 2;
      const trackX = viewportCenter - anchorCenter - scrollOffset;
      gsap.set(track, { x: trackX });
      updateCardScales();
    };

    const startMarquee = (initialOffset = 0) => {
      tween?.kill();
      if (!cycleWidth) return;

      scrollOffset = wrapOffset(initialOffset);
      render();

      const state = { offset: scrollOffset };

      tween = gsap.to(state, {
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

    measure(false);

    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => measure(true));
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(viewport);
    observer.observe(track);

    return () => {
      tween?.kill();
      observer.disconnect();
      cancelAnimationFrame(resizeRaf);
    };
  }, []);

  return (
    <section
      data-hero-slider
      className="slanted-wrapper relative z-[1] -mt-[140px] md:-mt-[200px] lg:-mt-[240px] xl:-mt-[260px]"
    >
      <div ref={viewportRef} className="slanted-viewport">
        <div ref={trackRef} className="slanted-track">
          {cards.map((card, i) => (
            <div key={i} className="slanted-card">
              <img src={card.src} alt="" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
