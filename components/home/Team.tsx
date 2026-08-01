"use client";

import "./Team.css";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

      {/* Name + designation — absolute bottom overlay */}
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

function ManualScrollRow({
  members,
  sizes,
}: {
  members: readonly TeamMember[];
  sizes: TeamCardSizes;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.scrollLeft - dx;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    dragRef.current.active = false;
    setIsDragging(false);
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="team-manual-scroll min-w-0 flex-1 cursor-grab overflow-x-auto overflow-y-hidden active:cursor-grabbing"
      style={{ touchAction: "pan-x" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className="flex w-max"
        style={{
          gap: sizes.gap,
          pointerEvents: isDragging ? "none" : "auto",
        }}
      >
        {members.map((member, imageIndex) => {
          const cardKey = `${imageIndex}-${member.src}`;
          return (
            <TeamCard
              key={cardKey}
              member={member}
              isHovered={hoveredKey === cardKey}
              onEnter={() => setHoveredKey(cardKey)}
              onLeave={() => setHoveredKey(null)}
              sizes={sizes}
            />
          );
        })}
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
          <ManualScrollRow members={upperMembers} sizes={sizes} />

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

          <ManualScrollRow members={lowerMembers} sizes={sizes} />
        </div>
      </div>
    </section>
  );
}
