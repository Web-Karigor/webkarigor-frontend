"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, Star } from "lucide-react";
import { ERP_TESTIMONIALS } from "@/lib/erp-data";

/** Figma Testimonial — 1792 × 592 · cards 555 × 388 */
const CARD_W = 555;
const CARD_H = 388;
const CARD_GAP = 24;
const VISIBLE = 3;

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < count;
        return (
          <Star
            key={i}
            className="h-5 w-5 shrink-0"
            fill={filled ? "#F5C518" : "none"}
            stroke={filled ? "#F5C518" : "#D1D5DB"}
            strokeWidth={1.5}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

export default function ErpReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, ERP_TESTIMONIALS.length - VISIBLE);

  const scrollTo = useCallback((i: number) => {
    const next = Math.min(Math.max(i, 0), maxIndex);
    setIndex(next);
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: next * (CARD_W + CARD_GAP),
      behavior: "smooth",
    });
  }, [maxIndex]);

  const prev = useCallback(() => scrollTo(index - 1), [index, scrollTo]);
  const next = useCallback(() => scrollTo(index + 1), [index, scrollTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / (CARD_W + CARD_GAP));
      setIndex(Math.min(Math.max(i, 0), maxIndex));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [maxIndex]);

  return (
    <section className="overflow-hidden bg-white py-[clamp(48px,5vw,72px)]">
      {/* Figma: 1792 × 592 */}
      <div className="mx-auto flex w-full max-w-[1792px] flex-col gap-10 px-[clamp(16px,3vw,64px)]">
        {/* Header — title left, arrows right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0EC47B] text-white"
              aria-hidden
            >
              <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            </span>
            <h2 className="m-0 font-montserrat text-[clamp(24px,2.8vw,32px)] font-bold leading-none tracking-[-0.02em] text-[#18214D]">
              Ehya is loved by users
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index <= 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D0D5DD] bg-white text-[#18214D] transition-opacity hover:border-[#18214D] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous reviews"
            >
              <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxIndex}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#18214D] bg-white text-[#18214D] transition-opacity hover:bg-[#18214D]/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next reviews"
            >
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        {/* Cards — Figma 555 × 388, 3 visible */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ERP_TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="flex w-[min(100%,calc(100vw-2rem))] shrink-0 snap-start flex-col rounded-[12px] border border-[#EEF0F3] bg-white p-6 shadow-[0_8px_30px_rgba(24,33,77,0.06)] sm:h-auto sm:w-[min(555px,85vw)] sm:p-10 md:p-12 lg:min-h-[388px]"
            >
              <Stars count={item.rating} />

              <p className="mt-8 m-0 flex-1 font-montserrat text-[clamp(15px,1.15vw,18px)] font-medium leading-[1.7] text-[#18214D]">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-8">
                <p className="m-0 font-montserrat text-[16px] font-bold leading-tight text-[#18214D]">
                  {item.name}
                </p>
                <p className="m-0 mt-1.5 font-montserrat text-[14px] font-medium leading-tight text-[#98A2B3]">
                  {item.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
