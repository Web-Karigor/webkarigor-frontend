"use client";

import Image from "next/image";
import { memo } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

type CarouselCardProps = {
  src: string;
  index: number;
  cardWidth: number;
  gap: number;
  viewportWidth: number;
  x: MotionValue<number>;
  priority?: boolean;
};

const BASE_WIDTH = 320;
const BASE_HEIGHT = 460;

function interpolateWidth(distanceSlots: number): number {
  const d = Math.abs(distanceSlots);
  if (d <= 1) return 320;
  if (d <= 2) return 320 + (280 - 320) * (d - 1);
  if (d <= 3) return 280 + (240 - 280) * (d - 2);
  return 240;
}

function interpolateHeight(distanceSlots: number): number {
  const d = Math.abs(distanceSlots);
  if (d <= 0) return 460;
  if (d <= 1) return 460 + (420 - 460) * d;
  if (d <= 2) return 420 + (368 - 420) * (d - 1);
  if (d <= 3) return 368 + (315 - 368) * (d - 2);
  return 315;
}

function interpolateOpacity(distanceSlots: number): number {
  const d = Math.abs(distanceSlots);
  if (d <= 0) return 1;
  if (d <= 1) return 1 + (0.9 - 1) * d;
  if (d <= 2) return 0.9 + (0.8 - 0.9) * (d - 1);
  if (d <= 3) return 0.8 + (0.72 - 0.8) * (d - 2);
  return Math.max(0.65, 0.72 - (d - 3) * 0.04);
}

/** Extra breathing room next to the enlarged center card. */
function interpolateNeighborOffsetX(distanceSlots: number): number {
  const abs = Math.abs(distanceSlots);
  if (abs <= 0 || abs >= 2) return 0;

  const magnitude = abs <= 1 ? 20 * abs : 20 * (2 - abs);
  return distanceSlots < 0 ? -magnitude : magnitude;
}

function getDistanceSlots(
  latest: number,
  index: number,
  stride: number,
  cardWidth: number,
  viewportWidth: number
): number {
  const cardCenter = index * stride + cardWidth / 2 + latest;
  return (cardCenter - viewportWidth / 2) / stride;
}

function CarouselCard({
  src,
  index,
  cardWidth,
  gap,
  viewportWidth,
  x,
  priority = false,
}: CarouselCardProps) {
  const stride = cardWidth + gap;

  // GPU transforms only — no layout width/height animation (avoids jitter)
  const scaleX = useTransform(x, (latest) => {
    const d = getDistanceSlots(latest, index, stride, cardWidth, viewportWidth);
    return interpolateWidth(d) / BASE_WIDTH;
  });

  const scaleY = useTransform(x, (latest) => {
    const d = getDistanceSlots(latest, index, stride, cardWidth, viewportWidth);
    return interpolateHeight(d) / BASE_HEIGHT;
  });

  const opacity = useTransform(x, (latest) => {
    const d = getDistanceSlots(latest, index, stride, cardWidth, viewportWidth);
    return interpolateOpacity(d);
  });

  const zIndex = useTransform(x, (latest) => {
    const d = Math.abs(
      getDistanceSlots(latest, index, stride, cardWidth, viewportWidth)
    );
    return Math.round(Math.max(0, 20 - d * 4));
  });

  const offsetX = useTransform(x, (latest) => {
    const d = getDistanceSlots(latest, index, stride, cardWidth, viewportWidth);
    return interpolateNeighborOffsetX(d);
  });

  return (
    <div className="relative flex h-[460px] w-[var(--about-card-w)] shrink-0 items-center justify-center">
      <motion.div
        className="relative h-[460px] w-[320px] overflow-hidden rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] will-change-transform"
        style={{
          x: offsetX,
          scaleX,
          scaleY,
          opacity,
          zIndex,
          transformOrigin: "center center",
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          className="object-cover"
          sizes="320px"
        />
      </motion.div>
    </div>
  );
}

export default memo(CarouselCard);
