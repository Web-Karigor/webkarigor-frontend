"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { MANPOWER_HERO } from "@/lib/manpower-data";

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
  const { heroLayout } = MANPOWER_HERO;

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
        <div className="mx-auto flex h-[88px] w-full max-w-[1800px] items-center justify-between px-[clamp(16px,3.5vw,50px)] lg:h-[108px]">
          <Link
            href="/"
            className="font-museoModerno text-[clamp(22px,2vw,28px)] font-semibold leading-none text-black"
          >
            Webkarigor
          </Link>
          <Link
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0EC47B] px-5 py-2.5 font-montserrat text-[clamp(13px,1vw,15px)] font-bold text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
          >
            {MANPOWER_HERO.headerCta}
          </Link>
        </div>
      </header>

      {/* Desktop visual — image flush to gradient bottom + doodles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[2] mx-auto hidden h-full w-full max-w-[1920px] lg:block">
        <Image
          src={MANPOWER_HERO.heroImage}
          alt="Happy student giving thumbs up"
          width={heroLayout.width}
          height={heroLayout.height}
          priority
          className="absolute object-contain object-bottom"
          style={{
            left: heroLayout.left,
            bottom: 0,
            width: heroLayout.width,
            height: heroLayout.height,
          }}
          sizes="629px"
        />

        {MANPOWER_HERO.doodles.map((doodle, i) => (
          <Image
            key={`doodle-${i}`}
            src={doodle.src}
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

      <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1800px] items-center px-[clamp(16px,3.5vw,50px)] pt-[104px] pb-8 lg:pt-[108px] lg:pb-0">
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          {/* Left — copy + phone CTA */}
          <div className="flex w-full max-w-[620px] shrink-0 flex-col">
            <h1 className="m-0 font-montserrat text-[clamp(2.35rem,4.1vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {MANPOWER_HERO.title}
            </h1>

            <p className="mt-5 m-0 max-w-[520px] font-manrope text-[17px] font-semibold leading-[160%] text-[#98A2B3]">
              {MANPOWER_HERO.description}
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 flex w-full max-w-[540px] flex-wrap items-center gap-2 rounded-full border border-[#E5E7EB] bg-white p-1.5 shadow-[0_10px_32px_rgba(24,33,77,0.08)] sm:flex-nowrap"
            >
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-transparent px-3 py-2.5 font-montserrat text-[14px] font-semibold text-[#111827]"
                aria-label="Country code Bangladesh +880"
              >
                <BdFlag className="h-3.5 w-5 shrink-0" />
                <span>{MANPOWER_HERO.countryCode}</span>
                <ChevronDown className="h-4 w-4 text-[#98A2B3]" strokeWidth={2} />
              </button>

              <span className="hidden h-6 w-px bg-[#E5E7EB] sm:block" aria-hidden />

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={MANPOWER_HERO.phonePlaceholder}
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 font-montserrat text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#98A2B3] sm:px-3"
                aria-label="Mobile number"
              />

              <button
                type="submit"
                className="w-full shrink-0 rounded-full bg-[#0EC47B] px-5 py-3 font-montserrat text-[14px] font-bold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
              >
                {MANPOWER_HERO.ctaLabel}
              </button>
            </form>

            <a
              href={`tel:${MANPOWER_HERO.hotline.replace(/-/g, "")}`}
              className="mt-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-4 py-2.5 font-montserrat text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F7] text-[#111827]">
                <Phone className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
              </span>
              {MANPOWER_HERO.hotlineLabel}: {MANPOWER_HERO.hotline}
            </a>
          </div>

          {/* Mobile fallback — bottom-aligned cutout */}
          <div className="relative mx-auto w-full max-w-[629px] shrink-0 lg:hidden">
            <div className="relative mx-auto aspect-[629/673] w-full">
              <Image
                src={MANPOWER_HERO.heroImage}
                alt="Happy student giving thumbs up"
                fill
                priority
                className="object-contain object-bottom"
                sizes="90vw"
              />
            </div>
          </div>

          {/* Desktop spacer so left copy doesn't collide with absolute image */}
          <div
            className="hidden shrink-0 lg:block"
            style={{ width: heroLayout.width, height: 1 }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
