"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Star } from "lucide-react";
import { useClientReviewSoftwareDevelopmentQuery } from "@/hooks/queries/useClientReviewSoftwareDevelopmentQuery";

const SECTION_EYEBROW = "What Our Clients Say";
const SECTION_TITLE =
  "Providing custom software development services to help businesses create scalable software solutions that meet their specific requirements.";
const FALLBACK_AVATAR = "/sm1.webp";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

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
    <article className="group flex w-[min(88vw,360px)] shrink-0 cursor-pointer flex-col rounded-[16px] border border-[#EEF0F3] bg-white p-6 shadow-[0_8px_28px_rgba(24,33,77,0.06)] transition-colors duration-300 hover:border-transparent hover:bg-[#0EC47B] sm:w-[340px] sm:p-7">
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
            loading="lazy"
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
    <div className="group/testimonials w-full overflow-hidden">
      <div
        className={`flex w-max gap-5 will-change-transform motion-reduce:animate-none group-hover/testimonials:[animation-play-state:paused] ${
          direction === "rtl"
            ? "animate-testimonials-rtl [animation-duration:110s]"
            : "animate-testimonials-ltr [animation-duration:110s]"
        }`}
      >
        {copies.map((item, index) => (
          <TestimonialCard
            key={`${direction}-${item.id}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const { data } = useClientReviewSoftwareDevelopmentQuery();
  const testimonials = useMemo(
    () =>
      [...(data?.data?.posts ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((post) => ({
          id: post.id,
          quote: post.fields?.quote?.trim() ?? "",
          name: post.fields?.name?.trim() ?? "",
          role: post.fields?.role?.trim() ?? "",
          avatar: post.fields?.avatar?.trim() || FALLBACK_AVATAR,
        }))
        .filter((item) => item.quote && item.name),
    [data],
  );

  const topRow = testimonials;
  const bottomRow = useMemo(() => [...testimonials].reverse(), [testimonials]);

  if (!testimonials.length) return null;

  return (
    <section className="w-full overflow-hidden bg-white py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto mb-10 flex w-full max-w-[1800px] flex-col items-start gap-4 px-[clamp(16px,3.5vw,50px)] md:flex-row md:items-start md:gap-10 lg:mb-12 lg:gap-16">
        <p className="m-0 shrink-0 font-museoModerno text-[22px] font-semibold uppercase leading-[1.2] tracking-[0.04em] text-[#0EC47B] sm:text-[28px] md:text-[32px] lg:-mt-2 lg:whitespace-nowrap lg:text-[40px]">
          {SECTION_EYEBROW}
        </p>
        <h2 className="m-0 min-w-0 w-full max-w-[520px] text-left font-montserrat text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-[#4b5563] md:ml-auto">
          {SECTION_TITLE}
        </h2>
      </div>

      <div className="flex w-full flex-col gap-5">
        <MarqueeRow items={topRow} direction="rtl" />
        <MarqueeRow items={bottomRow} direction="ltr" />
      </div>
    </section>
  );
}
