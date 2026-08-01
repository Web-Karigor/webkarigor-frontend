"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  ECO_REVIEW_AVATARS,
  ECO_REVIEWS_SECTION,
  ECO_TESTIMONIALS,
} from "@/lib/ecommerce-data";

const AUTO_MS = 4200;
const GAP_PX = 20;

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < count;
        return (
          <Star
            key={index}
            className="shrink-0"
            style={{ width: size, height: size }}
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

export default function EcoReviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(1);
  const total = ECO_TESTIMONIALS.length;
  const maxIndex = Math.max(0, total - visible);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.min(Math.max(index, 0), maxIndex));
    },
    [maxIndex],
  );

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setVisible(2);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setVisible(2);
      } else {
        setVisible(1);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setActive((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex <= 0) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

  return (
    <section className="overflow-hidden bg-[#F5F5EB] py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-10 px-[clamp(16px,4vw,40px)] lg:flex-row lg:items-center lg:gap-[clamp(32px,4vw,64px)]">
        {/* Left — top block 474×136 (gap 12), then title */}
        <div className="flex w-full max-w-[474px] shrink-0 flex-col gap-8">
          <div className="flex w-full flex-col gap-3">
            <p className="m-0 font-montserrat text-[16px] font-semibold leading-none text-[#15d286]">
              {ECO_REVIEWS_SECTION.eyebrow}
            </p>

            <div className="flex w-full items-center justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="font-montserrat text-[48px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
                  {ECO_REVIEWS_SECTION.rating}
                </span>
                <span className="font-montserrat text-[14px] font-medium leading-none text-[#9CA3AF]">
                  {ECO_REVIEWS_SECTION.ratingLabel}
                </span>
              </div>

              <div className="flex items-center">
                {ECO_REVIEW_AVATARS.map((src, index) => (
                  <div
                    key={src}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-[2.5px] border-[#F7F5EF] bg-[#e7eef6]"
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
                      sizes="40px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="m-0 w-full max-w-[474px] font-montserrat text-[36px] font-bold leading-[150%] tracking-normal text-[#272B34]">
            {ECO_REVIEWS_SECTION.title}
          </h2>
        </div>

        {/* Right — review cards slider (bleeds right) */}
        <div
          className="min-w-0 flex-1 lg:mr-[calc(-1*var(--eco-review-bleed))] lg:w-[calc(100%+var(--eco-review-bleed))] lg:[--eco-review-bleed:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                gap: GAP_PX,
                transform: `translateX(calc(-${active} * ((100% - ${(visible - 1) * GAP_PX}px) / ${visible} + ${GAP_PX}px)))`,
              }}
            >
              {ECO_TESTIMONIALS.map((item) => (
                <article
                  key={`${item.name}-${item.role}`}
                  className="w-full min-w-0 shrink-0"
                  style={{
                    flexBasis:
                      visible === 1
                        ? "100%"
                        : `calc((100% - ${GAP_PX}px) / ${visible})`,
                  }}
                >
                  <div className="flex h-full min-h-[280px] flex-col rounded-[16px] bg-white p-7 shadow-[0_8px_30px_rgba(24,59,86,0.06)] lg:min-h-[300px] lg:p-8">
                    <p className="m-0 flex-1 font-montserrat text-[15px] font-medium italic leading-[1.7] text-[#98A2B3] lg:text-[16px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="mt-6">
                      <p className="m-0 font-montserrat text-[16px] font-bold text-[#111827]">
                        {item.name}
                      </p>
                      <p className="mt-1 font-montserrat text-[13px] font-medium text-[#98A2B3]">
                        {item.role}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <Stars count={item.rating} size={15} />
                      <span className="font-montserrat text-[13px] font-semibold text-[#111827]">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => {
              const isActive = index === active;
              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-[#F5C518]"
                      : "bg-[#E5E7EB] hover:bg-[#D1D5DB]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
