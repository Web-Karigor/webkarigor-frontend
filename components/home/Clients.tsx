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
const CLIENTS_HEADING_SIZE = "clamp(24px, calc(2.1vw + 18px), 48px)";

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

  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    const wrap = wrapRef.current;
    if (!track || !set || !wrap) return;

    let lastWidth = 0;

    const buildTimeline = () => {
      const setWidth = set.scrollWidth || set.offsetWidth;
      if (setWidth < 1) return;
      if (Math.abs(setWidth - lastWidth) < 2 && timelineRef.current) return;
      lastWidth = setWidth;

      timelineRef.current?.kill();
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
    const retry = window.setTimeout(buildTimeline, 120);
    const onLoad = () => buildTimeline();
    window.addEventListener("load", onLoad);

    const observer = new ResizeObserver(buildTimeline);
    observer.observe(set);
    observer.observe(wrap);

    const visibility = new IntersectionObserver(([entry]) => {
      const timeline = timelineRef.current;
      if (!timeline) return;
      if (entry?.isIntersecting && !pausedRef.current) timeline.resume();
      else timeline.pause();
    });
    visibility.observe(wrap);

    return () => {
      window.clearTimeout(retry);
      window.removeEventListener("load", onLoad);
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
      ref={wrapRef}
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
            <div
              className="flex w-max flex-nowrap items-center justify-center gap-4"
              aria-label="Clients"
            >
              {items.map((client) => (
                <span
                  key={`${copyIndex}-${client.name}`}
                  className="group inline-flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/80"
                >
                  <Image
                    src={client.src}
                    alt={copyIndex === 0 ? client.name : ""}
                    width={56}
                    height={56}
                    unoptimized
                    className="h-full w-full max-w-none object-contain grayscale opacity-80 transition-[filter,opacity] duration-300 group-hover:grayscale-0 group-hover:opacity-100" loading="lazy"/>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Clients() {
  return (
    <section className="svc-clients relative px-4 py-16 sm:px-8 lg:px-10 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1750px] flex-col items-stretch gap-8 lg:gap-[60px]">
        <div
          className="flex w-full min-w-0 flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:gap-20 lg:text-left"
        >
          <h2
            className="section-heading flex shrink-0 flex-col items-center justify-start overflow-visible text-center lg:items-end lg:text-right"
            style={{ marginTop: "-0.75rem" }}
          >
            <span
              className="section-heading-split-accent section-accent-text !transform-none pr-1 leading-[1.15]"
              style={{ fontSize: CLIENTS_HEADING_SIZE }}
            >
              {title}
            </span>
            <span
              className="section-heading-split-title !transform-none mt-2 leading-[1.15]"
              style={{ fontSize: CLIENTS_HEADING_SIZE }}
            >
              {titleAccent}
            </span>
          </h2>
          <p className="m-0 w-full min-w-0 text-center font-montserrat text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.75] text-[#4b5563] lg:flex-1 lg:text-justify">
            {description}
          </p>
        </div>
        <div className="mx-auto w-full min-w-0 sm:w-[85%] lg:w-[70%]">
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
