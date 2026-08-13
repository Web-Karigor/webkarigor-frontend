"use client";

import servicesContent from "@/data/services-content.json";

type TechItem = {
  name: string;
  icon: string;
};

const { eyebrow, title, description, items: TECH_ITEMS } =
  servicesContent.techGrid;

const TOP_ROW = TECH_ITEMS.slice(0, 6);
const BOTTOM_ROW = TECH_ITEMS.slice(6);

function TechMarqueeRow({
  items,
  reverse = false,
}: {
  items: TechItem[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-[10px] will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-tech-scroll-right" : "animate-tech-scroll-left"
        }`}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="flex h-[108px] w-[120px] shrink-0 flex-col items-center justify-center gap-2 rounded-[12px] border border-white/50 bg-[#eef3f8] text-[#232b36] shadow-[0_0_0_1px_rgba(255,255,255,0.3)] sm:h-[156px] sm:w-[180px] sm:gap-3"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="h-5 w-5 object-contain sm:h-8 sm:w-8"
              loading="lazy"
              decoding="async"
            />
            <span className="font-montserrat text-[12px] leading-none font-semibold tracking-[-0.01em] sm:text-[25px]">
              {item.name}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function ServiceTechGrid() {
  return (
    <section className="bg-[#e7eef6] py-16">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center px-[clamp(16px,4vw,40px)]">
        <div className="mb-9 text-center">
          <h2 className="m-0 font-montserrat text-[clamp(26px,4.2vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#111827]">
            <span className="block text-[24px] text-[#15d286]">
              {eyebrow}
            </span>
            <span className="mt-2 block text-[#000000] text-[32px]">
              {title}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[900px] font-montserrat text-[12px] font-semibold leading-[1.45] text-[#A7A7A7] sm:mt-4 sm:text-[18px]">
            {description}
          </p>
        </div>

        <div className="relative grid w-full max-w-[1260px] gap-[10px] overflow-hidden">
          <TechMarqueeRow items={TOP_ROW} reverse />
          <TechMarqueeRow items={BOTTOM_ROW} />

          <div className="pointer-events-none absolute inset-y-0 left-0 w-[56px] bg-gradient-to-r from-[#e7eef6] via-[#e7eef6]/80 to-transparent sm:w-[120px] lg:w-[250px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[56px] bg-gradient-to-l from-[#e7eef6] via-[#e7eef6]/80 to-transparent sm:w-[120px] lg:w-[250px]" />
        </div>
      </div>
    </section>
  );
}
