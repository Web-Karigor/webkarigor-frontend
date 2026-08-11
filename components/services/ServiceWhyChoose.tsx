import Image from "next/image";
import { LayoutGrid, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import servicesContent from "@/data/services-content.json";

const {
  eyebrow,
  title,
  description,
  images,
  hireUsLabels,
  features,
} = servicesContent.whyChoose;

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
          className="animate-hireus-spin"
          style={{ transformOrigin: "100px 100px" }}
        >
          {hireUsLabels.map((label, index) => (
            <text
              key={`${label}-${index}`}
              fill="#ffffff"
              fontSize="17.5"
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

        <circle cx="100" cy="100" r="16" fill="#FFE94A" />
      </svg>
    </div>
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
      className={`flex min-h-[220px] flex-col rounded-[clamp(16px,1.4vw,20px)] bg-white p-6 shadow-[0_8px_28px_rgba(16,24,40,0.04)] sm:min-h-[240px] lg:min-h-0 lg:p-[clamp(20px,1.8vw,36px)] ${
        grow === "tall" ? "lg:flex-[1.15]" : "lg:flex-[1]"
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

export default function ServiceWhyChoose() {
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
                sizes="(max-width: 1023px) 48vw, 28vw"
              />
            </div>

            <div className="grid h-full min-h-0 grid-rows-[minmax(0,1.15fr)_auto] gap-3 sm:gap-4 lg:gap-[clamp(12px,1.3vw,20px)]">
              <div className="relative min-h-[160px] overflow-hidden rounded-[clamp(14px,1.2vw,20px)] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:min-h-[200px] lg:min-h-0">
                <Image
                  src={images.right.src}
                  alt={images.right.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 48vw, 26vw"
                />
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
