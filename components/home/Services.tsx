"use client";

import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const services = [
  {
    title: "Web Application Development",
    highlight: "And Design",
    subtitle: "Fast, scalable, and secure solutions for modern businesses.",
    desc:
      "From concept to deployment, we develop custom web applications engineered for performance and reliability. Our team transforms complex workflows into smooth digital operations, ensuring your platform grows as your business evolves.",
    link: "/services/ui-ux",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/679a9c4888217669122eebaf_3d41798d228903d42862a148dd56aeb1_Project%20Cards%20%2810%29%20%281%29.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78087a5b72120cc3e5db_d1a5f14e5e5fc69f2dbac575600f06f4_Project%20Cards-6.avif",
    ],
  },
  {
    title: "Mobile App",
    highlight: "Development",
    subtitle: "Seamless mobile experiences that connect with people.",
    desc: "",
    link: "/services/web-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78084947770a14f1eb7c_d1cec41f22346c1c941376236623384b_Project%20Cards.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089c9a93e810fbfa6e_Project%20Cards-1.avif",
    ],
  },
  {
    title: "Branding & Digital",
    highlight: "Identity",
    subtitle: "Meaningful brands built to inspire confidence.",
    desc:
      "Logo Design, Brand Identity, Visual Strategy, Social Media Branding.",
    link: "/services/logo-branding",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7809638da68108df9847_Project%20Cards-4.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089a0d6cfed1675211_Project%20Cards-5.avif",
    ],
  },
  {
    title: "Product Strategy & ",
    highlight: "Consultation",
    subtitle: "Expert guidance to turn ideas into scalable products.",
    desc:
      "Webflow, Framer Prototypes, CMS Integration, Rapid Landing Pages.",
    link: "/services/framer-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac780912dabe81710b65ed_8e70a34a4056237eca17e1209cecdebe_Project%20Cards-2.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78088c2757d4cdf75977_Project%20Cards-3.avif",
    ],
  },
] as const;

type Service = (typeof services)[number];

const CTA_ARROW =
  "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67326d59201cc3b185432b90_CTA%20Arrow.svg";

/**
 * Design Monks–style inertia: soft spring lag (Lenis-like),
 * longer text crossfade, hull-height sticky stage.
 */
const SCROLL_SPRING = { stiffness: 30, damping: 30, mass: 1.05, restDelta: 0.001 };
const TEXT_DURATION = 0.72;
const TEXT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
/** One viewport of scroll for intro header exit (Design Monks style) */
const INTRO_SCROLL_VIEWS = 1;

const DESKTOP_GROUP_STEP_PX = 720 + 160;
const LG_GROUP_STEP_PX = 580 + 100;
const MOBILE_CARD_GAP = 12;

function getGroupStepPx(width: number, mobileSlotHeight: number) {
  if (width >= 1280) return DESKTOP_GROUP_STEP_PX;
  if (width >= 1024) return LG_GROUP_STEP_PX;
  return Math.max(mobileSlotHeight + MOBILE_CARD_GAP, 280);
}

const SERIF = { fontFamily: "Georgia, 'Times New Roman', serif" } as const;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getDescription(service: Service) {
  return service.desc
    ? `${service.subtitle} ${service.desc}`
    : service.subtitle;
}

function getActiveIndex(progress: number, total: number) {
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
}

