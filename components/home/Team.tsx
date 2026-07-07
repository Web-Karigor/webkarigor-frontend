"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { TEAM_IMAGES } from "@/lib/home-assets";

const LOOP_COPIES = 3;
const SLIDE_DURATION = 32;

type TeamCardSizes = {
  width: number;
  hoverWidth: number;
  height: number;
  gap: number;
  radius: number;
};

function getTeamCardSizes(viewportWidth: number): TeamCardSizes {
  if (viewportWidth < 375) {
    return { width: 180, hoverWidth: 240, height: 300, gap: 12, radius: 20 };
  }
  if (viewportWidth < 640) {
    return { width: 200, hoverWidth: 280, height: 320, gap: 14, radius: 22 };
  }
  if (viewportWidth < 1024) {
    return { width: 220, hoverWidth: 320, height: 360, gap: 16, radius: 24 };
  }
  if (viewportWidth < 1280) {
    return { width: 240, hoverWidth: 360, height: 390, gap: 20, radius: 28 };
  }
  return { width: 279, hoverWidth: 421, height: 439, gap: 24, radius: 32 };
}

function useTeamCardSizes() {
  const [sizes, setSizes] = useState<TeamCardSizes>(() =>
    getTeamCardSizes(typeof window !== "undefined" ? window.innerWidth : 1440),
  );

  useLayoutEffect(() => {
    const update = () => setSizes(getTeamCardSizes(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return sizes;
}

function TeamCard({
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
  sizes: TeamCardSizes;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      animate={{
        width: isHovered ? sizes.hoverWidth : sizes.width,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.85,
      }}
      className="relative flex-shrink-0 overflow-hidden border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      style={{ height: sizes.height, borderRadius: sizes.radius }}
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
        className="pointer-events-none absolute inset-0 ring-2 ring-[#3B82F6]"
        style={{ borderRadius: sizes.radius }}
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
  sizes,
}: {
  images: readonly string[];
  direction: "left" | "right";
  sizes: TeamCardSizes;
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

      const setWidth = set.offsetWidth + sizes.gap;
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
  }, [direction, sizes.gap]);

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: LOOP_COPIES }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex flex-shrink-0"
            style={{ gap: sizes.gap, marginRight: sizes.gap }}
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
                  sizes={sizes}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const upperImages = TEAM_IMAGES;
const lowerImages = [...TEAM_IMAGES].reverse();

export default function Team() {
  const sizes = useTeamCardSizes();

  return (
    <section className="overflow-hidden bg-[#FEFCF6] py-12 sm:py-16 md:py-24">
      <div className="team-section-inner mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-center lg:hidden">
          <h2 className="team-heading-mobile font-black text-[#141414]">Expert Team</h2>
          <p className="team-heading-mobile font-extrabold text-[#A0A4AA]">Big Result</p>
        </div>

        <div className="mb-8 sm:mb-12 flex items-center justify-between gap-4 sm:gap-6 lg:gap-10">
          <InfiniteSlideRow images={upperImages} direction="left" sizes={sizes} />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden flex-shrink-0 lg:block"
          >
            <div className="space-y-12 xl:space-y-20 text-right leading-[0.9]">
              <div className="team-heading-desktop font-black text-[#141414]">Expert</div>
              <div className="team-heading-desktop font-black text-[#141414]">Team</div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden flex-shrink-0 lg:block"
          >
            <div className="space-y-12 xl:space-y-20 leading-[0.9]">
              <div className="team-heading-desktop font-extrabold text-[#A0A4AA]">Big</div>
              <div className="team-heading-desktop font-extrabold text-[#A0A4AA]">
                Result
              </div>
            </div>
          </motion.div>

          <InfiniteSlideRow images={lowerImages} direction="right" sizes={sizes} />
        </div>
      </div>
    </section>
  );
}
