"use client";

import "./TrustedFounders.css";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SLIDER_IMAGES } from "@/lib/home-assets";
import homeContent from "@/data/home-content.json";

const images = SLIDER_IMAGES;
const { badge, headingLines, headingAccent } = homeContent.testimonials;
/** Duplicate sets for seamless infinite marquee */
const LOOP_SETS = 3;
/** ~17% faster than 48 — still constant & premium */
const MARQUEE_SPEED = 56;
const SCALE_RIGHT = 1;
const SCALE_LEFT = 0.72;
const HOVER_BOOST = 0.08;
const HOVER_IN_DURATION = 0.55;
const HOVER_OUT_DURATION = 0.45;
const IMG_ZOOM = 1.04;

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
    const imagesEls = cards.map(
      (card) => card.querySelector("img") as HTMLImageElement | null,
    );

    let paused = false;
    /** Card currently receiving hover boost (stays set through leave tween) */
    let activeHoverCard: HTMLElement | null = null;
    /** Animated additive boost on top of dynamic position scale */
    const hoverState = { boost: 0 };

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
      force3D: true,
      willChange: "transform",
      backfaceVisibility: "hidden",
    });

    gsap.set(imagesEls.filter(Boolean) as HTMLImageElement[], {
      scale: 1,
      transformOrigin: "50% 50%",
      force3D: true,
      willChange: "transform",
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
        const base = mapScaleFromX(centerX, viewLeft, viewRight);
        const boost = card === activeHoverCard ? hoverState.boost : 0;
        const scale = base + boost;
        const isHovering = card === activeHoverCard && hoverState.boost > 0.001;

        gsap.set(card, {
          scale,
          zIndex: isHovering ? 999 : Math.round(base * 100),
          force3D: true,
        });
      }
    };

    const onTick = () => {
      if (!paused && setWidth > 0) {
        xPos -= MARQUEE_SPEED * (gsap.ticker.deltaRatio(60) / 60);
      }
      render();
    };

    measure();
    render();
    gsap.ticker.add(onTick);

    const onEnter = (card: HTMLElement) => () => {
      const img = card.querySelector("img");

      gsap.killTweensOf(hoverState);
      if (img) gsap.killTweensOf(img);

      activeHoverCard = card;
      paused = true;

      gsap.to(hoverState, {
        boost: HOVER_BOOST,
        duration: HOVER_IN_DURATION,
        ease: "power3.out",
        overwrite: true,
      });

      if (img) {
        gsap.to(img, {
          scale: IMG_ZOOM,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
          force3D: true,
        });
      }
    };

    const onLeave = (card: HTMLElement) => () => {
      if (activeHoverCard !== card) return;

      const img = card.querySelector("img");

      gsap.killTweensOf(hoverState);
      if (img) gsap.killTweensOf(img);

      gsap.to(hoverState, {
        boost: 0,
        duration: HOVER_OUT_DURATION,
        ease: "power2.out",
        overwrite: true,
        onStart: () => {
          // Resume once the return has begun — not after it finishes
          paused = false;
        },
        onComplete: () => {
          if (activeHoverCard === card) {
            activeHoverCard = null;
          }
        },
      });

      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: HOVER_OUT_DURATION,
          ease: "power2.out",
          overwrite: true,
          force3D: true,
        });
      }
    };

    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const enter = onEnter(card);
      const leave = onLeave(card);
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    });

    const onResize = () => {
      measure();
      render();
    };

    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("resize", onResize);
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(hoverState);
      imagesEls.forEach((img) => {
        if (img) gsap.killTweensOf(img);
      });
      gsap.set(cards, {
        clearProps: "scale,zIndex,transform,willChange,backfaceVisibility",
      });
      gsap.set(imagesEls.filter(Boolean) as HTMLImageElement[], {
        clearProps: "scale,transform,willChange",
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
          <span className="trusted-badge -mt-9">{badge}</span>
          <h2 className="trusted-heading font-bold">
            {headingLines[0]} <br />
            {headingLines[1]} <br />
            <span className="text-[#BABABA] font-museoModerno font-bold">
              {headingAccent}
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="trusted-image-row pt-20"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          {marqueeItems.map((item) => (
            <div
              key={item.key}
              className="trusted-image-card size-4"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img src={item.src} alt="" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
