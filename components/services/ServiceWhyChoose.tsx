import Image from "next/image";
import { LayoutGrid, Target, TrendingUp, Users } from "lucide-react";

const FEATURE_CARDS = [
  {
    title: "User-Centered Design",
    description:
      "We put your users at the core of our decisions, ensuring every interaction feels natural and intuitive.",
    icon: Target,
  },
  {
    title: "Business-Focused",
    description:
      "Our designs are crafted to align with your key metrics, driving conversions and ROI.",
    icon: TrendingUp,
  },
  {
    title: "Collaborative Process",
    description:
      "We act as an extension of your team, maintaining transparent communication throughout.",
    icon: Users,
  },
  {
    title: "Scalable Systems",
    description:
      "We deliver robust design systems that make future development faster and consistent.",
    icon: LayoutGrid,
  },
] as const;

function HireUsBadge() {
  const labels = ["HIRE US", "HIRE US", "HIRE US"] as const;

  return (
    <div className="relative h-full w-full drop-shadow-[0_12px_28px_rgba(4,96,67,0.22)]">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
        <defs>
          <path
            id="hireus-circle-path"
            d="M 100,100 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
          />
        </defs>

        <circle cx="100" cy="100" r="78" fill="#0a7d5f" />
        {[...Array.from({ length: 28 })].map((_, i) => {
          const angle = (360 / 28) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 88;
          const y = 100 + Math.sin(rad) * 88;
          return <circle key={i} cx={x} cy={y} r="12" fill="#0a7d5f" />;
        })}
        <circle cx="100" cy="100" r="76" fill="#0c8a68" />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.75"
        />

        <g
          className="animate-[hireus-spin_12s_linear_infinite]"
          style={{ transformOrigin: "100px 100px" }}
        >
          {labels.map((label, index) => (
            <text
              key={`${label}-${index}`}
              fill="#ffffff"
              fontSize="15"
              fontWeight="700"
              letterSpacing="1"
              fontFamily="Montserrat, sans-serif"
              textAnchor="middle"
            >
              <textPath
                href="#hireus-circle-path"
                startOffset={`${((index * 2 + 1) * 100) / 6}%`}
              >
                {label}
              </textPath>
            </text>
          ))}
        </g>

        <circle
          cx="100"
          cy="100"
          r="16"
          fill="#FFE94A"
          className="animate-[hireus-blink_1s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  );
}

export default function ServiceWhyChoose() {
  return (
    <section className="bg-[#f5f7fa] py-[clamp(56px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[1678px] px-[clamp(16px,4vw,40px)]">
        {/* Header — Figma Frame: 650 × 151 Hug */}
        <div className="mx-auto mb-[clamp(36px,5vw,56px)] flex w-full max-w-[650px] flex-col items-center text-center lg:h-[151px] lg:justify-between">
          <p className="m-0 font-montserrat text-[18px] font-semibold leading-none text-[#15d286] lg:text-[20px]">
            Why Webkarigor
          </p>
          <h2 className="m-0 font-montserrat text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-black sm:text-[32px] lg:text-[36px]">
            More Than Beautiful Interfaces
          </h2>
          <p className="m-0 max-w-[650px] font-montserrat text-[14px] font-medium leading-[1.4] text-[#98a2b3] sm:text-[15px] lg:text-[16px]">
            We combine strategy, research, and design thinking to create products
            that not only look good but perform exceptionally well in the real
            world.
          </p>
        </div>

        {/*
          Figma Frame 268: 1678 × hug, horizontal, space-between
          Left Frame 267: 728 × 631
          Right cards container: 797 × 631, gap 32
        */}
        <div className="mx-auto flex w-full max-w-[1678px] flex-col items-stretch justify-between gap-8 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
          {/* LEFT — Frame 267 (728×631) — keep as is */}
          <div className="grid w-full max-w-[728px] shrink-0 grid-cols-[1fr_1.05fr] gap-4 lg:h-[631px] lg:gap-5">
            <div className="relative min-h-[320px] overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:min-h-0 lg:h-full">
              <Image
                src="/sm1.png"
                alt="Team collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 350px"
              />
            </div>

            <div className="grid h-full grid-rows-[1.15fr_auto] gap-4 lg:gap-5">
              <div className="relative min-h-[200px] overflow-hidden rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.08)] lg:min-h-0">
                <Image
                  src="/sm3.jpg"
                  alt="Design review session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 360px"
                />
              </div>

              <div className="mx-auto flex h-[148px] w-[148px] items-center justify-center lg:h-[233px] lg:w-[233px]">
                <HireUsBadge />
              </div>
            </div>
          </div>

          {/* RIGHT — zigzag heights, bottoms of both columns aligned */}
          <div className="grid w-full max-w-[797px] grid-cols-1 gap-8 sm:grid-cols-2 lg:shrink-0">
            {/* Left column: tall → short */}
            <div className="flex flex-col gap-8">
              {[FEATURE_CARDS[0], FEATURE_CARDS[2]].map((feature, i) => {
                const Icon = feature.icon;
                const isTall = i === 0;
                return (
                  <article
                    key={feature.title}
                    className={`flex flex-col rounded-[20px] bg-white p-8 lg:p-9 ${
                      isTall
                        ? "min-h-[248px] lg:h-[300px]"
                        : "min-h-[220px] lg:h-[260px]"
                    }`}
                  >
                    <span className="mb-4 inline-flex text-[#15d286]">
                      <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="m-0 font-montserrat text-[clamp(22px,1.8vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 font-montserrat text-[clamp(13px,0.95vw,15px)] font-medium leading-[1.55] text-[#98a2b3]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Right column: short → tall (same total height → bottom aligns) */}
            <div className="flex flex-col gap-8">
              {[FEATURE_CARDS[1], FEATURE_CARDS[3]].map((feature, i) => {
                const Icon = feature.icon;
                const isTall = i === 1;
                return (
                  <article
                    key={feature.title}
                    className={`flex flex-col rounded-[20px] bg-white p-8 lg:p-9 ${
                      isTall
                        ? "min-h-[248px] lg:h-[300px]"
                        : "min-h-[220px] lg:h-[260px]"
                    }`}
                  >
                    <span className="mb-4 inline-flex text-[#15d286]">
                      <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="m-0 font-montserrat text-[clamp(22px,1.8vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 font-montserrat text-[clamp(13px,0.95vw,15px)] font-medium leading-[1.55] text-[#98a2b3]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
