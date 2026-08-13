"use client";

import "./TrustedFounders.css";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SLIDER_IMAGES } from "@/lib/home-assets";
import homeContent from "@/data/home-content.json";

const images = SLIDER_IMAGES;
const { badge, headingLines, headingAccent } = homeContent.testimonials;
/** Duplicate sets for seamless infinite marquee */
const LOOP_SETS = 3;
const MARQUEE_SPEED_DESKTOP = 56;
const MARQUEE_SPEED_MOBILE = 32;
const MOBILE_BREAKPOINT = 1024;
const SCALE_RIGHT = 1;
const SCALE_LEFT = 0.72;

type MarqueeItem = {
  src: string;
  key: string;
};

const marqueeItems: MarqueeItem[] = Array.from({ length: LOOP_SETS }, (_, set) =>
  images.map((src) => ({
    src,
    key: `${set}-${src}`,
  })),
).flat();

function mapScaleFromX(centerX: number, viewLeft: number, viewRight: number) {
  const span = Math.max(viewRight - viewLeft, 1);
  const progress = gsap.utils.clamp(0, 1, (centerX - viewLeft) / span);
  return gsap.utils.mapRange(0, 1, SCALE_LEFT, SCALE_RIGHT, progress);
}

export default function TrustedFounders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(".trusted-image-card"),
    );

    const inViewRef = { current: true };
    let speed =
      window.innerWidth < MOBILE_BREAKPOINT
        ? MARQUEE_SPEED_MOBILE
        : MARQUEE_SPEED_DESKTOP;

    /** Continuous world position — never reset to a tween start */
    let xPos = 0;
    /** Exact pixel width of ONE content set (cards + trailing gap) */
    let setWidth = 0;
    const cardOffsets: number[] = [];
    const cardWidths: number[] = [];

    gsap.set(container, {
      x: 0,
      force3D: true,
      willChange: "transform",
      backfaceVisibility: "hidden",
    });

    gsap.set(cards, {
      transformOrigin: "50% 100%",
      scaleX: 1,
      force3D: true,
      willChange: "transform",
      backfaceVisibility: "hidden",
    });

    const measure = () => {
      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const perSet = cards.length / LOOP_SETS;

      let offset = 0;
      for (let i = 0; i < cards.length; i++) {
        cardOffsets[i] = offset;
        cardWidths[i] = cards[i].offsetWidth;
        offset += cardWidths[i] + gap;
      }

      /**
       * Period must include the flex gap AFTER the last card of a set
       * (gap between set N and set N+1). Missing this causes a visible jump.
       * period = Σ widths + perSet * gap
       */
      let period = 0;
      for (let i = 0; i < perSet; i++) {
        period += cardWidths[i] + gap;
      }
      setWidth = period;

      if (setWidth > 0) {
        xPos = gsap.utils.wrap(-setWidth, 0, xPos);
      }
    };

    const render = () => {
      if (setWidth <= 0) return;

      const x = gsap.utils.wrap(-setWidth, 0, xPos);

      gsap.set(container, {
        x,
        force3D: true,
      });

      const viewLeft = section.getBoundingClientRect().left;
      const viewRight = section.getBoundingClientRect().right;
      const rowLeft = container.getBoundingClientRect().left;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const centerX = rowLeft + cardOffsets[i] + cardWidths[i] / 2;
        const scale = mapScaleFromX(centerX, viewLeft, viewRight);

        gsap.set(card, {
          scaleX: 1,
          scaleY: scale,
          zIndex: Math.round(scale * 100),
          force3D: true,
        });
      }
    };

    const onTick = () => {
      if (!inViewRef.current) return;
      if (setWidth > 0) {
        xPos -= speed * (gsap.ticker.deltaRatio(60) / 60);
      }
      render();
    };

    measure();
    render();
    gsap.ticker.add(onTick);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
        if (inViewRef.current) render();
      },
      { rootMargin: "120px 0px" },
    );
    visibility.observe(section);

    const onResize = () => {
      speed =
        window.innerWidth < MOBILE_BREAKPOINT
          ? MARQUEE_SPEED_MOBILE
          : MARQUEE_SPEED_DESKTOP;
      measure();
      render();
    };

    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(onTick);
      visibility.disconnect();
      window.removeEventListener("resize", onResize);
      gsap.set(cards, {
        clearProps:
          "scale,scaleX,scaleY,zIndex,transform,willChange,backfaceVisibility",
      });
      gsap.set(container, {
        clearProps: "x,transform,willChange,backfaceVisibility",
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="trusted-wrapper">
      <div className="trusted-layout">
        <div className="trusted-text">
          <span className="trusted-badge">{badge}</span>
          <h2 className="trusted-heading font-bold">
            {headingLines[0]} <br />
            {headingLines[1]}{" "}
            <span className="text-[#BABABA] font-museoModerno font-bold">
              {headingAccent}
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="trusted-image-row lg:pt-28 pt-10 md:pt-10 xl:pt-40 2xl:pt-48"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          {marqueeItems.map((item) => (
            <div
              key={item.key}
              className="trusted-image-card size-4"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 40vw, 495px"
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
