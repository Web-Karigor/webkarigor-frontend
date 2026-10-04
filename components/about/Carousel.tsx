"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import CarouselCard from "./CarouselCard";

type CarouselProps = {
  images: readonly string[];
};

const GAP = 16;
const SPEED_PX_PER_SEC = 44;
const LOOP_COPIES = 3;

function getVisibleCount(width: number): number {
  if (width < 768) return 2;
  if (width < 1024) return 4;
  if (width <= 1440) return 5;
  return 7;
}

function getCardWidth(viewportWidth: number, visibleCount: number): number {
  if (viewportWidth <= 0) return 180;
  const totalGap = GAP * (visibleCount - 1);
  return Math.max(120, (viewportWidth - totalGap) / visibleCount);
}

export default function Carousel({ images }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const x = useMotionValue(0);

  const compact = viewportWidth > 0 && viewportWidth < 768;
  const visibleCount = getVisibleCount(viewportWidth);
  const cardWidth = getCardWidth(viewportWidth, visibleCount);
  const cardHeight = compact
    ? Math.round(cardWidth * (460 / 320))
    : 460;
  const stride = cardWidth + GAP;
  const cycleWidth = images.length * stride;

  const slides = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        images.map((src, itemIndex) => ({
          src,
          key: `${copy}-${itemIndex}-${src}`,
          index: copy * images.length + itemIndex,
        }))
      ).flat(),
    [images]
  );

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setViewportWidth(el.clientWidth);
  }, []);

  useEffect(() => {
    measure();
    const el = viewportRef.current;
    if (!el) return;

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (cycleWidth <= 0 || viewportWidth <= 0) return;
    // Start from the left edge (not centered)
    x.set(0);
  }, [cycleWidth, viewportWidth, x]);

  useAnimationFrame((_, delta) => {
    if (cycleWidth <= 0) return;

    let next = x.get() - (SPEED_PX_PER_SEC * delta) / 1000;

    while (next <= -cycleWidth) {
      next += cycleWidth;
    }

    x.set(next);
  });

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden"
      style={{
        ["--about-card-w" as string]: `${cardWidth}px`,
        height: cardHeight,
      }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 flex items-center gap-4 will-change-transform"
        style={{ x }}
      >
        {viewportWidth > 0 &&
          slides.map((slide) => (
            <CarouselCard
              key={slide.key}
              src={slide.src}
              index={slide.index}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              gap={GAP}
              viewportWidth={viewportWidth}
              compact={compact}
              x={x}
            />
          ))}
      </motion.div>
    </div>
  );
}
