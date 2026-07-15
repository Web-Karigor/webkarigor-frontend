import Image from "next/image";
import { BarChart3, Briefcase, Handshake, UserRound } from "lucide-react";

/** Figma Why Choose — feature rows */
const FEATURES = [
  {
    title: "User-Centered Design",
    description:
      "We put your users at the core of our decisions, ensuring every interaction feels natural and intuitive.",
    icon: UserRound,
    color: "#12B76A",
    bg: "#E8F8F0",
    border: "#B6E9D1",
  },
  {
    title: "Business-Focused",
    description:
      "Our designs are crafted to align with your key metrics, driving conversions and ROI.",
    icon: Briefcase,
    color: "#F79009",
    bg: "#FEF4E6",
    border: "#F9D9A8",
  },
  {
    title: "Collaborative Process",
    description:
      "We act as an extension of your team, maintaining transparent communication throughout.",
    icon: Handshake,
    color: "#EE46BC",
    bg: "#FCE8F5",
    border: "#F5B8E0",
  },
  {
    title: "Scalable Systems",
    description:
      "We deliver robust design systems that make future development faster and consistent.",
    icon: BarChart3,
    color: "#2E90FA",
    bg: "#E8F3FE",
    border: "#B5D7FC",
  },
] as const;

/**
 * Figma left visual — just the two overlapping images (collage export).
 * Main 600×580 (top-right) + Overlay 380×367 (bottom-left).
 */
function WhyChooseImages() {
  return (
    <div className="relative mx-auto w-full max-w-[698px] shrink-0 lg:mx-0">
      {/* Figma export is just the two photos overlapping (432×393 native) */}
      <div className="relative aspect-[432/393] w-full">
        <Image
          src="/services/why-choose-collage.png"
          alt="Office collaboration and analytics screens"
          fill
          className="object-contain object-left object-top"
          sizes="698px"
          priority={false}
        />
      </div>
    </div>
  );
}

function WhyChooseCopy() {
  return (
    <div className="w-full min-w-0 max-w-[620px] lg:pt-2">
      <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#15d286]">
        Why Webkarigor
      </p>
      <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
        More Than Beautiful Interfaces
      </h2>

      <ul className="mt-8 m-0 flex list-none flex-col gap-7 p-0 sm:mt-10 sm:gap-8">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.title} className="flex items-start gap-4 sm:gap-5">
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:h-14 sm:w-14"
                style={{
                  backgroundColor: feature.bg,
                  borderColor: feature.border,
                  color: feature.color,
                }}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="m-0 font-montserrat text-[clamp(16px,1.3vw,18px)] font-bold leading-tight text-[#111827]">
                  {feature.title}
                </h3>
                <p className="mt-1.5 m-0 max-w-[460px] font-montserrat text-[clamp(13px,1vw,15px)] font-medium leading-[1.55] text-[#98A2B3]">
                  {feature.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ManpowerWhyChoose() {
  return (
    <section
      className="w-full bg-[#F9FBFE]"
      style={{
        /* Figma section: 1920 · pad 48 / 243 / 48 / 120 · radius TR/BR 8 */
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      }}
    >
      <div
        className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10"
        style={{
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: "clamp(16px, 6.25vw, 120px)",
          paddingRight: "clamp(16px, 12.66vw, 243px)",
        }}
      >
        <WhyChooseImages />
        <WhyChooseCopy />
      </div>
    </section>
  );
}
