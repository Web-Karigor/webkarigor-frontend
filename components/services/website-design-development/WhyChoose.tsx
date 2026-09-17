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
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="mx-auto max-w-[520px] text-center">
          <p className="m-0 font-montserrat text-[12px] font-semibold leading-none text-[#00b873] sm:text-[13px]">
            {eyebrow}
          </p>
          <h2 className="mt-2.5 m-0 font-montserrat text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {title}
          </h2>
          <p className="mt-2 m-0 font-manrope text-[10px] font-medium leading-[1.45] text-[#a2a8b0] sm:text-[11px]">
            {description}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {REASONS.map((reason) => {
            const Icon = ICONS[reason.icon as keyof typeof ICONS];
            return (
              <article key={reason.title} className="text-center">
                <Icon
                  className="mx-auto h-7 w-7"
                  style={{ color: reason.color }}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <h2 className="mt-2.5 m-0 font-montserrat text-[14px] font-bold leading-[1.25] text-[#273142]">
                  {reason.title}
                </h2>
                <p className="mx-auto mt-2 m-0 max-w-[170px] font-montserrat text-[12px] font-medium leading-[1.5] text-[#667085] sm:text-[12px]">
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
