"use client";

import "./Services.css";

import { memo, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import homeContent from "@/data/home-content.json";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const {
  badge: servicesBadge,
  headingAccent: servicesHeadingAccent,
  headingTitle: servicesHeadingTitle,
  description: servicesDescription,
  items: services,
} = homeContent.services;

type Service = (typeof services)[number];

/** One viewport of scroll for intro header exit */
const INTRO_SCROLL_VIEWS = 1;

const DESKTOP_GROUP_STEP_PX = 680 + 160;
const LG_GROUP_STEP_PX = 520 + 100;

function getSlideHeightWithGap(el: HTMLElement | null) {
  if (!el) return 0;
  const marginBottom = Number.parseFloat(getComputedStyle(el).marginBottom) || 0;
  return el.offsetHeight + marginBottom;
}

function getGroupStepPx(width: number, mobileSlotHeight: number) {
  if (width >= 1280) return DESKTOP_GROUP_STEP_PX;
  if (width >= 1024) return LG_GROUP_STEP_PX;
  return Math.max(mobileSlotHeight, 280);
}

function computeSectionHeight(
  width: number,
  total: number,
  introViews: number,
  stepPx: number,
  viewportH: number,
) {
  if (width < 1024) {
    const introScroll = introViews * viewportH;
    return `${viewportH + introScroll + Math.max(total - 1, 0) * stepPx}px`;
  }
  return `${(total + introViews) * SCROLL_VH_PER_STEP * 100}vh`;
}

/** Frame-rate independent ease — silky follow, zero overshoot */
const SCROLL_SMOOTH = 7.2;
/** Extra scroll room per service = slower, more controlled scrub */
const SCROLL_VH_PER_STEP = 1.15;
/** Extra push on last mobile slide to trim visible bottom gap */
const MOBILE_END_TRIM_PX = 36;

/**
 * Hysteresis keeps active row stable while smoothed progress drifts near edges.
 */
function getActiveIndex(progress: number, total: number, prev: number) {
  if (total <= 1) return 0;
  const exact = progress * (total - 1);
  if (Math.abs(exact - prev) < 0.38) return prev;
  return Math.min(total - 1, Math.max(0, Math.round(exact)));
}

function useActiveIndex(progress: MotionValue<number>, total: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    setActiveIndex((prev) => {
      const next = getActiveIndex(latest, total, prev);
      return next === prev ? prev : next;
    });
  });

  return activeIndex;
}


const ServicesHeader = memo(function ServicesHeader() {
  return (
    <>
      <span className="inline-block rounded-full border border-[#38F8AB] px-6 py-2.5 text-[15px] font-medium text-[#15D286] sm:px-7 md:text-lg">
        {servicesBadge}
      </span>

      <h2 className="section-heading">
        <span className="section-heading-split-accent section-accent-text">
          {servicesHeadingAccent}
        </span>
        <span className="section-heading-split-title">{servicesHeadingTitle}</span>
      </h2>

      <p className="mx-auto mt-3 max-w-2xl px-2 text-sm text-gray-600 sm:mt-4 sm:text-base">
        {servicesDescription}
      </p>
    </>
  );
});

