import {
  Briefcase,
  Handshake,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { ECO_FEATURES, ECO_FEATURES_SECTION } from "@/lib/ecommerce-data";

const ICONS = {
  user: UserRound,
  briefcase: Briefcase,
  handshake: Handshake,
  chart: TrendingUp,
} as const;

export default function EcoFeatures() {
  return (
    <section className="bg-white py-12">
      {/*
        Figma: 1680 × hug(475), pad 48 / 48, gap 48
      */}
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-12 px-[clamp(16px,4vw,40px)]">
        {/* Header */}
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
          <p className="m-0 font-montserrat text-[16px] font-semibold leading-none text-[#15d286] sm:text-[18px]">
            {ECO_FEATURES_SECTION.eyebrow}
          </p>
          <h2 className="m-0 font-montserrat text-[clamp(28px,3.2vw,36px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#111827]">
            {ECO_FEATURES_SECTION.title}
          </h2>
          <p className="m-0 max-w-[640px] font-montserrat text-[15px] font-medium leading-[1.55] text-[#98A2B3] sm:text-[16px]">
            {ECO_FEATURES_SECTION.description}
          </p>
        </div>


        {/* Features — Figma ~1358 × 180 */}
        <div className="grid w-full max-w-[1358px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ECO_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <article
                key={feature.title}
                className="mx-auto flex max-w-[280px] flex-col items-center text-center"
              >
                <span
                  className="inline-flex"
                  style={{ color: feature.color }}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 font-montserrat text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-[#111827]">
                  {feature.title}
                </h3>
                <p className="mt-2 font-montserrat text-[14px] font-medium leading-[1.55] text-[#98A2B3]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
