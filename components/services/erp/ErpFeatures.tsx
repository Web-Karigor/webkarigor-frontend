import {
  Briefcase,
  Handshake,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { ERP_FEATURES } from "@/lib/erp-data";

const ICONS = {
  user: UserRound,
  briefcase: Briefcase,
  handshake: Handshake,
  chart: TrendingUp,
} as const;


export default function ErpFeatures() {
  return (
    <section className="bg-white py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-12 px-[clamp(16px,6.25vw,120px)]">
        {/* Header — horizontal space-between */}
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[640px] shrink-0">
            <p className="m-0 font-montserrat text-[16px] font-semibold leading-none text-[#15d286] sm:text-[18px]">
              Why Webkarigor
            </p>
            <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-black">
              More Than Beautiful Interfaces
            </h2>
          </div>
          {/* Figma: 650×54 · Manrope SemiBold 600 · 18px · LH 150% · #A7A7A7 */}
          <p className="m-0 h-auto w-full max-w-[650px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:h-[54px] lg:shrink-0">
            We combine strategy, research, and design thinking to create products
            that not only look good but perform exceptionally well in the real
            world.
          </p>
        </div>

        {/* Cards — 2×2, gap 52, card 568×234 · r24 · p48 */}
        <div className="mx-auto grid w-full max-w-[1188px] grid-cols-1 gap-[52px] md:grid-cols-2">
          {ERP_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <article
                key={feature.title}
                className="flex w-full max-w-[568px] items-start gap-6 rounded-[24px] border-[0.5px] border-[#E0E0E0] bg-white p-8 shadow-[0_26px_60px_rgba(0,0,0,0.05)] sm:gap-[24px] sm:p-12 md:h-[234px] md:max-w-none"
              >
                <span
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: feature.bg,
                    color: feature.color,
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>

                <div className="flex min-w-0 flex-col gap-2.5">
                  <h3 className="m-0 font-montserrat text-[18px] font-bold leading-[1.25] text-[#1D2939] sm:text-[20px]">
                    {feature.title}
                  </h3>
                  <p className="m-0 font-montserrat text-[14px] font-medium leading-[1.6] text-[#475467] sm:text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
