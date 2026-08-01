"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SERVICE_PAGE_GUTTER } from "@/lib/service-layout";
import { ECO_HERO } from "@/lib/ecommerce-data";

/** Figma: OUR TOP CLIENTS row — 461 × 60, each mark 60 × 60 */
const ECO_CLIENTS = ECO_HERO.clients;

export default function EcoHero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FB]">
      <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#FFFEFB] shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
        <div className={`${SERVICE_PAGE_GUTTER} flex h-[72px] items-center justify-between sm:h-[88px] lg:h-[108px]`}>
          <Link
            href={ECO_HERO.brandHref}
            className="font-museoModerno text-[clamp(22px,2vw,28px)] font-semibold leading-none text-black"
          >
            {ECO_HERO.brand}
          </Link>
          <Link
            href={ECO_HERO.navCta.href}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0EC47B] px-5 py-2.5 font-montserrat text-[clamp(13px,1vw,15px)] font-bold text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
          >
            {ECO_HERO.navCta.label}
          </Link>
        </div>
      </header>

      {/* Desktop — Figma 1920 × 870 */}
      <div
        className="relative mx-auto hidden w-full max-w-[1920px] lg:block"
        style={{ height: 870 }}
      >
        {/* Bottom mint glow — top 733, h 137 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-[1]"
          style={{
            top: 758,
            height: 137,
            background: "linear-gradient(180deg, #E4FFF4 0%, #F7F9FB 100%)",
            boxShadow: "0px -33px 44.8px 0px rgba(56, 248, 171, 0.14)",
          }}
        />

        {/* Absolute visual — 808 × 712 @ left 1052, top 47 */}
        <div
          className="pointer-events-none absolute z-[2]"
          style={{
            left: "calc(1052 / 1920 * 100%)",
            top: 47,
            width: 808,
            height: 712,
            maxWidth: "min(808px, 42.1%)",
          }}
        >
          <Image
            src={ECO_HERO.heroImage}
            alt={ECO_HERO.heroImageAlt}
            fill
            priority
            className="object-contain object-right-bottom"
            sizes="808px"
          />
        </div>

        {/* Left column — left 60, below header; clients sit above glow */}
        <div
          className="absolute z-10 flex flex-col"
          style={{
            left: "clamp(24px, 3.125vw, 60px)",
            top: 143,
            width: "min(805px, 48%)",
            bottom: 160,
          }}
        >
          {/* Figma: 805 × 196 · Montserrat 700 · 70px · LH 140% · LS -3% */}
          <h1 className="m-0 w-full max-w-[805px] font-montserrat text-[clamp(40px,4.2vw,70px)] font-bold leading-[140%] tracking-[-0.03em] text-black">
            {ECO_HERO.titleLine1}
            <br />
            {ECO_HERO.titleLine2}
          </h1>

          <p className="mt-5 max-w-[560px] font-montserrat text-[16px] font-medium leading-[1.7] text-[#888888]">
            {ECO_HERO.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={ECO_HERO.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90"
            >
              {ECO_HERO.primaryCta.label}
            </Link>
            <a
              href={`tel:${ECO_HERO.hotline.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#1f1e1c] bg-transparent px-5 py-3.5 font-montserrat text-[14px] font-semibold text-black transition-colors hover:bg-black/[0.03]"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              {ECO_HERO.hotlineLabel}: {ECO_HERO.hotline}
            </a>
          </div>

          {/* OUR TOP CLIENTS — logo row 461 × 60 */}
          <div className="mt-auto">
            <p className="m-0 font-montserrat text-[12px] font-bold uppercase tracking-[0.08em] text-[#1f1e1c]">
              {ECO_HERO.clientsLabel}
            </p>
            <div
              className="mt-4 flex h-[60px] w-[461px] max-w-full items-center justify-between"
            >
              {ECO_CLIENTS.map((client) => (
                <div
                  key={client.name}
                  className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/80"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={60}
                    height={60}
                    className="h-[60px] w-[60px] object-contain opacity-80 grayscale"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col px-[clamp(16px,4vw,40px)] pb-16 pt-[128px] lg:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[100px]"
          style={{
            background: "linear-gradient(180deg, #E4FFF4 0%, #F7F9FB 100%)",
            boxShadow: "0px -33px 44.8px 0px rgba(56, 248, 171, 0.14)",
          }}
        />

        <div className="relative z-10">
          <h1 className="m-0 max-w-[805px] font-montserrat text-[clamp(2rem,8vw,2.75rem)] font-bold leading-[140%] tracking-[-0.03em] text-black sm:text-[40px] md:text-[56px]">
            {ECO_HERO.titleLine1}
            <br />
            {ECO_HERO.titleLine2}
          </h1>
          <p className="mt-4 max-w-[560px] font-montserrat text-[15px] font-medium leading-[1.7] text-[#888888]">
            {ECO_HERO.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={ECO_HERO.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-7 py-3.5 font-montserrat text-[14px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)]"
            >
              {ECO_HERO.primaryCta.label}
            </Link>
            <a
              href={`tel:${ECO_HERO.hotline.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#1f1e1c] bg-transparent px-4 py-3 font-montserrat text-[13px] font-semibold text-black"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {ECO_HERO.hotlineLabel}: {ECO_HERO.hotline}
            </a>
          </div>

          <div className="relative mx-auto mt-10 aspect-[808/712] w-full max-w-[480px]">
            <Image
              src={ECO_HERO.heroImage}
              alt={ECO_HERO.heroImageAlt}
              fill
              priority
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 90vw, 480px"
            />
          </div>

          <div className="mt-8">
            <p className="m-0 font-montserrat text-[12px] font-bold uppercase tracking-[0.08em] text-[#1f1e1c]">
              {ECO_HERO.clientsLabel}
            </p>
            <div className="mt-4 flex h-[60px] w-full max-w-[461px] items-center justify-between gap-2">
              {ECO_CLIENTS.map((client) => (
                <div
                  key={client.name}
                  className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/80 sm:h-[60px] sm:w-[60px]"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={60}
                    height={60}
                    className="h-full w-full object-contain opacity-80 grayscale"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
