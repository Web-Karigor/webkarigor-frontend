import "./HeroSection.css";
import Image from "next/image";
import Link from "next/link";
import StatsBadge from "@/components/home/StatsBadge";
import homeContent from "@/data/home-content.json";

const { titleLines, description, cta, photos, backgroundWord } = homeContent.hero;

const photoSlides = [photos.left, photos.right] as const;

function HeroTitle() {
  return (
    <div className="max-w-[889px] px-1 text-center">
      <p className="hero-title">{titleLines[0]}</p>
      <span className="hero-subtitle md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)] block">
        {titleLines[1]}
      </span>
      <p className="hero-title md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)]">
        {titleLines[2]}
      </p>
    </div>
  );
}

function HeroDesc() {
  return (
    <p className="hero-desc mt-8 max-w-[840px] px-2 sm:mt-12 md:mt-[75px] lg:mt-[var(--hero-desc-mt,75px)]">
      {description.beforeHighlight}
      <span className="hero-highlight">{description.highlight}</span>
      {description.afterHighlight}
      <span className="hero-badge">{description.badge}</span>
      {description.afterBadge}
    </p>
  );
}

function HeroCta() {
  return (
    <Link
      href={cta.href}
      className="hero-hello mt-4 no-underline md:mt-[60px] lg:mt-[var(--hero-hello-mt,60px)]"
      aria-label={cta.ariaLabel}
    >
      <Image
        src={cta.arrowSrc}
        alt=""
        width={28}
        height={18}
        className="hero-hello-arrow"
        unoptimized
      />
      <span className="hero-hello-label">{cta.label}</span>
      <span className="hero-hello-icons" aria-hidden>
        <Image
          src={cta.avatarSrc}
          alt=""
          width={40}
          height={40}
          className="hero-hello-avatar"
          unoptimized
        />
        <span className="hero-hello-phone">
          <svg
            className="hero-hello-phone-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </Link>
  );
}

/** Mobile photo strip — full card + next peek (swipe / scroll) */
function HeroMobilePhotoSlider() {
  return (
    <div className="hero-mobile-slider" aria-label="Hero photos">
      <div className="hero-mobile-slider-track">
        {photoSlides.map((src, index) => (
          <div key={`${src}-${index}`} className="hero-mobile-slide">
            <Image
              src={src}
              alt=""
              width={167}
              height={96}
              className="hero-mobile-slide-img"
              sizes="167px"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Spacing uses CSS vars with 2xl Figma fallbacks.
 * Mobile (&lt;lg): title → stats + photo slider → desc → CTA (matches design).
 * lg+: original 3-column layout.
 */
export default function HeroSection() {
  return (
    <section className="hero-section relative isolate bg-[#FFFDF6] max-md:min-h-0 max-md:h-auto md:min-h-screen md:h-screen lg:min-h-screen">
      <span className="absolute left-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute right-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute left-1/2 top-[580px] hidden h-[1px] w-[942px] -translate-x-1/2 bg-[#DACFA7] 2xl:inline-block" />

      {/* ——— Mobile / tablet (&lt; lg) ——— */}
      <div className="relative z-[2] mx-auto flex w-full max-w-[1899px] flex-col px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 lg:hidden">
        <HeroTitle />

        <div className="hero-mobile-mid mt-8 flex w-full items-center gap-3 sm:mt-10">
          <div className="hero-mobile-stats shrink-0">
            <StatsBadge />
          </div>
          <HeroMobilePhotoSlider />
        </div>

        <div className="mt-8 flex flex-col items-center sm:mt-10">
          <p className="hero-desc max-w-[840px] px-2">
            {description.beforeHighlight}
            <span className="hero-highlight">{description.highlight}</span>
            {description.afterHighlight}
            <span className="hero-badge">{description.badge}</span>
            {description.afterBadge}
          </p>
          <HeroCta />
        </div>
      </div>

      {/* ——— Desktop (lg+) ——— */}
      <div className="relative z-[2] mx-auto hidden h-full max-w-[1899px] flex-col px-4 sm:px-6 md:px-8 lg:flex lg:px-10">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-start lg:grid-cols-12">
          <div className="hero-col-left col-span-12 mt-20 flex flex-col items-center gap-8 sm:mt-24 sm:gap-12 lg:col-span-3 lg:mt-[var(--hero-left-mt,90px)] lg:items-start lg:gap-[var(--hero-left-gap,80px)]">
            <StatsBadge />
            <span className="hero-photo-left mt-8 hidden lg:mt-[var(--hero-photo-left-mt,80px)] lg:block">
              <Image
                src={photos.left}
                alt=""
                width={392}
                height={392}
                className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
              />
            </span>
          </div>

          <div className="hero-col-center col-span-12 mt-8 flex flex-col items-center sm:mt-12 lg:col-span-6 lg:mt-[var(--hero-center-mt,255px)]">
            <HeroTitle />
            <HeroDesc />
            <HeroCta />
          </div>

          <div className="col-span-12 flex justify-end lg:col-span-3">
            <div className="hero-photo-right mt-8 hidden lg:mt-[var(--hero-photo-right-mt,170px)] lg:block">
              <Image
                src={photos.right}
                alt=""
                width={392}
                height={392}
                className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-projects-wrap pointer-events-none absolute inset-x-0 bottom-0 z-[1]">
        <p className="hero-projects-text translate-y-[calc(54%+30px)] text-center font-bold leading-[0.9] text-[#1F1E1C] opacity-[0.02] md:translate-y-[56%] 2xl:translate-y-[64%]">
          {backgroundWord}
        </p>
      </div>
    </section>
  );
}
