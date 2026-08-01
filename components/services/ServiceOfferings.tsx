"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import servicesContent from "@/data/services-content.json";
import { SERVICE_OFFERINGS } from "@/lib/services-data";

const { eyebrow, title, description } = servicesContent.offerings;

const CARD_GAP = 24;
const AUTO_SCROLL_MS = 4500;

export default function ServiceOfferings() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const maxOffsetRef = useRef(0);
  const pauseAutoRef = useRef(false);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startOffset: number;
    moved: boolean;
  } | null>(null);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return CARD_GAP;

    const card = track.querySelector<HTMLElement>("[data-service-offering-card]");
    return (card?.offsetWidth ?? 372) + CARD_GAP;
  }, []);

  const setOffset = useCallback((nextOffset: number, smooth = false) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(nextOffset, maxOffsetRef.current));
    offsetRef.current = clamped;
    track.style.transition = smooth ? "transform 400ms ease" : "none";
    track.style.transform = `translate3d(${-clamped}px, 0, 0)`;
  }, []);

  const measureBounds = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    maxOffsetRef.current = Math.max(0, track.scrollWidth - viewport.clientWidth);
    setOffset(offsetRef.current, false);
  }, [setOffset]);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const step = getScrollStep();
      const maxOffset = maxOffsetRef.current;

      if (direction === "right" && offsetRef.current >= maxOffset - 4) {
        setOffset(0, true);
        return;
      }

      if (direction === "left" && offsetRef.current <= 4) {
        setOffset(maxOffset, true);
        return;
      }

      setOffset(
        offsetRef.current + (direction === "left" ? -step : step),
        true,
      );
    },
    [getScrollStep, setOffset],
  );

  useLayoutEffect(() => {
    measureBounds();

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const observer = new ResizeObserver(measureBounds);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [measureBounds]);

  useEffect(() => {
    const pause = () => {
      pauseAutoRef.current = true;
    };
    const resume = () => {
      pauseAutoRef.current = false;
    };

    const timer = window.setInterval(() => {
      if (pauseAutoRef.current) return;
      scrollByStep("right");
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [scrollByStep]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      pauseAutoRef.current = true;
      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startOffset: offsetRef.current,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      if (Math.abs(deltaX) > 4) {
        drag.moved = true;
      }

      setOffset(drag.startOffset - deltaX, false);
    },
    [setOffset],
  );

  const finishDrag = useCallback((pointerId: number) => {
    const viewport = viewportRef.current;
    const drag = dragStateRef.current;
    if (!viewport || !drag || drag.pointerId !== pointerId) return;

    if (viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    dragStateRef.current = null;
    pauseAutoRef.current = false;
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const dominantDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (dominantDelta === 0 || maxOffsetRef.current <= 0) return;

      pauseAutoRef.current = true;
      setOffset(offsetRef.current + dominantDelta, false);

      window.clearTimeout((handleWheel as typeof handleWheel & { timeout?: number }).timeout);
      (handleWheel as typeof handleWheel & { timeout?: number }).timeout = window.setTimeout(
        () => {
          pauseAutoRef.current = false;
        },
        140,
      );

      event.preventDefault();
    },
    [setOffset],
  );

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-12">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-[60px] px-[clamp(16px,4vw,40px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(20px,3vw,32px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,913px)] lg:gap-[clamp(64px,10vw,140px)]">
          <div>
            <span className="mb-3 block font-montserrat text-sm lg:text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-[#15d286]">
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
              className="relative w-full overflow-hidden touch-pan-y lg:pl-[230px]"
              onMouseEnter={() => {
                pauseAutoRef.current = true;
              }}
              onMouseLeave={() => {
                pauseAutoRef.current = false;
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={(event) => finishDrag(event.pointerId)}
              onPointerCancel={(event) => finishDrag(event.pointerId)}
              onWheel={handleWheel}
            >
              <div
                ref={trackRef}
                className="flex h-[min(320px,70vw)] min-h-[260px] w-max gap-4 will-change-transform sm:gap-6 sm:h-[320px]"
              >
                {SERVICE_OFFERINGS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={`${item.title}-${index}`}
                      data-service-offering-card
                      className={`flex h-full w-[min(300px,calc(100vw-64px))] shrink-0 snap-start flex-col gap-[10px] rounded-[12px] px-5 py-6 ${
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
