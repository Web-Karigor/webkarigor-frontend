"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Home,
  Hospital,
  ShoppingCart,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { useSpecializedServicesQuery } from "@/hooks/queries/useSpecializedServicesQuery";
import { homeSectionItem } from "@/lib/home-page";

const CARD_GAP = 24;
const AUTO_SCROLL_MS = 2200;
const DRIFT_PX_PER_SEC = 36;
const STEP_DURATION = 0.9;
const DRAG_THRESHOLD_PX = 48;

const LOOP_COPIES = 3;

const OFFERING_ICONS = {
  shoppingCart: ShoppingCart,
  cloud: Cloud,
  hospital: Hospital,
  home: Home,
} as const;

type OfferingItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  variant: string;
};

export default function Offerings({
  eyebrow: eyebrowProp,
  title: titleProp,
  description: descriptionProp,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
} = {}) {
  const { data } = useHomePageQuery();
  const { data: specializedData } = useSpecializedServicesQuery();
  const industries = homeSectionItem(data?.data?.sections?.industries_work_with);
  const specialized = homeSectionItem(
    data?.data?.sections?.specialized_services,
  );
  const heading = industries || specialized;

  const items = useMemo<OfferingItem[]>(() => {
    const posts = specializedData?.data?.posts ?? [];
    return [...posts]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((post) => ({
        id: post.id,
        title: post.fields?.title ?? "",
        description: post.fields?.description ?? "",
        icon: post.fields?.icon ?? "shoppingCart",
        variant: post.fields?.variant ?? "yellow",
      }))
      .filter((item) => item.title);
  }, [specializedData]);

  const { eyebrow, title, description } = useMemo(() => {
    if (eyebrowProp || titleProp || descriptionProp) {
      return {
        eyebrow: eyebrowProp ?? "",
        title: titleProp ?? "",
        description: descriptionProp ?? "",
      };
    }
    if (!heading?.title) {
      return { eyebrow: "", title: "", description: "" };
    }
    const parts = heading.title.trim().split(/\s+/);
    return {
      eyebrow: parts[0] || "",
      title: parts.slice(1).join(" "),
      description: heading.subtitle || "",
    };
  }, [eyebrowProp, titleProp, descriptionProp, heading]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const pauseAutoRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const wrappingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const loopItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        items.map((item, index) => ({ item, copy, index })),
      ).flat(),
    [items],
  );

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScroll: number;
    lastX: number;
    lastT: number;
    velocity: number;
    moved: boolean;
    captured: boolean;
  } | null>(null);

  const clearResumeTimer = () => {
    if (resumeTimerRef.current != null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const pauseAuto = useCallback((ms?: number) => {
    pauseAutoRef.current = true;
    clearResumeTimer();
    if (ms != null) {
      resumeTimerRef.current = window.setTimeout(() => {
        pauseAutoRef.current = false;
        resumeTimerRef.current = null;
      }, ms);
    }
  }, []);

  const getStep = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 324;
    const card = viewport.querySelector<HTMLElement>("[data-service-offering-card]");
    const gap = Number.parseFloat(getComputedStyle(viewport).columnGap || "") || CARD_GAP;
    return (card?.offsetWidth ?? 300) + gap;
  }, []);

  const itemsCount = items.length;

  const getSetWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return getStep() * itemsCount;
    const cards = viewport.querySelectorAll<HTMLElement>(
      "[data-service-offering-card]",
    );
    const first = cards[0];
    const nextSet = cards[itemsCount];
    if (first && nextSet) {
      return nextSet.offsetLeft - first.offsetLeft;
    }
    return getStep() * itemsCount;
  }, [getStep, itemsCount]);

  const normalizeLoop = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || wrappingRef.current) return;
    const setW = getSetWidth();
    if (setW <= 0) return;

    if (viewport.scrollLeft < setW * 0.5) {
      wrappingRef.current = true;
      viewport.scrollLeft += setW;
      wrappingRef.current = false;
    } else if (viewport.scrollLeft >= setW * 1.5) {
      wrappingRef.current = true;
      viewport.scrollLeft -= setW;
      wrappingRef.current = false;
    }
  }, [getSetWidth]);

  const animateTo = useCallback((left: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    gsap.killTweensOf(viewport);
    gsap.to(viewport, {
      scrollLeft: left,
      duration: STEP_DURATION,
      ease: "power2.out",
      overwrite: true,
      onUpdate: normalizeLoop,
    });
  }, [normalizeLoop]);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const step = getStep();
      pauseAuto(AUTO_SCROLL_MS);
      animateTo(viewport.scrollLeft + (direction === "left" ? -step : step));
    },
    [animateTo, getStep, pauseAuto],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const placeInMiddle = () => {
      const setW = getSetWidth();
      if (setW > 0) viewport.scrollLeft = setW;
    };

    placeInMiddle();
    const raf = requestAnimationFrame(placeInMiddle);
    viewport.addEventListener("scroll", normalizeLoop, { passive: true });
    window.addEventListener("resize", placeInMiddle);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("scroll", normalizeLoop);
      window.removeEventListener("resize", placeInMiddle);
    };
  }, [getSetWidth, normalizeLoop]);

  useEffect(() => {
    const onTick = () => {
      const viewport = viewportRef.current;
      if (!viewport || pauseAutoRef.current || dragRef.current) return;
      if (gsap.isTweening(viewport)) return;
      const dt = gsap.ticker.deltaRatio(60) / 60;
      viewport.scrollLeft += DRIFT_PX_PER_SEC * dt;
      normalizeLoop();
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
      clearResumeTimer();
      const viewport = viewportRef.current;
      if (viewport) gsap.killTweensOf(viewport);
    };
  }, [normalizeLoop]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    pauseAuto();
    gsap.killTweensOf(viewport);
    const touch = event.pointerType === "touch";
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScroll: viewport.scrollLeft,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
      captured: !touch,
    };
    setDragging(true);
    if (!touch) viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport || drag.pointerId !== event.pointerId) return;

    const now = performance.now();
    const frameDx = event.clientX - drag.lastX;
    const dt = Math.max(now - drag.lastT, 1);
    drag.velocity = frameDx / dt;
    drag.lastX = event.clientX;
    drag.lastT = now;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.captured) {
      if (Math.abs(deltaY) > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
        dragRef.current = null;
        setDragging(false);
        pauseAuto(AUTO_SCROLL_MS);
        return;
      }
      if (Math.abs(deltaX) < 8) return;
      drag.captured = true;
      viewport.setPointerCapture(event.pointerId);
    }

    if (Math.abs(deltaX) > 6) {
      drag.moved = true;
    }

    viewport.scrollLeft = drag.startScroll - deltaX;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport || drag.pointerId !== event.pointerId) return;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    const { velocity, moved, startX } = drag;
    const deltaX = event.clientX - startX;
    dragRef.current = null;
    setDragging(false);

    if (moved) {
      const step = getStep();
      let target = viewport.scrollLeft;

      if (deltaX <= -DRAG_THRESHOLD_PX || velocity < -0.45) {
        target = Math.ceil((viewport.scrollLeft + 1) / step) * step;
      } else if (deltaX >= DRAG_THRESHOLD_PX || velocity > 0.45) {
        target = Math.floor((viewport.scrollLeft - 1) / step) * step;
      } else {
        target = Math.round(viewport.scrollLeft / step) * step;
      }

      animateTo(target);
    }

    pauseAuto(AUTO_SCROLL_MS);
  };

  /* Keep layout height while API loads so Video/Case pins don't jump. */
  if (!itemsCount) {
    return (
      <section
        className="svc-offerings pointer-events-none overflow-hidden bg-[#f8fafc] py-12 min-h-[520px]"
        aria-hidden
      />
    );
  }

  return (
    <section className="svc-offerings overflow-hidden bg-[#f8fafc] py-12">
      <div className="svc-offerings-inner mx-auto flex w-full max-w-[1680px] flex-col gap-[60px] px-[clamp(16px,4vw,40px)]">
        <div className="svc-offerings-head grid grid-cols-1 items-center gap-[clamp(20px,3vw,32px)] text-center lg:grid-cols-[minmax(0,1fr)_minmax(0,913px)] lg:gap-[clamp(64px,10vw,140px)] lg:text-left">
          <div>
            <span className="svc-offerings-eyebrow mb-3 block font-museoModerno text-base font-bold leading-[1.2] tracking-[-0.01em] text-[#15d286] sm:text-lg lg:text-3xl">
              {eyebrow}
            </span>
            <h2 className="svc-offerings-title mx-auto m-0 max-w-[460px] font-montserrat text-[clamp(24px,6vw,32px)] font-bold text-black lg:mx-0">
              {title}
            </h2>
          </div>
          <p className="svc-offerings-lead mx-auto m-0 w-full max-w-[913px] font-['Manrope'] text-[clamp(14px,3.5vw,16px)] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:mx-0 lg:min-h-[96px] lg:text-[32px]">
            {description}
          </p>
        </div>

        <div className="mr-[calc(-1*var(--offerings-bleed-right))] w-[calc(100%+var(--offerings-bleed-right))] [--offerings-bleed-right:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]">
          <div className="relative w-full">
            <button
              type="button"
              className="absolute left-3 top-1/2 z-[3] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] hover:translate-y-[calc(-50%-1px)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:left-5 sm:h-12 sm:w-12 lg:left-40"
              onClick={() => scrollByStep("left")}
              aria-label="Previous industries"
            >
              <ArrowLeft className="h-[22px] w-[22px] stroke-[1.5]" aria-hidden />
            </button>

            <button
              type="button"
              className="absolute right-3 top-1/2 z-[3] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] hover:translate-y-[calc(-50%-1px)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:right-5 sm:h-12 sm:w-12 lg:right-40"
              onClick={() => scrollByStep("right")}
              aria-label="Next industries"
            >
              <ArrowRight className="h-[22px] w-[22px] stroke-[1.5]" aria-hidden />
            </button>

            <div className="lg:pl-[220px]">
              <div
                ref={viewportRef}
                className={`relative flex w-full gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${
                  dragging ? "cursor-grabbing select-none" : "cursor-grab"
                }`}
                style={{ touchAction: "pan-y" }}
                onMouseEnter={() => pauseAuto()}
                onMouseLeave={() => {
                  if (!dragRef.current) pauseAuto(AUTO_SCROLL_MS);
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {loopItems.map(({ item, copy, index }) => {
                  const Icon =
                    OFFERING_ICONS[item.icon as keyof typeof OFFERING_ICONS] ??
                    ShoppingCart;
                  return (
                    <article
                      key={`${item.id}-${copy}-${index}`}
                      data-service-offering-card
                      className={`flex h-[min(320px,70vw)] min-h-[260px] w-[min(300px,calc(100vw-64px))] shrink-0 flex-col gap-[10px] rounded-[12px] px-5 py-6 sm:h-[320px] ${
                        item.variant === "green" ? "bg-[#42f5a4]" : "bg-[#ffeb3b]"
                      }`}
                    >
                      <div className="flex items-center gap-[14px]">
                        <span className="inline-flex lg:h-9 lg:w-9 h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white">
                          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                        </span>
                        <h3 className="m-0 font-montserrat lg:text-xl text-base font-bold leading-[1.2] tracking-[-0.02em] text-[#111827]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="m-0 font-montserrat lg:text-[0.9375rem] text-sm leading-[1.65] text-[#111827]">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
