"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePricingPageQuery } from "@/hooks/queries/usePricingPageQuery";
import { mapCompletePackages } from "@/lib/pricing-page";
import { PACKAGE_SECTION } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

/** Figma: 1520 × 696 Hug, radius ~48 */
const PACKAGE_W = 1520;

function PackageStar() {
  return (
    <svg
      viewBox="0 0 17 17"
      className="h-[17px] w-[17px] shrink-0"
      aria-hidden
    >
      <path
        fill="#FFEF3F"
        d="M8.5 0 10.3 6.7 17 8.5 10.3 10.3 8.5 17 6.7 10.3 0 8.5 6.7 6.7Z"
      />
    </svg>
  );
}

export default function PricingPackage() {
  const { data } = usePricingPageQuery();
  const packages = useMemo(() => mapCompletePackages(data), [data]);
  const { ellipseSrc, starSrc } = PACKAGE_SECTION;
  const title = packages.title;
  const columns = packages.columns;
  if (!title && !columns.length) return null;

  return (
    <section className="bg-[#F8F6EF] py-[clamp(48px,6vw,80px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PACKAGE_W + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto overflow-hidden rounded-[24px] bg-black sm:rounded-[36px] lg:rounded-[48px]"
          style={{
            maxWidth: PACKAGE_W,
          }}
        >
          {/* Figma Ellipse 1569 — top: slightly inset | bottom: more inset */}
          {ellipseSrc ? (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            {/* Top-left — slightly inward from left */}
            <Image
              src={ellipseSrc}
              alt=""
              width={480}
              height={480}
              className="absolute left-0 top-[-180px] h-[min(320px,80vw)] w-[min(320px,80vw)] max-w-none select-none sm:top-[-250px] sm:h-[480px] sm:w-[480px]" loading="lazy"/>
            {/* Top-right — slightly inward from right */}
            <Image
              src={ellipseSrc}
              alt=""
              width={480}
              height={480}
              className="absolute right-0 top-[-180px] h-[min(320px,80vw)] w-[min(320px,80vw)] max-w-none select-none sm:top-[-250px] sm:h-[480px] sm:w-[480px]" loading="lazy"/>
            {/* Bottom-left — more inward from left */}
            <Image
              src={ellipseSrc}
              alt=""
              width={480}
              height={480}
              className="absolute bottom-[-180px] left-[10%] h-[min(320px,80vw)] w-[min(320px,80vw)] max-w-none select-none sm:bottom-[-250px] sm:left-[160px] sm:h-[480px] sm:w-[480px]" loading="lazy"/>
            {/* Bottom-right — more inward from right */}
            <Image
              src={ellipseSrc}
              alt=""
              width={480}
              height={480}
              className="absolute bottom-[-180px] right-[10%] h-[min(320px,80vw)] w-[min(320px,80vw)] max-w-none select-none sm:bottom-[-250px] sm:right-[160px] sm:h-[480px] sm:w-[480px]" loading="lazy"/>
          </div>
          ) : null}

          <div className="pricing-package-inner relative z-[1] flex flex-col px-[clamp(20px,5vw,72px)] pb-[clamp(32px,5vw,56px)] pt-[clamp(32px,5vw,56px)] lg:min-h-[696px]">
            <h2 className="m-0 mx-auto max-w-[820px] text-center font-montserrat text-[clamp(22px,5.5vw,40px)] font-bold leading-[1.3] tracking-[-0.03em] text-white">
              {title}
            </h2>

            <div className="pricing-package-grid mt-[clamp(28px,5vw,56px)] grid flex-1 grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-4 lg:gap-x-12">
              {columns.map((column, colIndex) => (
                <ul
                  key={colIndex}
                  className="m-0 flex list-none flex-col gap-[14px] p-0"
                >
                  {column.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-montserrat text-[clamp(14px,3.5vw,18px)] font-medium leading-[1.4] text-white"
                    >
                      {starSrc ? (
                        <Image
                          src={starSrc}
                          alt=""
                          width={17}
                          height={17}
                          className="h-[17px] w-[17px] shrink-0"
                          aria-hidden
                          loading="lazy"
                        />
                      ) : (
                        <PackageStar />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
