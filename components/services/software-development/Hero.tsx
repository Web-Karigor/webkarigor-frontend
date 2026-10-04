"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { HERO } from "@/lib/software-development-data";
import { scrollAppTo } from "@/lib/smooth-scroll";
import { ERP_HERO } from "@/lib/erp-data";

/** Desktop hero image geometry — Figma placement */
const HERO_LAYOUT = {
  width: 869,
  height: 873,
} as const;

/** Doodle positions — layout only; src from JSON */
const DOODLE_LAYOUT = [
  { width: 161.41, height: 286.6, top: 124, left: 1047, rotate: -29.01 },
  { width: 161.41, height: 286.6, top: 84, left: 1677, rotate: -29.01 },
] as const;

function BdFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="14" fill="#006A4E" rx="1" />
      <circle cx="9" cy="7" r="4" fill="#F42A41" />
    </svg>
  );
}

export default function Hero() {
  const [phone, setPhone] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    scrollAppTo("#contact");
  };

  return (
    <section
      className="mp-hero relative overflow-hidden lg:h-[742px]"
      style={{
        /* Figma Frame 1920×850 — Fill #F4FFFB + soft lime/cyan blobs */
        backgroundColor: "#F4FFFB",
        backgroundImage: [
          "radial-gradient(ellipse 46% 62% at 66% 46%, rgba(210,255,120,0.58) 0%, rgba(190,255,170,0.28) 42%, transparent 70%)",
          "radial-gradient(ellipse 40% 55% at 84% 52%, rgba(110,230,240,0.52) 0%, rgba(150,240,250,0.22) 45%, transparent 72%)",
          "radial-gradient(ellipse 55% 70% at 74% 48%, rgba(180,255,210,0.32) 0%, transparent 68%)",
          "linear-gradient(180deg, #F4FFFB 0%, #F4FFFB 100%)",
        ].join(", "),
      }}
    >
      {/* Desktop visual — image flush to gradient bottom + doodles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[2] mx-auto hidden h-full w-full max-w-[1920px] lg:block">
        {DOODLE_LAYOUT.map((doodle, i) => (
          <Image
            key={`doodle-${i}`}
            src={HERO.doodleSrc}
            alt=""
            width={Math.round(doodle.width)}
            height={Math.round(doodle.height)}
            unoptimized
            className="absolute object-contain"
            style={{
              left: doodle.left,
              top: doodle.top,
              width: doodle.width,
              height: doodle.height,
              transform: `rotate(${doodle.rotate}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1800px] items-center px-[clamp(16px,3.5vw,50px)] pt-[80px] pb-6 sm:pt-[96px] sm:pb-8 lg:pt-[108px] lg:pb-0">
        <div className="flex w-full flex-col items-stretch gap-6 md:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Left — copy + phone CTA */}
          <div className="mp-hero-copy flex w-full max-w-none shrink-0 flex-col  lg:max-w-[620px]">
            <h1 className="m-0 font-montserrat text-[clamp(1.75rem,5.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {HERO.title}
            </h1>

            <p className="mt-4 m-0 max-w-[520px] font-manrope text-[clamp(15px,1.6vw,17px)] font-semibold leading-[160%] text-[#98A2B3] md:mt-5">
              {HERO.description}
            </p>

            <div className="mt-6 flex w-full max-w-[520px] flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-4">
              <Link
                href={ERP_HERO.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90"
              >
                {ERP_HERO.primaryCta.label}
              </Link>
              <a
                href={`tel:${HERO.hotline.replace(/-/g, "")}`}
                className="mt-3 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-4 py-2.5 font-montserrat text-[13px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03] sm:mt-4 sm:w-fit sm:justify-start sm:text-[14px]"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F7] text-[#111827]">
                  <Phone className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                </span>
                {HERO.hotlineLabel}: {HERO.hotline}
              </a>
            </div>

          </div>

          {/* Mobile / tablet — bottom-aligned cutout */}
          <div className="erp-hero-visual relative w-full max-w-[720px] shrink-0 pt-14 max-lg:mx-auto lg:ml-auto">
            <div className="relative aspect-[18/12] w-full">
              <Image
                src={HERO.heroImage}
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
