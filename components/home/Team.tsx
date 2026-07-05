"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { TEAM_IMAGES } from "@/lib/home-assets";

const CARD_HEIGHT = 439;
const CARD_WIDTH = 279;
const CARD_HOVER_WIDTH = 421;
const GAP = 24;
const LOOP_COPIES = 3;
const SLIDE_DURATION = 32;

const upperImages = TEAM_IMAGES;
const lowerImages = [...TEAM_IMAGES].reverse();

function TeamCard({
  src,
  isHovered,
  onEnter,
  onLeave,
}: {
  src: string;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      animate={{
        width: isHovered ? CARD_HOVER_WIDTH : CARD_WIDTH,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.85,
      }}
      className="relative flex-shrink-0 overflow-hidden rounded-[32px] border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      style={{ height: CARD_HEIGHT }}
      aria-label="Team member"
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[32px] ring-2 ring-[#3B82F6]"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function InfiniteSlideRow({
  images,
  direction,
}: {
  images: readonly string[];
  direction: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hoveredRef = useRef(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const pauseSlide = useCallback(() => {
    timelineRef.current?.pause();
  }, []);

  const resumeSlide = useCallback(() => {
    timelineRef.current?.resume();
  }, []);

  const handleEnter = useCallback(
    (key: string) => {
      hoveredRef.current = true;
      setHoveredKey(key);
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
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const buildTimeline = () => {
      timelineRef.current?.kill();

      const setWidth = set.offsetWidth + GAP;
      gsap.set(track, { x: direction === "left" ? -setWidth : 0 });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(track, {
        x: direction === "right" ? -setWidth : 0,
        duration: SLIDE_DURATION,
      });

      timelineRef.current = tl;
    };

    buildTimeline();

    const observer = new ResizeObserver(() => {
      if (hoveredRef.current) return;
      buildTimeline();
    });

    observer.observe(set);

    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [direction]);

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: LOOP_COPIES }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex flex-shrink-0"
            style={{ gap: GAP, marginRight: GAP }}
          >
            {images.map((src, imageIndex) => {
              const cardKey = `${copyIndex}-${imageIndex}-${src}`;
              return (
                <TeamCard
                  key={cardKey}
                  src={src}
                  isHovered={hoveredKey === cardKey}
                  onEnter={() => handleEnter(cardKey)}
                  onLeave={handleLeave}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="overflow-hidden bg-[#FEFCF6] py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <div className="mb-10 text-center lg:hidden">
          <h2 className="text-4xl font-black text-[#141414]">Expert Team</h2>
          <p className="text-4xl font-extrabold text-[#A0A4AA]">Big Result</p>
        </div>

        <div className="mb-12 flex items-center justify-between gap-6 lg:gap-10">
          <InfiniteSlideRow images={upperImages} direction="left" />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden flex-shrink-0 lg:block"
          >
            <div className="space-y-20 text-right leading-[0.9]">
              <div className="text-[92px] font-black text-[#141414]">Expert</div>
              <div className="text-[92px] font-black text-[#141414]">Team</div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden flex-shrink-0 lg:block"
          >
            <div className="space-y-20 leading-[0.9]">
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">Big</div>
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">
                Result
              </div>
            </div>
          </motion.div>

          <InfiniteSlideRow images={lowerImages} direction="right" />
        </div>
      </div>
    </section>
  );
}
