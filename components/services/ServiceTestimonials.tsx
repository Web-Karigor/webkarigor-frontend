"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import servicesContent from "@/data/services-content.json";
import { TESTIMONIALS } from "@/lib/services-data";

const AUTO_MS = 4200;
const GAP_PX = 16;

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
  const total = TESTIMONIALS.length;
  const maxIndex = Math.max(0, total - visible);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.min(Math.max(index, 0), maxIndex));
    },
    [maxIndex],
  );

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
    if (paused || maxIndex <= 0) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

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

        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:gap-[10px]">
          <article className="flex w-full shrink-0 flex-col items-center justify-center rounded-[24px] bg-[#0a7d5f] px-8 py-10 text-center text-white lg:w-[min(360px,32%)] lg:min-h-[360px]">
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
            className="min-w-0 flex-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(calc(-${active} * ((100% - ${(visible - 1) * GAP_PX}px) / ${visible} + ${GAP_PX}px)))`,
                }}
              >
                {TESTIMONIALS.map((item) => (
                  <article
                    key={`${item.name}-${item.role}`}
                    className="w-full min-w-0 shrink-0 basis-full sm:basis-[calc((100%-1rem)/2)]"
                  >
                    <div className="flex h-full min-h-[280px] flex-col rounded-[20px] bg-white p-7 lg:min-h-[320px] lg:p-8">
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
    </section>
  );
}
