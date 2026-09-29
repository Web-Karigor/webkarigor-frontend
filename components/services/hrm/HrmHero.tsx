"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { HRM_HERO, HRM_TRUSTED_LOGOS } from "@/lib/hrm-data";

const DEMO = HRM_HERO.demo;
const TECH_CARD = DEMO.technologyCard;

/** Chart bar heights — layout only */
const TECH_BAR_HEIGHTS = [
  35, 55, 42, 78, 50, 88, 62, 70, 45, 82, 58, 90, 48, 75, 60, 68,
];


export default function ErpHero() {
  return (
    <section className="erp-hero relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1850px] px-[clamp(16px,3.5vw,50px)] pb-14 pt-[80px] sm:pt-[100px] lg:pb-20 lg:pt-[128px]">
        <div className="erp-hero-split flex w-full flex-col items-stretch gap-12 py-4 max-md:gap-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-12">
          {/* Left copy — Figma 636 × 388 */}
          <div className="erp-hero-copy flex w-full max-w-[636px] shrink-0 flex-col justify-center lg:min-h-[388px]">
            <h1 className="m-0 font-montserrat text-[clamp(2.5rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {HRM_HERO.titleLine1}
              <br />
              {HRM_HERO.titleLine2}
              <br />
              <span className="relative inline-block">
                {HRM_HERO.titleBrand}
                <svg
                  className="pointer-events-none absolute -bottom-0.5 left-0 w-full"
                  viewBox="0 0 220 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 7 C40 2, 90 9, 140 4 C165 2, 195 6, 218 3"
                    stroke="#A7F3D0"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 m-0 max-w-[520px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7]">
              {HRM_HERO.description}
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              <Link
                href={HRM_HERO.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90"
              >
                {HRM_HERO.primaryCta.label}
              </Link>
              <a
                href={`tel:${HRM_HERO.hotline.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-5 py-3.5 font-montserrat text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#111827]" aria-hidden />
                {HRM_HERO.hotlineLabel}: {HRM_HERO.hotline}
              </a>
            </div>
          </div>

          {/* Right visual — 1st Figma image composition */}
          <div className="erp-hero-visual relative w-full max-w-[840px] shrink-0 pt-14 max-lg:mx-auto lg:ml-auto">
            <div className="relative aspect-[18/13] w-full">
              <Image
                src={HRM_HERO.banner_image}
                alt=""
                fill
                className="object-cover"
                sizes="(100vw)"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust / logo bar */}
      <div className="w-full bg-[#F7F8FA]">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 px-[clamp(16px,3.5vw,50px)] py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
            {HRM_TRUSTED_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={100}
                height={100}
                className="h-6 w-auto object-contain opacity-60 grayscale sm:h-7"
                unoptimized
              />
            ))}
          </div>
          <div className="flex h-auto w-full max-w-[566px] shrink-0 flex-col gap-5 text-left sm:w-[566px] sm:text-right">
            <p className="m-0 font-montserrat text-[36px] font-bold leading-[1.3] tracking-[-0.02em] text-[#183B56]">
              {HRM_HERO.trustTitle}
            </p>
            <p className="m-0 font-montserrat text-[16px] font-medium leading-[1.55] text-[#5A7184]">
              {HRM_HERO.trustDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
