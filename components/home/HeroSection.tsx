"use client";

import "./HeroSection.css";
import Image from "next/image";
import Link from "next/link";
import StatsBadge from "@/components/home/StatsBadge";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem, splitHeroTitle } from "@/lib/home-page";

const CTA = {
  href: "/contact-us",
  arrowSrc: "/hero/arrow.png",
  avatarSrc: "/hero/hello-avatar.png",
} as const;

function HeroTitle({
  line1,
  line2,
  line3,
}: {
  line1: string;
  line2: string;
  line3: string;
}) {
  return (
    <h1 className="max-w-[889px] px-1 text-center">
      <p className="hero-title">{line1}</p>
      {line2 ? (
        <span className="hero-subtitle md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)] block">
          {line2}
        </span>
      ) : null}
      {line3 ? (
        <p className="hero-title md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)]">
          {line3}
        </p>
      ) : null}
    </h1>
  );
}

function HeroCta({ label }: { label: string }) {
  if (!label) return null;
  return (
    <Link
      href={CTA.href}
      className="hero-hello mt-4 no-underline md:mt-[60px] lg:mt-[var(--hero-hello-mt,60px)]"
      aria-label={label}
      data-gtm-cta="true"
      data-cta-id="hero-contact"
      data-cta-location="home_hero"
    >
      <Image
        src={CTA.arrowSrc}
        alt=""
        width={28}
        height={18}
        className="hero-hello-arrow"
        unoptimized
        loading="lazy"
      />
      <span className="hero-hello-label">{label}</span>
      <span className="hero-hello-icons" aria-hidden>
        <Image
          src={CTA.avatarSrc}
          alt=""
          width={40}
          height={40}
          className="hero-hello-avatar"
          unoptimized
          loading="lazy"
        />
        <span className="hero-hello-phone">
          <svg
            className="hero-hello-phone-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </Link>
  );
}

function HeroMobilePhotoSlider({ left, right }: { left?: string; right?: string }) {
  const slides = [right, left].filter(Boolean) as string[];
  if (!slides.length) return null;
  return (
    <div className="hero-mobile-slider" aria-label="Hero photos">
      <div className="hero-mobile-slider-track">
        {slides.map((src, index) => (
          <div key={`${src}-${index}`} className="hero-mobile-slide">
            <Image
              src={src}
              alt=""
              width={167}
              height={96}
              className="hero-mobile-slide-img"
              sizes="167px"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { data } = useHomePageQuery();
  const item = homeSectionItem(data?.data?.sections?.hero);
  if (!item) return null;

  const lines = splitHeroTitle(item.title, item.middle_title);
  const left = item.left_down?.url;
  const right = item.right_top?.url;

  return (
    <section className="hero-section relative isolate bg-[#FFFDF6] max-md:min-h-0 max-md:h-auto md:min-h-screen md:h-screen lg:min-h-screen">
      <span className="absolute left-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute right-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute left-1/2 top-[580px] hidden h-[1px] w-[942px] -translate-x-1/2 bg-[#DACFA7] 2xl:inline-block" />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1899px] flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-6 md:pt-24 lg:hidden">
        <HeroTitle {...lines} />

        <div className="hero-mobile-mid mt-8 flex w-full items-center gap-3 sm:mt-10">
          <div className="hero-mobile-stats shrink-0">
            <StatsBadge />
          </div>
          <HeroMobilePhotoSlider left={left} right={right} />
        </div>

        <div className="mt-8 flex flex-col items-center sm:mt-10">
          {item.text ? (
            <div
              className="hero-desc max-w-[840px] px-2"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          ) : null}
          <HeroCta label={item.contact} />
        </div>
      </div>

      <div className="relative z-[2] mx-auto hidden h-full max-w-[1899px] flex-col px-4 sm:px-6 md:px-8 lg:flex lg:px-10">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-start lg:grid-cols-12">
          <div className="hero-col-left col-span-12 mt-20 flex flex-col items-center gap-8 sm:mt-24 sm:gap-12 lg:col-span-3 lg:mt-[var(--hero-left-mt,90px)] lg:items-start lg:gap-[var(--hero-left-gap,80px)]">
            <StatsBadge />
            {left ? (
              <span className="hero-photo-left mt-8 hidden lg:mt-[var(--hero-photo-left-mt,80px)] lg:block">
                <Image
                  src={left}
                  alt=""
                  width={392}
                  height={392}
                  className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
                  sizes="(max-width: 1535px) 280px, 392px"
                  loading="lazy"
                  unoptimized
                />
              </span>
            ) : null}
          </div>

          <div className="hero-col-center col-span-12 mt-8 flex flex-col items-center sm:mt-12 lg:col-span-6 lg:mt-[var(--hero-center-mt,255px)]">
            <HeroTitle {...lines} />
            {item.text ? (
              <div
                className="hero-desc mt-8 max-w-[840px] px-2 sm:mt-12 md:mt-[96px] lg:mt-[var(--hero-desc-mt,96px)]"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ) : null}
            <HeroCta label={item.contact} />
          </div>

          <div className="col-span-12 flex justify-end lg:col-span-3">
            {right ? (
              <div className="hero-photo-right mt-8 hidden lg:mt-[var(--hero-photo-right-mt,170px)] lg:block">
                <Image
                  src={right}
                  alt=""
                  width={392}
                  height={392}
                  className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
                  sizes="(max-width: 1535px) 280px, 392px"
                  loading="lazy"
                  unoptimized
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
