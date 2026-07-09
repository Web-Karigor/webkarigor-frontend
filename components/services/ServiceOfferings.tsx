"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { SERVICE_OFFERINGS } from "@/lib/services-data";

const CARD_GAP = 24;
const AUTO_SCROLL_MS = 4500;

export default function ServiceOfferings() {
  const trackRef = useRef<HTMLDivElement>(null);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return CARD_GAP;

    const card = track.querySelector<HTMLElement>("[data-service-offering-card]");
    return (card?.offsetWidth ?? 372) + CARD_GAP;
  }, []);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const track = trackRef.current;
      if (!track) return;

      const step = getScrollStep();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (direction === "right" && track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      if (direction === "left" && track.scrollLeft <= 4) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }

      track.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    },
    [getScrollStep],
  );

  useLayoutEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    const timer = window.setInterval(() => {
      if (paused) return;
      scrollByStep("right");
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [scrollByStep]);

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-12">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-[60px] px-[clamp(16px,4vw,40px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(20px,3vw,32px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,913px)] lg:gap-[clamp(64px,10vw,140px)]">
          <div>
            <span className="mb-3 block font-montserrat text-sm lg:text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-[#15d286]">
              Industries
            </span>
            <h2 className="m-0 font-bold text-[32px] font-['Geist'] text-black max-w-[460px]">
              Design Solutions Tailored for Every Industry
            </h2>
          </div>
          <p className="m-0 w-full max-w-[913px] justify-start text-left font-['Manrope'] text-base font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:min-h-[96px] lg:text-[32px]">
            We&apos;ve partnered with businesses across diverse industries to create
            digital experiences that solve specific challenges.
          </p>
        </div>

        <div className="mr-[calc(-1*var(--offerings-bleed-right))] w-[calc(100%+var(--offerings-bleed-right))] [--offerings-bleed-right:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]">
          <div className="relative w-full">
            <button
              type="button"
              className="absolute left-40 top-1/2 z-[3] inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] hover:translate-y-[calc(-50%-1px)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              onClick={() => scrollByStep("left")}
              aria-label="Previous industries"
            >
              <ArrowLeft className="h-[22px] w-[22px] stroke-[1.5]" aria-hidden />
            </button>

            <div
              ref={trackRef}
              className="flex h-[320px] w-full gap-6  lg:pl-[230px]"
            >
              {SERVICE_OFFERINGS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={`${item.title}-${index}`}
                    data-service-offering-card
                    className={`flex h-[320px] w-[300px] shrink-0 snap-start flex-col gap-[10px] rounded-[12px] px-5 py-6 ${
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
    </section>
  );
}
