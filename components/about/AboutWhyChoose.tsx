import { Code2, Handshake, Layers3, Zap } from "lucide-react";
import { ABOUT_WHY_CHOOSE } from "@/lib/about-data";

const ICONS = {
  support: Handshake,
  tech: Code2,
  plans: Layers3,
  performance: Zap,
} as const;

const TOP_CARDS = ABOUT_WHY_CHOOSE.items.slice(0, 2);
const BOTTOM_CARDS = ABOUT_WHY_CHOOSE.items.slice(2, 4);

function WhyChooseCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const Icon = ICONS[icon as keyof typeof ICONS];

  return (
    <article
      className="about-why-card flex w-full max-w-[600px] flex-col items-center justify-center gap-4 rounded-[24px] border-2 border-transparent p-5 text-center shadow-[0_12px_40px_rgba(63,255,178,0.18),0_4px_20px_rgba(255,239,63,0.12)] sm:gap-6 sm:p-6 md:min-h-[280px] lg:min-h-[329px] xl:w-[min(600px,calc(50%-1rem))]"
      style={{
        background: `
          linear-gradient(135deg, #AEFFDF 0%, #FFF68F 100%) padding-box,
          linear-gradient(135deg, #3FFFB2 0%, #FFEF3F 100%) border-box
        `,
      }}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-[#111827] shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
      </span>
      <div className="flex flex-col items-center gap-3">
        <h3 className="m-0 font-montserrat text-[clamp(18px,1.5vw,22px)] font-bold leading-tight text-[#111827]">
          {title}
        </h3>
        <p className="m-0 max-w-[420px] font-montserrat text-[clamp(14px,1.05vw,15px)] font-medium leading-[1.65] text-[#374151]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function AboutWhyChoose() {
  return (
    <section className="about-why bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1478px] px-[clamp(16px,4vw,40px)]">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="about-why-title m-0 mx-auto max-w-[533px] font-museoModerno text-[clamp(26px,6vw,48px)] font-medium italic leading-[140%] tracking-[-0.05em] text-[#15D286]">
            {ABOUT_WHY_CHOOSE.title}
          </h2>
          <p className="mt-3 m-0 px-1 font-montserrat text-[clamp(14px,1.15vw,16px)] font-medium text-[#6b7280]">
            {ABOUT_WHY_CHOOSE.subtitle}
          </p>
        </div>

        <div className="about-why-stack mx-auto flex w-full max-w-[1478px] flex-col gap-5 sm:gap-8 xl:min-h-[739px] xl:justify-between xl:gap-0">
          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 xl:justify-start xl:gap-8">
            {TOP_CARDS.map((item) => (
              <WhyChooseCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 xl:justify-end xl:gap-8">
            {BOTTOM_CARDS.map((item) => (
              <WhyChooseCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
