import Image from "next/image";
import Link from "next/link";
import { PRICING_CUSTOM_BANNER } from "@/lib/pricing-data";

/**
 * Figma Frame 156 — 1920 × 300
 * Same layout/copy as home HomeBanner
 */
export default function PricingCustomBanner() {
  const { backgroundSrc, overlaySrc, titleLines, description, cta } =
    PRICING_CUSTOM_BANNER;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 300 }}
    >
      {/* Figma Rectangle 79 gradient fill */}
      <Image
        src={backgroundSrc}
        alt=""
        fill
        className="pointer-events-none object-cover object-center select-none"
        sizes="1920px"
        priority={false}
      />
      <Image
        src={overlaySrc}
        alt=""
        fill
        className="pointer-events-none object-cover object-center opacity-30 select-none"
        sizes="1920px"
      />

      <div className="relative z-10 mx-auto flex min-h-[300px] w-full max-w-7xl flex-col items-center justify-between gap-8 px-4 py-12 sm:px-6 sm:py-14 md:flex-row">
        <div className="w-full md:w-2/3">
          <h2 className="pricing-banner-title m-0 mb-2 flex flex-col gap-y-2 font-montserrat text-xl font-bold text-black sm:text-2xl md:gap-y-5 md:text-[32px] lg:text-[40px]">
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="mt-3 m-0 font-montserrat text-base font-medium text-[#222] sm:mt-4 sm:text-lg md:text-[20px]">
            {description}
          </p>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-end">
          <Link
            href={cta.href}
            className="inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 font-montserrat text-base font-medium capitalize text-white transition hover:bg-[#1a1a1a] sm:w-auto sm:px-7 sm:text-lg md:text-[18px]"
            style={{ minWidth: "min(100%, 170px)" }}
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
