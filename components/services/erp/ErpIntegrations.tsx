import {
  ERP_INTEGRATIONS_SECTION,
  ERP_TECH_INNER,
  ERP_TECH_OUTER,
} from "@/lib/erp-data";

/** Inner triangle positions — Figma soft disc layout */
const INNER_LAYOUT = [
  { top: "22%", left: "50%" },
  { top: "62%", left: "28%" },
  { top: "62%", left: "72%" },
] as const;

/** Outer ring angles (degrees) */
const OUTER_ANGLES = [-90, -30, 30, 90, 150, 210] as const;

/**
 * Figma Frame 2409-11733 — 1307 × 550, horizontal, gap 212
 * Left: Technologies used in webkarigor
 * Right: soft disc + 2 orbit rings · inner GitHub/Notion/Figma · outer 6 tech icons
 */
export default function ErpIntegrations() {
  return (
    <section className="erp-integrations overflow-hidden bg-white py-[clamp(48px,6vw,80px)]">
      <div className="erp-integrations-inner mx-auto flex w-full max-w-[1307px] flex-col items-center gap-12 px-[clamp(16px,4vw,40px)] lg:flex-row lg:items-center lg:justify-between lg:gap-[clamp(48px,11vw,212px)]">
        {/* Left copy */}
        <div className="erp-integrations-copy w-full max-w-[650px] shrink-0 text-center lg:text-left">
          <h2 className="m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.2] tracking-[-0.02em] text-[#111827]">
            {ERP_INTEGRATIONS_SECTION.title}
          </h2>
          {/* Figma: 650×54 · Manrope SemiBold 600 · 18px · LH 150% · #A7A7A7 */}
          <p className="mt-5 m-0 h-auto w-full max-w-[650px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] lg:h-[54px]">
            {ERP_INTEGRATIONS_SECTION.description}
          </p>
        </div>

        {/* Right orbit — ~550 area, icons on rings */}
        <div className="erp-integrations-orbit relative mx-auto aspect-square w-full max-w-[480px] shrink-0 lg:mx-0 lg:max-w-[520px]">
          {/* Soft center disc */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EEF2FF]"
          />

          {/* Inner faint ring */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E4E7EC]"
          />

          {/* Outer faint ring */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E4E7EC]"
          />

          {/* Inner logos — GitHub / Notion / Figma */}
          {ERP_TECH_INNER.map((tech, index) => (
            <div
              key={tech.name}
              className="absolute z-[2] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] sm:h-16 sm:w-16"
              style={INNER_LAYOUT[index]}
              title={tech.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                loading="lazy"
              />
            </div>
          ))}

          {/* Outer orbit logos — positioned by angle on 88% ring */}
          {ERP_TECH_OUTER.map((tech, index) => {
            const angle = OUTER_ANGLES[index] ?? 0;
            const rad = (angle * Math.PI) / 180;
            const radius = 44; // % of container (matches ~88% diameter / 2)
            const left = 50 + radius * Math.cos(rad);
            const top = 50 + radius * Math.sin(rad);

            return (
              <div
                key={tech.name}
                className="absolute z-[2] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_18px_rgba(15,23,42,0.08)] sm:h-14 sm:w-14"
                style={{ left: `${left}%`, top: `${top}%` }}
                title={tech.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
