"use client";

import { memo, useMemo, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
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

const SCROLL_SPRING = { stiffness: 38, damping: 26, mass: 1.05 };
const TEXT_DURATION = 0.5;

/** Wrapper 720px + margin 160px — matches CSS layout on xl+ desktop */
const DESKTOP_GROUP_STEP_PX = 720 + 160;
/** Scaled lg tier — matches CSS vars at 1024–1279px */
const LG_GROUP_STEP_PX = 580 + 100;

/** Small gap between full-height mobile cards */
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
  const segment = 1 / total;
  return Math.min(total - 1, Math.floor(progress / segment));
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
    <header className="relative z-20 hidden shrink-0 pb-6 pt-8 text-center md:block md:pb-8 md:pt-10">
      <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
        Services
      </span>

      <h2 className="section-heading">
        <span className="section-heading-split-accent section-accent-text">
          We Work to
        </span>
        <span className="section-heading-split-title">
          Build Brands
        </span>
      </h2>

      <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base text-gray-600 px-2">
        From idea to execution, we help build brands through modern software,
        intuitive design, and strategic product thinking that drives real
        business results.
      </p>
    </header>
  );
});

/* -------------------------------------------------------------------------- */
/* Left — single active text                                                    */
/* -------------------------------------------------------------------------- */

const textVariants = {
  enter: { opacity: 0, y: 40, filter: "blur(8px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -40, filter: "blur(8px)" },
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
      transition={{ duration: TEXT_DURATION, ease: [0.22, 1, 0.36, 1] }}
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

      <div className="services-story-divider services-story-divider--mobile" aria-hidden />

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
          className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5"
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
    <div className="services-story-text-panel flex w-full min-w-0 items-start pt-2 lg:h-full lg:items-center lg:py-6 lg:pt-0">
      <AnimatePresence mode="wait" initial={false}>
        <ServiceActiveText key={service.link} service={service} />
      </AnimatePresence>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Right — scroll-driven image column                                         */
/* -------------------------------------------------------------------------- */

type ImageLayoutProps = {
  image1: string;
  image2: string;
  alt1?: string;
  alt2?: string;
  priority?: boolean;
};

const ImageLayout = memo(function ImageLayout({
  image1,
  image2,
  alt1 = "",
  alt2 = "",
  priority = false,
}: ImageLayoutProps) {
  return (
    <div className="services-story-image-group">
      <div className="services-story-img services-story-img--primary">
        <Image
          src={image1}
          alt={alt1}
          fill
          sizes="(max-width: 1023px) 100vw, 420px"
          className="object-cover object-top"
          priority={priority}
          unoptimized
        />
      </div>
      <div className="services-story-img services-story-img--secondary">
        <Image
          src={image2}
          alt={alt2}
          fill
          sizes="(max-width: 1023px) 100vw, 360px"
          className="object-cover object-top"
          unoptimized
        />
      </div>
    </div>
  );
});

const ServiceImageGroup = memo(function ServiceImageGroup({
  service,
  eager,
}: {
  service: Service;
  eager?: boolean;
}) {
  return (
    <ImageLayout
      image1={service.images[0]}
      image2={service.images[1]}
      alt1={`${service.title} preview`}
      alt2={`${service.title} detail`}
      priority={eager}
    />
  );
});

const ServicesImageTrack = memo(function ServicesImageTrack({
  columnY,
  viewportRef,
  slotHeight,
}: {
  columnY: MotionValue<number>;
  viewportRef: React.Ref<HTMLDivElement>;
  slotHeight: number;
}) {
  return (
    <div
      ref={viewportRef}
      className="services-story-images-viewport relative min-h-0 w-full flex-1 overflow-hidden lg:h-full lg:w-[var(--services-layout-w)] lg:max-w-[var(--services-layout-w)] lg:flex-none lg:pt-2"
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const total = services.length;
  const [groupStep, setGroupStep] = useState(DESKTOP_GROUP_STEP_PX);
  const [slotHeight, setSlotHeight] = useState(420);

  const sectionHeight = useMemo(() => `${total * 100}vh`, [total]);

  useLayoutEffect(() => {
    const viewport = imageViewportRef.current;
    if (!viewport) return;

    const update = () => {
      const width = window.innerWidth;
      const nextSlot = width >= 1024 ? 0 : viewport.offsetHeight;
      setSlotHeight(nextSlot);
      setGroupStep(getGroupStepPx(width, nextSlot));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const activeIndex = useActiveIndex(progress, total);

  /** Images scroll up continuously — one group step per service segment */
  const columnY = useTransform(progress, (p) => {
    const movedGroups = Math.min(total - 1, p * total);
    const base = -movedGroups * groupStep;

    const lastSegmentStart = (total - 1) / total;
    if (p <= lastSegmentStart) return base;

    const t = (p - lastSegmentStart) / (1 - lastSegmentStart);
    return base - t * 36;
  });

  return (
    <section
      ref={sectionRef}
      className="services-story relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="services-story-shell">
          <ServicesHeader />

          <div className="services-story-body flex min-h-0 w-full flex-1 flex-col items-stretch gap-4 pb-4 pt-2 lg:pb-6 lg:pt-2">
            <ServicesTextPanel activeIndex={activeIndex} />
            <ServicesImageTrack
              columnY={columnY}
              viewportRef={imageViewportRef}
              slotHeight={slotHeight}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
