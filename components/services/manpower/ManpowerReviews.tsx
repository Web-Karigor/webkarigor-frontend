"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { MANPOWER_TESTIMONIALS } from "@/lib/manpower-data";

type Testimonial = (typeof MANPOWER_TESTIMONIALS)[number];

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < count;
        return (
          <Star
            key={i}
            className="h-4 w-4 shrink-0"
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

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article
      className="group flex w-[min(88vw,360px)] shrink-0 cursor-pointer flex-col rounded-[16px] border border-[#EEF0F3] bg-white p-6 shadow-[0_8px_28px_rgba(24,33,77,0.06)] transition-colors duration-300 hover:border-transparent hover:bg-[#0EC47B] sm:w-[340px] sm:p-7"
    >
      <Stars count={5} />

      <p className="mt-4 m-0 min-h-[100px] flex-1 font-montserrat text-[14px] font-medium leading-[1.65] text-[#475467] transition-colors duration-300 group-hover:text-white">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E8F3FE] ring-0 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-white/80">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div className="min-w-0">
          <p className="m-0 font-montserrat text-[14px] font-bold leading-tight text-[#18214D] transition-colors duration-300 group-hover:text-white">
            {item.name}
          </p>
          <p className="m-0 mt-0.5 truncate font-montserrat text-[12px] font-medium leading-tight text-[#98A2B3] transition-colors duration-300 group-hover:text-white/80">
            {item.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: readonly Testimonial[];
  direction: "rtl" | "ltr";
}) {
  const copies = [...items, ...items];

  return (
    <div className="service-testimonials-track w-full overflow-hidden">
      <div
        className={`service-testimonials-row ${
          direction === "rtl"
            ? "service-testimonials-row--rtl"
            : "service-testimonials-row--ltr"
        }`}
      >
        {copies.map((item, index) => (
          <TestimonialCard
            key={`${direction}-${item.name}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default function ManpowerReviews() {
  const topRow = MANPOWER_TESTIMONIALS;
  const bottomRow = [...MANPOWER_TESTIMONIALS].reverse();

  return (
    <section className="w-full overflow-hidden bg-white py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto mb-10 w-full max-w-[1800px] px-[clamp(16px,3.5vw,50px)] text-center lg:mb-12">
        <p className="m-0 font-montserrat text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0EC47B]">
          What our clients say
        </p>
        <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#18214D]">
          The world&apos;s best companies are using our service
        </h2>
      </div>

      {/* Full-bleed dual marquee */}
      <div className="flex w-full flex-col gap-5">
        <MarqueeRow items={topRow} direction="rtl" />
        <MarqueeRow items={bottomRow} direction="ltr" />
      </div>
    </section>
  );
}
