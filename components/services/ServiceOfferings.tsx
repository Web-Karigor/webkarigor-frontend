"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import servicesContent from "@/data/services-content.json";
import { SERVICE_OFFERINGS } from "@/lib/services-data";

const { eyebrow, title, description } = servicesContent.offerings;

const CARD_GAP = 24;
const AUTO_SCROLL_MS = 4500;
const DRAG_THRESHOLD_PX = 48;

export default function ServiceOfferings() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pauseAutoRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
    lastX: number;
    lastT: number;
    velocity: number;
    moved: boolean;
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
    return (card?.offsetWidth ?? 300) + CARD_GAP;
  }, []);

  const maxScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  }, []);

  const scrollTo = useCallback((left: number, smooth = false) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const clamped = Math.max(0, Math.min(left, maxScroll()));
    viewport.scrollTo({ left: clamped, behavior: smooth ? "smooth" : "auto" });
  }, [maxScroll]);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const step = getStep();
      const max = maxScroll();
      const current = viewport.scrollLeft;
      pauseAuto(AUTO_SCROLL_MS);

      if (direction === "right" && current >= max - 4) {
        scrollTo(0, true);
        return;
      }
      if (direction === "left" && current <= 4) {
        scrollTo(max, true);
        return;
      }

      scrollTo(current + (direction === "left" ? -step : step), true);
    },
    [getStep, maxScroll, pauseAuto, scrollTo],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (pauseAutoRef.current || dragRef.current) return;
      scrollByStep("right");
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
      clearResumeTimer();
    };
  }, [scrollByStep]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport || maxScroll() <= 0) return;

    pauseAuto();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: viewport.scrollLeft,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
    setDragging(true);
    viewport.setPointerCapture(event.pointerId);
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

      scrollTo(target, true);
    }

    pauseAuto(AUTO_SCROLL_MS);
  };

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-12">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-[60px] px-[clamp(16px,4vw,40px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(20px,3vw,32px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,913px)] lg:gap-[clamp(64px,10vw,140px)]">
          <div>
            <span className="mb-3 block font-montserrat text-sm font-bold leading-[1.2] tracking-[-0.01em] text-[#15d286] lg:text-2xl">
              {eyebrow}
            </span>
            <h2 className="m-0 max-w-[460px] font-['Geist'] text-[clamp(24px,6vw,32px)] font-bold text-black">
              {title}
            </h2>
          </div>
          <p className="m-0 w-full max-w-[913px] justify-start text-left font-['Manrope'] text-[clamp(14px,3.5vw,16px)] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:min-h-[96px] lg:text-[32px]">
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

            <div
              ref={viewportRef}
              className={`relative flex w-full gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${
                dragging
                  ? "cursor-grabbing select-none"
                  : "cursor-grab scroll-smooth"
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
              {/* Spacer so cards clear the arrow on large screens */}
              <div className="hidden w-[210px] shrink-0 lg:block" aria-hidden />

              {SERVICE_OFFERINGS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={`${item.title}-${index}`}
                    data-service-offering-card
                    className={`flex h-[min(320px,70vw)] min-h-[260px] w-[min(300px,calc(100vw-64px))] shrink-0 flex-col gap-[10px] rounded-[12px] px-5 py-6 sm:h-[320px] ${
                      item.variant === "green" ? "bg-[#42f5a4]" : "bg-[#ffeb3b]"
                    }`}
                  >
                    <div className="flex items-center gap-[14px]">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white">
                        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                      </span>
                      <h3 className="m-0 font-montserrat text-xl font-bold leading-[1.2] tracking-[-0.02em] text-[#111827]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="m-0 font-montserrat text-[0.9375rem] leading-[1.65] text-[#111827]">
                      {item.description}
                    </p>
                  </article>
                );
              })}

              <div className="w-4 shrink-0 sm:w-6" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
