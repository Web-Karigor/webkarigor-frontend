"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import servicesContent from "@/data/services-content.json";
import { TESTIMONIALS } from "@/lib/services-data";

const AUTO_MS = 4200;
const GAP_PX = 16;
const DRAG_THRESHOLD_PX = 48;

const {
  eyebrow,
  title,
  description,
  summary,
  avatars: AVATARS,
} = servicesContent.testimonials;

function Stars({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-1 text-[#feed35]"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          className="shrink-0"
          style={{ width: size, height: size }}
          fill="currentColor"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function ServiceTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
  });

  const total = TESTIMONIALS.length;
  const maxIndex = Math.max(0, total - visible);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.min(Math.max(index, 0), maxIndex));
    },
    [maxIndex],
  );

  const stepWidth = useCallback(() => {
    const width = viewportRef.current?.clientWidth ?? 0;
    if (width <= 0) return 0;
    return (width - (visible - 1) * GAP_PX) / visible + GAP_PX;
  }, [visible]);

  useEffect(() => {
    const update = () => setVisible(window.matchMedia("(min-width: 640px)").matches ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActive((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || isDragging || maxIndex <= 0) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused, isDragging, maxIndex]);

  const endDrag = useCallback(
    (clientX: number) => {
      const { startX, velocity, moved, pointerId } = dragRef.current;
      if (pointerId < 0) return;

      const delta = clientX - startX;
      const width = stepWidth();
      let next = active;

      if (moved) {
        const distanceThreshold = Math.max(DRAG_THRESHOLD_PX, width * 0.18);
        if (delta <= -distanceThreshold || velocity < -0.45) {
          next = active + 1;
        } else if (delta >= distanceThreshold || velocity > 0.45) {
          next = active - 1;
        }
      }

      dragRef.current.pointerId = -1;
      setIsDragging(false);
      setDragX(0);
      goTo(next);
    },
    [active, goTo, stepWidth],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || maxIndex <= 0) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
    setIsDragging(true);
    setPaused(true);
    setDragX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    const now = performance.now();
    const dx = event.clientX - drag.lastX;
    const dt = Math.max(now - drag.lastT, 1);
    drag.velocity = dx / dt;
    drag.lastX = event.clientX;
    drag.lastT = now;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 6) drag.moved = true;

    const atStart = active <= 0 && delta > 0;
    const atEnd = active >= maxIndex && delta < 0;
    const resistance = atStart || atEnd ? 0.35 : 1;
    setDragX(delta * resistance);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
    endDrag(event.clientX);
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.pointerId = -1;
    setIsDragging(false);
    setDragX(0);
  };

  const baseTranslate = `calc(-${active} * ((100% - ${(visible - 1) * GAP_PX}px) / ${visible} + ${GAP_PX}px))`;
  const trackTransform =
    dragX !== 0
      ? `translateX(calc(${baseTranslate} + ${dragX}px))`
      : `translateX(${baseTranslate})`;

  return (
    <section className="bg-[#f2f2f2] py-8">
      <div className="mx-auto w-full max-w-[1920px] px-[clamp(16px,6.25vw,120px)]">
        <div className="mx-auto mb-8 max-w-[760px] text-center lg:mb-10">
          <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#15d286]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-montserrat text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] font-montserrat text-[clamp(13px,1vw,16px)] font-medium leading-[1.5] text-[#98a2b3]">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:gap-[10px]">
          <article className="flex w-full shrink-0 flex-col items-center justify-center rounded-[24px] bg-[#0a7d5f] px-8 py-10 text-center text-white lg:w-[min(360px,32%)] lg:min-h-[380px]">
            <span className="font-montserrat text-[clamp(48px,5vw,72px)] font-bold leading-none">
              {summary.rating}
            </span>
            <div className="mt-3">
              <Stars count={5} size={22} />
            </div>
            <p className="mt-3 font-montserrat text-[14px] font-medium text-white/90">
              {summary.reviewsLabel}
            </p>
            <p className="mt-5 max-w-[230px] font-montserrat text-[clamp(16px,1.3vw,20px)] font-semibold leading-[1.35]">
              {summary.headline}
            </p>

            <div className="mt-8 flex items-center justify-center">
              {AVATARS.map((src, index) => (
                <div
                  key={src}
                  className="relative h-11 w-11 overflow-hidden rounded-full border-[2.5px] border-[#0a7d5f] bg-[#e7eef6]"
                  style={{
                    marginLeft: index === 0 ? 0 : -12,
                    zIndex: index + 1,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
              ))}
            </div>
          </article>

          <div
            className="flex min-w-0 flex-1 flex-col lg:min-h-[380px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              if (!isDragging) setPaused(false);
            }}
          >
            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                type="button"
                aria-label="Previous testimonials"
                disabled={active <= 0}
                onClick={() => goTo(active - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#111827] transition-colors hover:border-[#9ca3af] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                disabled={active >= maxIndex}
                onClick={() => goTo(active + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#111827] transition-colors hover:border-[#9ca3af] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              </button>
            </div>

            <div className="mt-auto flex flex-col">
              <div
                ref={viewportRef}
                className={`overflow-hidden touch-pan-y ${
                  isDragging ? "cursor-grabbing select-none" : "cursor-grab"
                }`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
              >
                <div
                  className={`flex gap-4 ease-out ${
                    isDragging
                      ? "transition-none"
                      : "transition-transform duration-500"
                  }`}
                  style={{ transform: trackTransform }}
                >
                  {TESTIMONIALS.map((item) => (
                    <article
                      key={`${item.name}-${item.role}`}
                      className="w-full min-w-0 shrink-0 basis-full sm:basis-[calc((100%-1rem)/2)]"
                    >
                      <div className="flex h-full min-h-[280px] flex-col rounded-[20px] bg-white p-7 lg:min-h-[300px] lg:p-8">
                        <div className="flex items-center gap-2">
                          <Stars count={item.rating} size={16} />
                          <span className="font-montserrat text-[14px] font-semibold text-[#111827]">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <p className="mt-5 flex-1 font-montserrat text-[15px] font-medium leading-[1.65] text-[#98a2b3] lg:text-[16px]">
                          {item.quote}
                        </p>

                        <div className="mt-6">
                          <p className="m-0 font-montserrat text-[16px] font-bold text-[#111827]">
                            {item.name}
                          </p>
                          <p className="mt-1 font-montserrat text-[13px] font-medium text-[#98a2b3]">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-9 bg-[#4b5563]"
                          : "w-4 bg-[#d1d5db] hover:bg-[#9ca3af]"
                      }`}
                    />
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
