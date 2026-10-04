import {
  WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION,
  WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER,
  WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER,
} from "@/lib/website-design-development-data";

export default function Integrations() {
  const primary = WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER.slice(0, 5);
  const secondary = WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER.slice(5);
  const mobileItems = [
    ...WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER,
    ...WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER,
  ];

  return (
    <section className="overflow-hidden bg-[#eefafa] px-5 py-[clamp(48px,6vw,72px)]">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
        <div className="max-w-[520px] text-center">
          <h2 className="m-0 font-montserrat text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION.title}
          </h2>
          <p className="mt-3 m-0 font-manrope text-[14px] font-medium leading-[1.55] text-[#667085] sm:text-[12px]">
            {WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION.description}
          </p>
        </div>

        <div className="mt-7 grid w-full grid-cols-3 gap-2.5 sm:hidden">
          {mobileItems.map((tech) => (
            <TechnologyChip key={tech.name} tech={tech} compact />
          ))}
        </div>

        <div className="mt-7 hidden w-full flex-col items-center gap-4 sm:flex">
          <TechnologyRow items={primary} />
          <TechnologyRow items={secondary} />
          <TechnologyRow items={WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER} />
        </div>
      </div>
    </section>
  );
}

function TechnologyChip({
  tech,
  compact = false,
}: {
  tech: { name: string; icon: string };
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md bg-white shadow-[0_5px_14px_rgba(15,23,42,0.08)] ${
        compact
          ? "h-9 min-w-0 w-full px-2"
          : "h-9 w-[96px] px-3 sm:h-[42px] sm:w-[104px] sm:gap-2"
      }`}
      title={tech.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.icon}
        alt=""
        className="h-4 w-4 shrink-0 object-contain sm:h-6 sm:w-6"
        loading="lazy"
      />
      <span className="min-w-0 truncate font-montserrat text-[11px] font-medium text-[#1f2937] sm:text-[12px]">
        {tech.name}
      </span>
    </div>
  );
}

function TechnologyRow({
  items,
}: {
  items: readonly { name: string; icon: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((tech) => (
        <TechnologyChip key={tech.name} tech={tech} />
      ))}
    </div>
  );
}
