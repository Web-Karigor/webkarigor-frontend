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
import { WEBSITE_DESIGN_DEVELOPMENT_HERO, WEBSITE_DESIGN_DEVELOPMENT_TRUSTED_LOGOS } from "@/lib/website-design-development-data";

const DEMO = WEBSITE_DESIGN_DEVELOPMENT_HERO.demo;
const TECH_CARD = DEMO.technologyCard;

/** Chart bar heights — layout only */
const TECH_BAR_HEIGHTS = [
  35, 55, 42, 78, 50, 88, 62, 70, 45, 82, 58, 90, 48, 75, 60, 68,
];


export default function Hero() {
  return (
    <section className="erp-hero relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1850px] px-[clamp(16px,3.5vw,50px)] pb-14 pt-[80px] sm:pt-[100px] lg:pb-20 lg:pt-[128px]">
        <div className="erp-hero-split flex w-full flex-col items-stretch gap-12 py-4 max-md:gap-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-12">
          {/* Left copy — Figma 636 × 388 */}
          <div className="erp-hero-copy flex shrink-0 flex-col justify-center lg:min-h-[388px]">
            <h1 className="m-0 font-montserrat text-[clamp(2.5rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {WEBSITE_DESIGN_DEVELOPMENT_HERO.titleLine1}
              <br />
              {WEBSITE_DESIGN_DEVELOPMENT_HERO.titleLine2}
              <br />
              <span className="relative inline-block">
                {WEBSITE_DESIGN_DEVELOPMENT_HERO.titleBrand}
                <Image
                  src={WEBSITE_DESIGN_DEVELOPMENT_HERO.titleBrandUnderline}
                  alt=""
                  width={350}
                  height={5}
                  className="absolute left-0 top-[calc(100%+4px)] h-auto"
                  unoptimized
                />
              </span>
            </h1>

            <p className="mt-6 m-0 max-w-[520px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7]">
              {WEBSITE_DESIGN_DEVELOPMENT_HERO.description}
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              <Link
                href={WEBSITE_DESIGN_DEVELOPMENT_HERO.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90"
              >
                {WEBSITE_DESIGN_DEVELOPMENT_HERO.primaryCta.label}
              </Link>
              <a
                href={`tel:${WEBSITE_DESIGN_DEVELOPMENT_HERO.hotline.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-5 py-3.5 font-montserrat text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#111827]" aria-hidden />
                {WEBSITE_DESIGN_DEVELOPMENT_HERO.hotlineLabel}: {WEBSITE_DESIGN_DEVELOPMENT_HERO.hotline}
              </a>
            </div>
          </div>

          {/* Right visual — 1st Figma image composition */}
          <div className="erp-hero-visual relative w-full max-w-[720px] shrink-0 pt-14 max-lg:mx-auto lg:ml-auto">
            <div className="relative aspect-[18/12] w-full">
              <Image
                src={WEBSITE_DESIGN_DEVELOPMENT_HERO.banner_image}
                alt=""
                fill
                className="rounded-[20px] object-cover shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
                sizes="(100vw)"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