function useActiveIndex(progress: MotionValue<number>, total: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const next = getActiveIndex(latest, total);
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return activeIndex;
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

const ServicesHeader = memo(function ServicesHeader() {
  return (
    <>
      <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
        Services
      </span>

      <h2 className="section-heading">
        <span className="section-heading-split-accent section-accent-text">
          We Work to
        </span>
        <span className="section-heading-split-title">Build Brands</span>
      </h2>

      <p className="mx-auto mt-3 max-w-2xl px-2 text-sm text-gray-600 sm:mt-4 sm:text-base">
        From idea to execution, we help build brands through modern software,
        intuitive design, and strategic product thinking that drives real
        business results.
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
/* Left — single active text                                                    */
/* -------------------------------------------------------------------------- */

const textVariants = {
  enter: { opacity: 0, y: 28, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -28, filter: "blur(6px)" },
};

const ServiceActiveText = memo(function ServiceActiveText({
  service,
}: {
  service: Service;
}) {
  return (
    <motion.div
      variants={textVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: TEXT_DURATION, ease: TEXT_EASE }}
      className="w-full"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <h3
        className="text-[1.75rem] font-bold leading-[1.05] text-[#141414] sm:text-[2.25rem] lg:text-[2.75rem] xl:text-[4rem]"
        style={{ letterSpacing: "-1.5px" }}
      >
        {service.title}
        <span className="italic text-[#62F7B3]" style={SERIF}>
          {service.highlight}
        </span>
      </h3>

      <div
        className="services-story-divider services-story-divider--mobile"
        aria-hidden
      />

      <p className="text-sm leading-[1.65] text-[#141414]/60 sm:text-base lg:text-lg lg:leading-[1.8]">
        {getDescription(service)}
      </p>

      <Link
        href={service.link}
        className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#141414] transition-colors duration-300 hover:text-[#62F7B3] lg:mt-8 lg:gap-3 lg:text-[15px]"
      >
        <span>See More</span>
        <img
          src={CTA_ARROW}
          alt=""
          className="h-[18px] w-[18px] transition-transform duration-500 ease-out group-hover:translate-x-1.5"
          loading="lazy"
        />
      </Link>
    </motion.div>
  );
});

const ServicesTextPanel = memo(function ServicesTextPanel({
  activeIndex,
}: {
  activeIndex: number;
}) {
  const service = services[activeIndex];

  return (
    <div className="services-story-text-panel flex w-full min-w-0 items-start pt-2 lg:h-full lg:items-center lg:py-0 lg:pt-0">
      <AnimatePresence mode="wait" initial={false}>
        <ServiceActiveText key={service.link} service={service} />
      </AnimatePresence>
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
  const scale = useTransform(focus, [0, 1], [0.96, 1]);
  const opacity = useTransform(focus, [0, 0.4, 1], [0, 0, 1]);

  return (
    <motion.div
      className="services-story-image-group"
      style={{ scale, opacity, willChange: "transform, opacity" }}
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
      className="services-story-images-viewport relative min-h-0 w-full flex-1 overflow-hidden lg:h-full lg:w-[var(--services-layout-w)] lg:max-w-[var(--services-layout-w)] lg:flex-none"
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
            key={service.link}
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
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const groupStepRef = useRef(DESKTOP_GROUP_STEP_PX);
  const total = services.length;
  const [slotHeight, setSlotHeight] = useState(420);
  const [introViews, setIntroViews] = useState(INTRO_SCROLL_VIEWS);
  const introViewsRef = useRef(INTRO_SCROLL_VIEWS);

  const sectionHeight = useMemo(
    () => `${(total + introViews) * 100}vh`,
    [total, introViews],
  );

  const rawOverall = useMotionValue(0);
  const overall = useSpring(rawOverall, SCROLL_SPRING);

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
    return -p * (total - 1) * groupStepRef.current;
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
      const nextSlot = width >= 1024 ? 0 : viewport?.offsetHeight ?? 0;
      setSlotHeight(nextSlot);
      groupStepRef.current = getGroupStepPx(width, nextSlot);
    };

    const measureProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), scrollable);
      rawOverall.set(passed / scrollable);
    };

    measureLayout();
    measureProgress();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measureProgress();
        ticking = false;
      });
    };

    const onResize = () => {
      measureLayout();
      measureProgress();
    };

    const observer = viewport ? new ResizeObserver(onResize) : null;
    if (viewport && observer) observer.observe(viewport);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [rawOverall]);

  return (
    <section
      ref={sectionRef}
      className="services-story relative"
      style={{ height: sectionHeight }}
    >
      <div className="services-story-pin sticky top-0 h-[100dvh] overflow-hidden">
        <div className="services-story-shell">
          <ServicesIntroHeader introProgress={introProgress} />

          <div className="services-story-body flex min-h-0 w-full flex-1 flex-col items-stretch gap-3 lg:min-h-0 lg:gap-0">
            <ServicesTextPanel activeIndex={activeIndex} />
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
