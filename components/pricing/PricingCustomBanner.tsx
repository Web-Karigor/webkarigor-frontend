import Image from "next/image";
import Link from "next/link";

/**
 * Figma Frame 156 — 1920 × 300
 * Same layout/copy as home HomeBanner
 */
export default function PricingCustomBanner() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 300 }}
    >
      {/* Figma Rectangle 79 gradient fill */}
      <Image
        src="/pricing/rectangle-79.png"
        alt=""
        fill
        className="pointer-events-none object-cover object-center select-none"
        sizes="1920px"
        priority={false}
      />
      <Image
        src="/rr.png"
        alt=""
        fill
        className="pointer-events-none object-cover object-center opacity-30 select-none"
        sizes="1920px"
      />

      <div className="relative z-10 mx-auto flex min-h-[300px] w-full max-w-7xl flex-col items-center justify-between gap-8 px-4 py-12 sm:px-6 sm:py-14 md:flex-row">
        <div className="w-full md:w-2/3">
          <h2 className="m-0 mb-2 flex flex-col gap-y-2 font-montserrat text-xl font-bold text-black sm:text-2xl md:gap-y-5 md:text-[32px] lg:text-[40px]">
            <span>Every product is different</span>
            <span>Your pricing should be too</span>
          </h2>
          <p className="mt-3 m-0 font-montserrat text-base font-medium text-[#222] sm:mt-4 sm:text-lg md:text-[20px]">
            Looking for a custom solution or specific service?
          </p>
        </div>

        <div className="flex w-full justify-center md:w-auto md:justify-end">
          <Link
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-montserrat text-lg font-semibold text-black shadow-lg transition hover:bg-[#f3f3f3] sm:w-auto sm:px-7 sm:text-xl md:text-[24px]"
            style={{ minWidth: "min(100%, 170px)" }}
          >
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
