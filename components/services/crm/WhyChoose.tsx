"use client";

"use client";

import Image from "next/image";
import { LayoutGrid, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { openConsultationModal } from "@/components/home/ConsultationModal";
import Content from "@/data/crm-content.json";

const {
  eyebrow,
  title,
  description,
  images,
  hireUsLabels,
  features,
} = Content.whyChoose;

const FEATURE_ICONS = {
  target: Target,
  trendingUp: TrendingUp,
  users: Users,
  layoutGrid: LayoutGrid,
} as const satisfies Record<string, LucideIcon>;

const FEATURE_CARDS = features.map((feature) => ({
  ...feature,
  icon: FEATURE_ICONS[feature.icon as keyof typeof FEATURE_ICONS],
}));

function HireUsBadge() {
  return (
    <button
      type="button"
      onClick={openConsultationModal}
      className="group relative block aspect-square h-full w-full cursor-pointer border-0 bg-transparent p-0 drop-shadow-[0_12px_28px_rgba(4,96,67,0.22)]"
      aria-label="Hire us"
    >
      <span className="sr-only">Hire us</span>

      <img
        src="/Circle-shape.svg"
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-contain" loading="lazy"/>

      <svg viewBox="0 0 188 188" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <path
            id="crm-hireus-text-path"
            d="M94,94 m0,-66 a66,66 0 1,1 0,132 a66,66 0 1,1 0,-132"
          />
        </defs>
        <g className="origin-center animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
          {hireUsLabels.map((label, index) => (
            <text
              key={`${label}-${index}`}
              fill="#FEFEFC"
              fontSize="16"
              fontWeight="700"
              letterSpacing="1.4"
              fontFamily="var(--font-montserrat), Montserrat, sans-serif"
            >
              <textPath
                href="#crm-hireus-text-path"
                startOffset={`${((index + 0.5) / hireUsLabels.length) * 100}%`}
                textAnchor="middle"
              >
                {label}
              </textPath>
            </text>
          ))}
        </g>
        <circle
          cx="94"
          cy="94"
          r="52"
          fill="none"
          stroke="#EBB732"
          strokeWidth="2.2"
        />
        <circle
          cx="94"
          cy="94"
          r="46"
          fill="none"
          stroke="#EBB732"
          strokeWidth="1.2"
          strokeDasharray="2.6 3.4"
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute inset-[26.5%] flex items-center justify-center rounded-full">
        <span className="font-montserrat text-[clamp(18px,4vw,30px)] font-bold leading-none tracking-[0.02em] text-white transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          GO
        </span>
      </span>
    </button>
  );
}

function FeatureCard({
  title: cardTitle,
  description: cardDescription,
  icon: Icon,
  grow,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Flex grow ratio for zigzag columns on lg+ */
  grow: "tall" | "short";
}) {
  return (
    <article
      className={`flex min-h-[220px] flex-col rounded-[clamp(16px,1.4vw,20px)] bg-white p-6 shadow-[0_8px_28px_rgba(16,24,40,0.04)] sm:min-h-[240px] lg:min-h-0 lg:p-[clamp(20px,1.8vw,36px)] ${grow === "tall" ? "lg:flex-[1.15]" : "lg:flex-[1]"
        }`}
    >
      <span className="mb-3 inline-flex text-[#15d286] lg:mb-4">
        <Icon
          className="h-6 w-6 lg:h-7 lg:w-7"
          strokeWidth={1.75}
          aria-hidden
        />
      </span>
      <h3 className="m-0 font-montserrat text-[clamp(18px,1.6vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
        {cardTitle}
      </h3>
      <p className="mt-2 font-montserrat text-[clamp(13px,0.95vw,15px)] font-medium leading-[1.55] text-[#98a2b3] lg:mt-3">
        {cardDescription}
      </p>
    </article>
  );
}

export default function WhyChoose() {
  return (
    <section className="bg-[#f5f7fa] py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[1678px] px-[clamp(16px,3.5vw,40px)]">
        {/* Header */}
        <div className="mx-auto mb-[clamp(32px,4.5vw,56px)] flex w-full max-w-[650px] flex-col items-center gap-3 text-center">
          <p className="m-0 font-montserrat text-[clamp(16px,1.3vw,20px)] font-semibold leading-none text-[#15d286]">
            {eyebrow}
          </p>
          <h2 className="m-0 font-montserrat text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.15] tracking-[-0.02em] text-black">
            {title}
          </h2>
          <p className="m-0 max-w-[650px] font-montserrat text-[clamp(14px,1.1vw,16px)] font-medium leading-[1.4] text-[#98a2b3]">
            {description}
          </p>
        </div>

        {/*
          Figma: images 728 / cards 797 — fluid fr columns so lg→xl never overflow.
          Both columns stretch to the same height; card zigzag via flex ratios.
        */}
        <div className="mx-auto grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-[clamp(20px,2.2vw,40px)] xl:grid-cols-[minmax(0,728fr)_minmax(0,797fr)]">
          {/* LEFT — images + hire badge */}
          <div className="grid min-h-0 w-full min-w-0 grid-cols-[1fr_1.05fr] gap-3 sm:gap-4 lg:min-h-[clamp(440px,48vw,631px)] lg:gap-[clamp(12px,1.3vw,20px)]">
            <div className="relative min-h-[280px] overflow-hidden rounded-[clamp(14px,1.2vw,20px)] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:min-h-[320px] lg:min-h-0 lg:h-full">
              <Image
                src={images.left.src}
                alt={images.left.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 48vw, 28vw" loading="lazy"/>
            </div>

            <div className="grid h-full min-h-0 grid-rows-[minmax(0,1.15fr)_auto] gap-3 sm:gap-4 lg:gap-[clamp(12px,1.3vw,20px)]">
              <div className="relative min-h-[160px] overflow-hidden rounded-[clamp(14px,1.2vw,20px)] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:min-h-[200px] lg:min-h-0">
                <Image
                  src={images.right.src}
                  alt={images.right.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 48vw, 26vw" loading="lazy"/>
              </div>

              <div className="mx-auto aspect-square w-[clamp(120px,22vw,233px)] max-w-full shrink-0">
                <HireUsBadge />
              </div>
            </div>
          </div>

          {/* RIGHT — zigzag feature cards */}
          <div className="grid min-h-0 w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:gap-[clamp(16px,1.8vw,32px)]">
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:gap-[clamp(16px,1.8vw,32px)]">
              <FeatureCard {...FEATURE_CARDS[0]} grow="tall" />
              <FeatureCard {...FEATURE_CARDS[2]} grow="short" />
            </div>
            <div className="flex min-h-0 flex-col gap-5 lg:h-full lg:gap-[clamp(16px,1.8vw,32px)]">
              <FeatureCard {...FEATURE_CARDS[1]} grow="short" />
              <FeatureCard {...FEATURE_CARDS[3]} grow="tall" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
