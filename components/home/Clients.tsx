"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import homeContent from "@/data/home-content.json";
import { gsap } from "@/lib/gsap";

const { title, titleAccent, description, logos } = homeContent.clients;
const { backgroundWord } = homeContent.hero;

type ClientLogo = (typeof logos)[number];

const LOOP_COPIES = 3;
const SLIDE_DURATION = 32;

function InfiniteLogoRow({
  items,
  direction,
}: {
  items: readonly ClientLogo[];
  direction: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pausedRef = useRef(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const buildTimeline = () => {
      timelineRef.current?.kill();

      const setWidth = set.offsetWidth;
      if (setWidth < 1) return;

      gsap.set(track, { x: direction === "left" ? -setWidth : 0 });

      const timeline = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      timeline.to(track, {
        x: direction === "left" ? 0 : -setWidth,
        duration: SLIDE_DURATION,
      });

      timelineRef.current = timeline;
      if (pausedRef.current) timeline.pause();
    };

    buildTimeline();

    const observer = new ResizeObserver(buildTimeline);
    observer.observe(set);

    const visibility = new IntersectionObserver(([entry]) => {
      const timeline = timelineRef.current;
      if (!timeline) return;
      if (entry?.isIntersecting && !pausedRef.current) timeline.resume();
      else timeline.pause();
    });
    visibility.observe(track);

    return () => {
      observer.disconnect();
      visibility.disconnect();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [direction, items]);

  const pause = () => {
    pausedRef.current = true;
    timelineRef.current?.pause();
  };

  const resume = () => {
    pausedRef.current = false;
    timelineRef.current?.resume();
  };

  return (
    <div
      className="min-w-0 overflow-hidden py-1"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      aria-label="Client logos"
    >
      <div ref={trackRef} className="flex will-change-transform">
        {Array.from({ length: LOOP_COPIES }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? setRef : undefined}
            className="flex shrink-0 gap-3 pr-3 sm:gap-5 sm:pr-5 lg:gap-6 lg:pr-6"
            aria-hidden={copyIndex > 0 ? true : undefined}
          >
            {items.map((client) => (
              <div
                key={`${copyIndex}-${client.name}`}
                className="flex items-center justify-center"
              >
                <Image
                  src={client.src}
                  alt={copyIndex === 0 ? client.name : ""}
                  width={160}
                  height={160}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Clients() {
  return (
    <section className="svc-clients bg-[#f8fafc] px-4 py-16 sm:px-8 lg:px-10 lg:py-[100px] relative">
      <div className="mx-auto flex w-full max-w-[1208px] flex-col items-center gap-8 lg:gap-[60px]">
        <div className= "flex w-full flex-row items-center gap-4 lg:gap-6">
          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              {title}
            </span>
            <span className="section-heading-split-title">{titleAccent}</span>
          </h2>
          <p className="m-0 w-[70%] max-w-[1208px] text-justify font-montserrat text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.75] text-[#4b5563]">
            {description}
          </p>
        </div>
        <div className="w-[70%] space-y-3 sm:space-y-5 lg:space-y-6">
          <InfiniteLogoRow items={logos} direction="left" />
        </div>
      </div>
      <div className="hero-projects-wrap pointer-events-none absolute inset-x-0 bottom-0 z-[1] pb-50">
        <p className="hero-projects-text translate-y-[calc(54%+30px)] text-center font-bold leading-[0.9] text-[#1F1E1C] opacity-[0.02] md:translate-y-[56%] 2xl:translate-y-[64%]">
          {backgroundWord}
        </p>
      </div>
    </section>
  );
}
