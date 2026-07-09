"use client";

type TechItem = {
  name: string;
  icon: string;
};

const TECH_ITEMS: TechItem[] = [
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Github",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Notion",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

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
        className={`flex w-max gap-[10px] will-change-transform ${
          reverse
            ? "animate-[service-tech-scroll-right_24s_linear_infinite]"
            : "animate-[service-tech-scroll-left_24s_linear_infinite]"
        } hover:[animation-play-state:paused]`}
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
              Why Webkarigor
            </span>
            <span className="mt-2 block text-[#000000] text-[32px]">
              More Than Beautiful Interfaces
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[900px] font-montserrat text-[12px] font-semibold leading-[1.45] text-[#A7A7A7] sm:mt-4 sm:text-[18px]">
            We combine strategy, research, and design thinking to create products
            that not only look good but perform exceptionally well in the real
            world.
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