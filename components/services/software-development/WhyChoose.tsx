import Image from "next/image";
import { BarChart3, Briefcase, Handshake, UserRound } from "lucide-react";
import { WHY } from "@/lib/software-development-data";

const ICONS = {
  user: UserRound,
  briefcase: Briefcase,
  handshake: Handshake,
  chart: BarChart3,
} as const;

function WhyChooseImages() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] shrink-0 lg:mx-0">
      <div className="relative mx-auto aspect-[362/393] w-full max-w-[500px]">
        <Image
          src={WHY.image}
          alt={WHY.imageAlt}
          className="absolute right-0 top-0 h-[78%] w-[74%] rounded-[22px] object-cover shadow-[0_16px_35px_rgba(16,24,40,0.12)]"
          width={600}
          height={580}
          sizes="(max-width: 1023px) 74vw, 370px"
          priority={false}
        />

        <Image
          src={WHY.overlayImage}
          alt="Software analytics dashboard"
          className="absolute bottom-0 left-0 z-[1] h-[51%] w-[47%] rounded-[20px] object-cover shadow-[0_16px_35px_rgba(16,24,40,0.16)]"
          width={380}
          height={367}
          sizes="(max-width: 1023px) 47vw, 235px"
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
        {WHY.eyebrow}
      </p>
      <h2 className="mt-3 m-0 font-montserrat text-[clamp(22px,3.2vw,28px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
        {WHY.title}
      </h2>

      <ul className="mt-8 m-0 flex list-none flex-col gap-7 p-0 sm:mt-10 sm:gap-8">
        {WHY.items.map((feature) => {
          const Icon = ICONS[feature.icon as keyof typeof ICONS];
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
                <h4 className="m-0 font-montserrat text-[clamp(14px,1.3vw,16px)] font-bold leading-tight text-[#111827]">
                  {feature.title}
                </h4>
                <p className="mt-1.5 m-0 max-w-[460px] font-montserrat text-[clamp(11px,1vw,13px)] font-medium leading-[1.55] text-[#98A2B3]">
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

export default function WhyChoose() {
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