const ServicesIntroHeader = memo(function ServicesIntroHeader({
  introProgress,
}: {
  introProgress: MotionValue<number>;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => setHeaderHeight(header.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(header);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const headerY = useTransform(introProgress, [0, 1], ["0%", "-108%"]);
  const headerOpacity = useTransform(introProgress, [0, 0.72, 1], [1, 0.35, 0]);
  const wrapHeight = useTransform(introProgress, (p) => {
    if (!headerHeight) return "auto";
    return `${Math.max(0, headerHeight * (1 - p))}px`;
  });

  return (
    <motion.div
      className="services-story-header-wrap hidden shrink-0 overflow-hidden md:block"
      style={{ height: headerHeight ? wrapHeight : "auto", willChange: "height" }}
    >
      <motion.header
        ref={headerRef}
        className="services-story-header relative z-20 text-center"
        style={{
          y: headerY,
          opacity: headerOpacity,
          willChange: "transform, opacity",
        }}
      >
        <ServicesHeader />
      </motion.header>
    </motion.div>
  );
});

/* -------------------------------------------------------------------------- */
/* Left — sticky list; active row expands description                         */
/* -------------------------------------------------------------------------- */

const ServicesListPanel = memo(function ServicesListPanel({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="services-story-text-panel hidden w-full min-w-0 items-start font-montserrat lg:flex lg:h-full lg:items-center">
      <ul className="services-story-list w-full">
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          const fullTitle = [service.title, service.highlight]
            .filter(Boolean)
            .join(" ");

          return (
            <li
              key={`${index}-${service.link}`}
              className={`services-story-list-item${isActive ? " is-active" : ""}`}
            >
              <h3 className="services-story-list-title">{fullTitle}</h3>
              <p className="services-story-list-subtitle">{service.subtitle}</p>

              <div className="services-story-list-desc-wrap" aria-hidden={!isActive}>
                <div className="services-story-list-desc-inner">
                  <p className="services-story-list-desc">{service.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Right — scroll-driven image column                                         */
/* -------------------------------------------------------------------------- */

const ServiceImageGroup = memo(function ServiceImageGroup({
  service,
  index,
  progress,
  total,
  eager,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  total: number;
  eager?: boolean;
}) {
  const focus = useTransform(progress, (p) => {
    const pos = p * (total - 1);
    return Math.max(0, 1 - Math.abs(pos - index));
  });
  // Soft ease — never fully disappears, gentle scale
  const scale = useTransform(focus, [0, 1], [0.97, 1]);
  const opacity = useTransform(focus, [0, 0.35, 1], [0.4, 0.72, 1]);

  return (
    <motion.div
      className="services-story-image-group"
      style={{ scale, opacity }}
    >
      <div className="services-story-img services-story-img--primary">
        <Image
          src={service.images[0]}
          alt={`${service.title} preview`}
          fill
          sizes="(max-width: 1023px) 100vw, 420px"
          className="object-cover object-top"
          priority={eager}
          unoptimized
        />
      </div>
      <div className="services-story-img services-story-img--secondary">
        <Image
          src={service.images[1]}
          alt={`${service.title} detail`}
          fill
          sizes="(max-width: 1023px) 100vw, 360px"
          className="object-cover object-top"
          unoptimized
        />
      </div>
    </motion.div>
  );
});

const ServicesImageTrack = memo(function ServicesImageTrack({
  columnY,
  progress,
  viewportRef,
  slotHeight,
}: {
  columnY: MotionValue<number>;
  progress: MotionValue<number>;
  viewportRef: React.Ref<HTMLDivElement>;
  slotHeight: number;
}) {
  const total = services.length;

  return (
    <div
      ref={viewportRef}
      className="services-story-images-viewport relative hidden min-h-0 w-full flex-1 overflow-hidden lg:block lg:h-full lg:w-[var(--services-layout-w)] lg:max-w-[var(--services-layout-w)] lg:flex-none"
      style={
        {
          "--services-slot-h": `${slotHeight}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="services-story-track"
        style={{ y: columnY, willChange: "transform" }}
      >
        {services.map((service, index) => (
          <ServiceImageGroup
            key={`${index}-${service.link}`}
            service={service}
            index={index}
            progress={progress}
            total={total}
            eager={index === 0}
          />
        ))}
      </motion.div>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Mobile — image + text paired per scroll step                               */
/* -------------------------------------------------------------------------- */

const ServicesMobileSlide = memo(function ServicesMobileSlide({
  service,
  index,
  progress,
  total,
  measureRef,
  eager,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  total: number;
  measureRef?: React.Ref<HTMLDivElement>;
  eager?: boolean;
}) {
  const focus = useTransform(progress, (p) => {
    const pos = p * (total - 1);
    return Math.max(0, 1 - Math.abs(pos - index));
  });
  const scale = useTransform(focus, [0, 1], [0.98, 1]);
  const opacity = useTransform(focus, [0, 0.35, 1], [0.45, 0.78, 1]);

  const fullTitle = [service.title, service.highlight].filter(Boolean).join(" ");

  return (
    <motion.article
      ref={measureRef}
      className="services-story-mobile-slide"
      style={{ scale, opacity }}
    >
      <div className="services-story-mobile-slide-image">
        <Image
          src={service.images[0]}
          alt={`${service.title} preview`}
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority={eager}
          unoptimized
        />
      </div>

      <div className="services-story-mobile-slide-text">
        <h3 className="services-story-mobile-slide-title">{fullTitle}</h3>
        <p className="services-story-mobile-slide-subtitle">{service.subtitle}</p>
        <p className="services-story-mobile-slide-desc">{service.desc}</p>
      </div>
    </motion.article>
  );
});

const ServicesMobileTrack = memo(function ServicesMobileTrack({
  columnY,
  progress,
  viewportRef,
  slideMeasureRef,
  lastSlideMeasureRef,
}: {
  columnY: MotionValue<number>;
  progress: MotionValue<number>;
  viewportRef: React.Ref<HTMLDivElement>;
  slideMeasureRef: React.Ref<HTMLDivElement>;
  lastSlideMeasureRef: React.Ref<HTMLDivElement>;
}) {
  const total = services.length;
  const lastIndex = total - 1;

  return (
    <div
      ref={viewportRef}
      className="services-story-mobile-viewport relative min-h-0 w-full flex-1 overflow-hidden lg:hidden"
    >
      <motion.div
        className="services-story-mobile-track"
        style={{ y: columnY, willChange: "transform" }}
      >
        {services.map((service, index) => (
          <ServicesMobileSlide
            key={`mobile-${index}-${service.link}`}
            service={service}
            index={index}
            progress={progress}
            total={total}
            measureRef={
              index === 0
                ? slideMeasureRef
                : index === lastIndex
                  ? lastSlideMeasureRef
                  : undefined
            }
            eager={index === 0}
          />
        ))}
      </motion.div>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const mobileSlideMeasureRef = useRef<HTMLDivElement>(null);
  const mobileLastSlideMeasureRef = useRef<HTMLDivElement>(null);
  const groupStepRef = useRef(DESKTOP_GROUP_STEP_PX);
  const mobileEndOffsetRef = useRef(0);
  const total = services.length;
  const [slotHeight, setSlotHeight] = useState(420);
  const [introViews, setIntroViews] = useState(INTRO_SCROLL_VIEWS);
  const [sectionHeight, setSectionHeight] = useState(
    `${(total + INTRO_SCROLL_VIEWS) * SCROLL_VH_PER_STEP * 100}vh`,
  );
  const introViewsRef = useRef(INTRO_SCROLL_VIEWS);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const overall = useMotionValue(0);

  /** 0→1: intro header slides up; 0→1: service story after intro */
  const introProgress = useTransform(overall, (p) => {
    const views = introViewsRef.current;
    if (views <= 0) return 1;
    const introShare = views / (total + views);
    return Math.min(1, Math.max(0, p / introShare));
  });

  const storyProgress = useTransform(overall, (p) => {
    const views = introViewsRef.current;
    if (views <= 0) return Math.min(1, Math.max(0, p));
    const introShare = views / (total + views);
    if (p <= introShare) return 0;
    return Math.min(1, (p - introShare) / (1 - introShare));
  });

  const activeIndex = useActiveIndex(storyProgress, total);

  const columnY = useTransform(storyProgress, (p) => {
    const step = groupStepRef.current;
    let y = -p * (total - 1) * step;

    if (typeof window !== "undefined" && window.innerWidth < 1024 && total > 1) {
      const endOffset = mobileEndOffsetRef.current;
      if (endOffset > 0) {
        const lastSegmentStart = (total - 2) / (total - 1);
        if (p >= lastSegmentStart) {
          const t = (p - lastSegmentStart) / (1 - lastSegmentStart);
          y += endOffset * t;
        }
      }
    }

    return y;
  });

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const syncIntro = () => {
      const next = mq.matches ? INTRO_SCROLL_VIEWS : 0;
      introViewsRef.current = next;
      setIntroViews(next);
    };
    syncIntro();
    mq.addEventListener("change", syncIntro);
    return () => mq.removeEventListener("change", syncIntro);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = imageViewportRef.current;
    if (!section) return;

    const measureLayout = () => {
      const width = window.innerWidth;
      const viewportH = window.innerHeight;

      if (width >= 1024) {
        setSlotHeight(0);
        groupStepRef.current = getGroupStepPx(width, 0);
        mobileEndOffsetRef.current = 0;
        setSectionHeight(
          computeSectionHeight(width, total, introViewsRef.current, groupStepRef.current, viewportH),
        );
      } else {
        const slideH = getSlideHeightWithGap(mobileSlideMeasureRef.current);
        const viewportTrackH = mobileViewportRef.current?.offsetHeight ?? 0;
        const nextSlot = slideH || viewportTrackH;
        const lastSlideH = mobileLastSlideMeasureRef.current?.offsetHeight ?? nextSlot;

        setSlotHeight(nextSlot);
        groupStepRef.current = slideH || getGroupStepPx(width, nextSlot);
        mobileEndOffsetRef.current = Math.max(
          0,
          viewportTrackH - lastSlideH + MOBILE_END_TRIM_PX,
        );
        setSectionHeight(
          computeSectionHeight(width, total, introViewsRef.current, groupStepRef.current, viewportH),
        );
      }
    };

    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), scrollable);
      targetProgressRef.current = passed / scrollable;
    };

    measureLayout();
    readTarget();
    smoothProgressRef.current = targetProgressRef.current;
    overall.set(smoothProgressRef.current);

    const tick = (now: number) => {
      const last = lastTimeRef.current || now;
      const dt = Math.min(0.048, (now - last) / 1000);
      lastTimeRef.current = now;

      const alpha = 1 - Math.exp(-SCROLL_SMOOTH * dt);
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const next = current + (target - current) * alpha;
      smoothProgressRef.current = next;
      overall.set(next);

      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTarget();
    };

    const onResize = () => {
      measureLayout();
      readTarget();
      smoothProgressRef.current = targetProgressRef.current;
      overall.set(smoothProgressRef.current);
    };

    const observer = new ResizeObserver(onResize);
    if (viewport) observer.observe(viewport);
    const mobileViewport = mobileViewportRef.current;
    if (mobileViewport) observer.observe(mobileViewport);
    const mobileSlide = mobileSlideMeasureRef.current;
    if (mobileSlide) observer.observe(mobileSlide);
    const mobileLastSlide = mobileLastSlideMeasureRef.current;
    if (mobileLastSlide) observer.observe(mobileLastSlide);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [overall, introViews]);

  return (
    <section
      ref={sectionRef}
      className="services-story relative"
      style={{ height: sectionHeight }}
    >
      <div className="services-story-pin sticky top-0 h-[100dvh] overflow-hidden">
        <div className="services-story-shell">
          <ServicesIntroHeader introProgress={introProgress} />

          <div className="services-story-body flex min-h-0 w-full flex-1 flex-col items-stretch gap-0 lg:min-h-0 lg:gap-0">
            <ServicesMobileTrack
              columnY={columnY}
              progress={storyProgress}
              viewportRef={mobileViewportRef}
              slideMeasureRef={mobileSlideMeasureRef}
              lastSlideMeasureRef={mobileLastSlideMeasureRef}
            />

            <ServicesListPanel activeIndex={activeIndex} />
            <ServicesImageTrack
              columnY={columnY}
              progress={storyProgress}
              viewportRef={imageViewportRef}
              slotHeight={slotHeight}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
