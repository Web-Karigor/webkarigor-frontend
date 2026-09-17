import {
  Briefcase,
  Handshake,
  TrendingUp,
  UserRound,
} from "lucide-react";

import { whyChooseUs } from "@/data/website-design-development-content.json";

const { items: REASONS, title, eyebrow, description } = whyChooseUs;
const ICONS = { Briefcase, Handshake, TrendingUp, UserRound };

export default function WhyChoose() {
  return (
    <section className="bg-[#f8fafb] px-5 py-[clamp(64px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="m-0 font-montserrat text-[15px] font-semibold leading-none text-[#00b873]">
            {eyebrow}
          </p>
          <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {title}
          </h2>
          <p className="mt-3 m-0 font-manrope text-[14px] font-medium leading-[1.5] text-[#a2a8b0] lg:text-[16px]">
            {description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {REASONS.map((reason) => {
            const Icon = ICONS[reason.icon as keyof typeof ICONS];
            return (
              <article key={reason.title} className="text-center">
                <Icon
                  className="mx-auto h-8 w-8"
                  style={{ color: reason.color }}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <h2 className="mt-3 m-0 font-montserrat text-[16px] font-bold leading-[1.3] text-[#273142]">
                  {reason.title}
                </h2>
                <p className="mx-auto mt-3 m-0 max-w-[240px] font-montserrat text-[14px] font-medium leading-[1.55] text-[#667085]">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
