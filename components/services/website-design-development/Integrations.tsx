import {
  WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION,
  WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER,
  WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER,
} from "@/lib/website-design-development-data";

export default function Integrations() {
  const primary = WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER.slice(0, 5);
  const secondary = WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER.slice(5);

  return (
    <section className="overflow-hidden bg-[#eefafa] px-5 py-[clamp(48px,6vw,72px)]">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
        <div className="max-w-[520px] text-center">
          <h2 className="m-0 font-montserrat text-[clamp(22px,2.5vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION.title}
          </h2>
          <p className="mt-3 m-0 font-manrope text-[10px] font-medium leading-[1.55] text-[#667085] sm:text-[11px]">
            {WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION.description}
          </p>
        </div>

        <div className="mt-7 flex w-full flex-col items-center gap-4">
          <TechnologyRow items={primary} />
          <TechnologyRow items={secondary} />
          <TechnologyRow items={WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER} />
        </div>
      </div>
    </section>
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
        <div
          key={tech.name}
          className="flex h-9 w-[96px] items-center gap-2 rounded-md bg-white px-3 shadow-[0_5px_14px_rgba(15,23,42,0.08)] sm:h-[42px] sm:w-[104px]"
          title={tech.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tech.icon}
            alt=""
            className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
            loading="lazy"
          />
          <span className="truncate font-montserrat text-[9px] font-medium text-[#1f2937] sm:text-[10px]">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
