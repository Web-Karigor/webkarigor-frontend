import {
  Briefcase,
  Handshake,
  TrendingUp,
  UserRound,
} from "lucide-react";

const REASONS = [
  {
    title: "User-Centered Design",
    description:
      "We put your users at the core of our decisions, ensuring every interaction feels natural and intuitive.",
    icon: UserRound,
    color: "#00c982",
  },
  {
    title: "Business-Focused",
    description:
      "Our designs are crafted to align with your key metrics, driving conversions and ROI.",
    icon: Briefcase,
    color: "#ff6b35",
  },
  {
    title: "Collaborative Process",
    description:
      "We act as an extension of your team, maintaining transparent communication throughout.",
    icon: Handshake,
    color: "#e400c8",
  },
  {
    title: "Scalable Systems",
    description:
      "We deliver robust design systems that make future development faster and consistent.",
    icon: TrendingUp,
    color: "#1498ff",
  },
] as const;

export default function WhyChoose() {
  return (
    <section className="bg-[#f8fafb] px-5 py-[clamp(64px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[960px]">
        <div className="mx-auto max-w-[520px] text-center">
          <p className="m-0 font-montserrat text-[12px] font-semibold leading-none text-[#00b873] sm:text-[13px]">
            Why Webkarigor
          </p>
          <h2 className="mt-2.5 m-0 font-montserrat text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            More Than Beautiful Interfaces
          </h2>
          <p className="mt-2 m-0 font-manrope text-[10px] font-medium leading-[1.45] text-[#a2a8b0] sm:text-[11px]">
            We combine strategy, research, and design thinking to create products that
            not only look good but perform exceptionally well in the real world.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="text-center">
                <Icon
                  className="mx-auto h-7 w-7"
                  style={{ color: reason.color }}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <h3 className="mt-2.5 m-0 font-montserrat text-[11px] font-bold leading-[1.25] text-[#273142]">
                  {reason.title}
                </h3>
                <p className="mx-auto mt-2 m-0 max-w-[170px] font-montserrat text-[8px] font-medium leading-[1.5] text-[#667085] sm:text-[9px]">
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
