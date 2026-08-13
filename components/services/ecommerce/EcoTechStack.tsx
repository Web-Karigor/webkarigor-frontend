import { ECO_TECH_ROWS, ECO_TECH_STACK_SECTION } from "@/lib/ecommerce-data";

export default function EcoTechStack() {
  return (
    <section className="bg-[#E7F6F5] py-12">
      {/*
        Figma: 1920 × hug(526), pad 48 / 453, gap 10.
        Content width ≈ 1920 - 453×2 = 1014px.
      */}
      <div className="mx-auto flex w-full max-w-[1014px] flex-col items-center gap-2.5 px-[clamp(16px,4vw,24px)] text-center">
        <h2 className="m-0 font-montserrat text-[clamp(26px,3vw,36px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#111827]">
          {ECO_TECH_STACK_SECTION.title}
        </h2>

        <p className="m-0 max-w-[640px] font-montserrat text-[15px] font-medium leading-[1.65] text-[#667085]">
          {ECO_TECH_STACK_SECTION.description}
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 sm:gap-5">
          {ECO_TECH_ROWS.map((row, rowIndex) => (
            <div
              key={`tech-row-${rowIndex}`}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              {row.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tech.icon}
                    alt=""
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                  <span className="font-montserrat text-[14px] font-semibold text-[#0F172A]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
