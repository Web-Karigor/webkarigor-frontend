"use client";

import "./Team.css";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

const {
  mobileTitle,
  mobileSubtitle,
  desktopExpertLines,
  desktopResultLines,
  members: TEAM_MEMBERS,
} = homeContent.team;

type TeamMember = (typeof TEAM_MEMBERS)[number];

type TeamCardSizes = {
  width: number;
  height: number;
  gap: number;
  radius: number;
};

const LOOP_COPIES = 3;
const SLIDE_DURATION = 36;

/** Card size = Figma 433 × 448. */
function getTeamCardSizes(viewportWidth: number): TeamCardSizes {
  const width = 433;
  const height = 448;

  if (viewportWidth < 640) {
    return { width, height, gap: 14, radius: 22 };
  }
  if (viewportWidth < 1024) {
    return { width, height, gap: 16, radius: 24 };
  }
  if (viewportWidth < 1280) {
    return { width, height, gap: 20, radius: 28 };
  }
  return { width, height, gap: 24, radius: 32 };
}

/** SSR + first client paint must match — never read window during useState init. */
const SSR_VIEWPORT_WIDTH = 1440;

function useTeamCardSizes() {
  const [sizes, setSizes] = useState<TeamCardSizes>(() =>
    getTeamCardSizes(SSR_VIEWPORT_WIDTH),
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
  member,
  isHovered,
  onEnter,
  onLeave,
  sizes,
}: {
  member: TeamMember;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  sizes: TeamCardSizes;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      className="relative flex-shrink-0 overflow-hidden border border-[#EFEFEF] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] outline-none"
      style={{
        width: sizes.width,
        height: sizes.height,
        borderRadius: sizes.radius,
      }}
      aria-label={`${member.name}, ${member.designation}`}
    >
      <img
        src={member.src}
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] overflow-hidden px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <motion.p
          className="relative m-0 font-montserrat text-[clamp(0.9375rem,1.4vw,1.125rem)] font-semibold leading-tight text-white"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -32,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {member.name}
        </motion.p>
        <motion.p
          className="relative m-0 mt-0.5 font-montserrat text-[clamp(0.75rem,1.1vw,0.875rem)] font-medium leading-tight text-white/85"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 32,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: isHovered ? 0.06 : 0,
          }}
        >
          {member.designation}
        </motion.p>
      </div>
    </div>
  );
}

/** Seamless infinite auto-marquee (pauses on hover). */
function InfiniteSlideRow({
  members,
  direction,
  sizes,
}: {
  members: readonly TeamMember[];
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
      if (setWidth < 1) return;

      gsap.set(track, { x: direction === "left" ? -setWidth : 0 });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.to(track, {
        x: direction === "right" ? -setWidth : 0,
        duration: SLIDE_DURATION,
      });

      timelineRef.current = tl;
      if (hoveredRef.current) tl.pause();
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
  }, [direction, sizes.gap, sizes.width, members]);

  return (
    <div className="team-infinite-scroll min-w-0 flex-1 overflow-hidden">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: LOOP_COPIES }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex flex-shrink-0"
            style={{ gap: sizes.gap, marginRight: sizes.gap }}
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {members.map((member, imageIndex) => {
              const cardKey = `${copyIndex}-${imageIndex}-${member.src}`;
              return (
                <TeamCard
                  key={cardKey}
                  member={member}
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

const upperMembers = TEAM_MEMBERS;
const lowerMembers = [...TEAM_MEMBERS].reverse();

export default function Team() {
  const sizes = useTeamCardSizes();

  return (
    <section className="overflow-hidden bg-[#FEFCF6] py-12 sm:py-16 md:py-24">
      <div className="team-section-inner mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-center lg:hidden">
          <h2 className="team-heading-mobile font-black text-[#141414]">
            {mobileTitle}
          </h2>
          <p className="team-heading-mobile font-extrabold text-[#A0A4AA]">
            {mobileSubtitle}
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-12 sm:gap-6 lg:gap-10">
          <InfiniteSlideRow
            members={upperMembers}
            direction="left"
            sizes={sizes}
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden flex-shrink-0 lg:block"
          >
            <div className="team-heading-desktop-expert text-right">
              <div>{desktopExpertLines[0]}</div>
              <div>{desktopExpertLines[1]}</div>
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
            <div className="team-heading-desktop-result">
              <div>{desktopResultLines[0]}</div>
              <div>{desktopResultLines[1]}</div>
            </div>
          </motion.div>

          <InfiniteSlideRow
            members={lowerMembers}
            direction="right"
            sizes={sizes}
          />
        </div>
      </div>
    </section>
  );
}
