"use client";

import Image from "next/image";
import { useMemo } from "react";
import { openConsultationModal } from "@/components/home/ConsultationModal";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem } from "@/lib/home-page";
import "./HomeBanner.css";

/** Keep comma on the first line to match previous banner layout. */
function splitBannerTitle(title: string) {
  const trimmed = title.trim();
  const comma = trimmed.indexOf(",");
  if (comma < 0) return [trimmed];
  const first = trimmed.slice(0, comma + 1).trim();
  const second = trimmed.slice(comma + 1).trim();
  return second ? [first, second] : [first];
}

export default function HomeBanner() {
  const { data } = useHomePageQuery();
  const item = homeSectionItem(data?.data?.sections?.request_quote);

  const titleLines = useMemo(
    () => (item?.title ? splitBannerTitle(item.title) : []),
    [item?.title],
  );
  const description = item?.subtitle?.trim() ?? "";
  const ctaLabel = item?.button_text?.trim() ?? "";

  if (!item || !titleLines.length) return null;

  return (
    <section className="w-full relative overflow-hidden py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#5ee99e] via-[#b1e863] to-[#e6e85b]">
      <Image
        src="/rr.webp"
        alt=""
        fill
        className="object-cover object-center opacity-30 pointer-events-none select-none"
        style={{ zIndex: 0 }}
        loading="lazy"
      />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 gap-8">
        <div className="w-full text-center md:w-2/3 md:text-left">
          <h2 className="home-banner-title mb-2 block text-xl font-bold font-montserrat text-black sm:text-2xl md:flex md:flex-col md:gap-y-5 md:text-[32px] lg:text-[40px]">
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? " " : null}
                {line}
              </span>
            ))}
          </h2>
          {description ? (
            <p className="mt-3 text-base font-montserrat font-medium text-[#222] sm:mt-4 sm:text-lg md:text-[20px]">
              {description}
            </p>
          ) : null}
        </div>
        {ctaLabel ? (
          <div className="md:w-auto w-full flex md:justify-end justify-center">
            <button
              type="button"
              onClick={openConsultationModal}
              className="w-full sm:w-auto rounded-xl bg-black px-6 sm:px-7 py-3 font-montserrat text-base sm:text-lg md:text-[18px] font-medium capitalize text-white transition hover:bg-[#1a1a1a]"
              style={{ minWidth: "min(100%, 170px)" }}
            >
              {ctaLabel}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
