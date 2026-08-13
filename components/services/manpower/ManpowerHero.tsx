"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { MANPOWER_HERO } from "@/lib/manpower-data";

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

export default function ManpowerHero() {
  const [phone, setPhone] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden lg:h-[742px]"
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
      <header className="fixed inset-x-0 top-0 z-50 w-full bg-white shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1800px] items-center justify-between px-[clamp(16px,3.5vw,50px)] sm:h-[88px] lg:h-[108px]">
          <Link
            href={MANPOWER_HERO.brandHref}
            className="font-museoModerno text-[clamp(22px,2vw,28px)] font-semibold leading-none text-black"
          >
            {MANPOWER_HERO.brand}
          </Link>
          <Link
            href={MANPOWER_HERO.navCta.href}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0EC47B] px-5 py-2.5 font-montserrat text-[clamp(13px,1vw,15px)] font-bold text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
          >
            {MANPOWER_HERO.navCta.label}
          </Link>
        </div>
      </header>

      {/* Desktop visual — image flush to gradient bottom + doodles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[2] mx-auto hidden h-full w-full max-w-[1920px] lg:block">
        <Image
          src={MANPOWER_HERO.heroImage}
          alt={MANPOWER_HERO.heroImageAlt}
          width={HERO_LAYOUT.width}
          height={HERO_LAYOUT.height}
          priority
          className="absolute object-contain object-bottom"
          style={{
            right: 0,
            bottom: 0,
            width: "min(869px, 48%)",
            height: "auto",
            maxHeight: "100%",
          }}
          sizes="(max-width: 1280px) 48vw, 629px"
        />

        {DOODLE_LAYOUT.map((doodle, i) => (
          <Image
            key={`doodle-${i}`}
            src={MANPOWER_HERO.doodleSrc}
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
          <div className="flex w-full max-w-[620px] shrink-0 flex-col lg:max-w-[620px]">
            <h1 className="m-0 font-montserrat text-[clamp(1.75rem,5.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {MANPOWER_HERO.title}
            </h1>

            <p className="mt-4 m-0 max-w-[520px] font-manrope text-[clamp(15px,1.6vw,17px)] font-semibold leading-[160%] text-[#98A2B3] md:mt-5">
              {MANPOWER_HERO.description}
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-6 flex w-full max-w-[540px] flex-col gap-2 rounded-[20px] border border-[#E5E7EB] bg-white p-2 shadow-[0_10px_32px_rgba(24,33,77,0.08)] md:mt-7 md:flex-row md:flex-nowrap md:items-center md:rounded-full md:p-1.5 lg:mt-8"
            >
              <div className="flex min-w-0 flex-1 items-center gap-1 rounded-full bg-[#F9FAFB] px-1 md:bg-transparent md:px-0">
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-transparent px-2.5 py-2.5 font-montserrat text-[13px] font-semibold text-[#111827] sm:px-3 sm:text-[14px]"
                  aria-label="Country code Bangladesh +880"
                >
                  <BdFlag className="h-3.5 w-5 shrink-0" />
                  <span>{MANPOWER_HERO.countryCode}</span>
                  <ChevronDown className="h-4 w-4 text-[#98A2B3]" strokeWidth={2} />
                </button>

                <span className="hidden h-6 w-px bg-[#E5E7EB] md:block" aria-hidden />

                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={MANPOWER_HERO.phonePlaceholder}
                  className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 font-montserrat text-[13px] font-medium text-[#111827] outline-none placeholder:text-[#98A2B3] sm:px-3 sm:py-3 sm:text-[14px]"
                  aria-label="Mobile number"
                />
              </div>

              <button
                type="submit"
                className="w-full shrink-0 rounded-full bg-[#0EC47B] px-5 py-3 font-montserrat text-[14px] font-bold text-white transition-opacity hover:opacity-90 md:w-auto md:px-6"
              >
                {MANPOWER_HERO.primaryCta.label}
              </button>
            </form>

            <a
              href={`tel:${MANPOWER_HERO.hotline.replace(/-/g, "")}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-4 py-2.5 font-montserrat text-[13px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03] sm:mt-4 sm:w-fit sm:justify-start sm:text-[14px]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F7] text-[#111827]">
                <Phone className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
              </span>
              {MANPOWER_HERO.hotlineLabel}: {MANPOWER_HERO.hotline}
            </a>
          </div>

          {/* Mobile / tablet — bottom-aligned cutout */}
          <div className="relative mx-auto w-full max-w-[360px] shrink-0 sm:max-w-[460px] md:max-w-[540px] lg:hidden">
            <div className="relative mx-auto aspect-[629/673] w-full">
              <Image
                src={MANPOWER_HERO.heroImage}
                alt={MANPOWER_HERO.heroImageAlt}
                fill
                priority
                className="object-contain object-bottom"
                sizes="90vw"
              />
            </div>
          </div>

          {/* Desktop spacer so left copy doesn't collide with absolute image */}
          <div className="hidden min-w-0 flex-1 lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
