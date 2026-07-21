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
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-[clamp(16px,4vw,120px)] md:gap-10 lg:gap-12">
        {/* Header — horizontal space-between */}
        <div className="flex w-full flex-col gap-5 md:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[640px] shrink-0">
            <p className="m-0 font-montserrat text-[16px] font-semibold leading-none text-[#15d286] sm:text-[18px]">
              Why Webkarigor
            </p>
            <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-black">
              More Than Beautiful Interfaces
            </h2>
          </div>
          {/* Figma: 650×54 · Manrope SemiBold 600 · 18px · LH 150% · #A7A7A7 */}
          <p className="m-0 w-full max-w-[650px] font-manrope text-[clamp(15px,1.5vw,18px)] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:shrink-0">
            We combine strategy, research, and design thinking to create products
            that not only look good but perform exceptionally well in the real
            world.
          </p>
        </div>

        {/* Cards — 2×2, gap 52, card 568×234 · r24 · p48 */}
        <div className="mx-auto grid w-full max-w-[1188px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:gap-[52px]">
          {ERP_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <article
                key={feature.title}
                className="flex h-full w-full items-start gap-5 rounded-[20px] border-[0.5px] border-[#E0E0E0] bg-white p-6 shadow-[0_26px_60px_rgba(0,0,0,0.05)] md:gap-6 md:rounded-[22px] md:p-8 lg:gap-6 lg:rounded-[24px] lg:p-12"
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

                <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-2.5">
                  <h3 className="m-0 font-montserrat text-[17px] font-bold leading-[1.25] text-[#1D2939] md:text-[18px] lg:text-[20px]">
                    {feature.title}
                  </h3>
                  <p className="m-0 font-montserrat text-[14px] font-medium leading-[1.6] text-[#475467] md:text-[14px] lg:text-[15px]">
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
