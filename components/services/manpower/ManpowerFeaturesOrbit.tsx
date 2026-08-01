import { MANPOWER_TECH_ORBIT } from "@/lib/manpower-data";

/** Figma 2409-12229 — 967 × 650 orbit geometry */
const FRAME = { width: 967, height: 650 } as const;
const RINGS = [
  { rx: 215, ry: 175, opacity: 0.1 },
  { rx: 275, ry: 225, opacity: 0.2 },
  { rx: 335, ry: 275, opacity: 0.4 },
] as const;
const LEFT_CENTER = { x: 375, y: 325 } as const;
const RIGHT_CENTER = { x: 592, y: 325 } as const;

/** Icon placement by index — matches MANPOWER_TECH_ORBIT.icons order */
const ICON_LAYOUT = [
  { side: "left" as const, ring: 2, angle: -130, size: 56 },
  { side: "left" as const, ring: 2, angle: -100, size: 54 },
  { side: "left" as const, ring: 1, angle: 180, size: 68 },
  { side: "left" as const, ring: 2, angle: 130, size: 52 },
  { side: "left" as const, ring: 2, angle: 100, size: 56 },
  { side: "left" as const, ring: 0, angle: 158, size: 50 },
  { side: "left" as const, ring: 0, angle: 135, size: 50 },
  { side: "right" as const, ring: 2, angle: -50, size: 54 },
  { side: "right" as const, ring: 2, angle: 0, size: 78 },
  { side: "right" as const, ring: 2, angle: 50, size: 54 },
  { side: "right" as const, ring: 1, angle: -65, size: 48 },
  { side: "right" as const, ring: 0, angle: -12, size: 54 },
  { side: "right" as const, ring: 0, angle: 72, size: 50 },
  { side: "right" as const, ring: 1, angle: 78, size: 52 },
] as const;

/**
 * Figma 2409-12229 — 967 × 650
 * Left 3 arcs + Right 3 arcs (separate) · tight middle · icons both sides
 */
export default function ManpowerFeaturesOrbit() {
  const { title, description, icons } = MANPOWER_TECH_ORBIT;

  return (
    <section className="w-full overflow-hidden py-8 md:py-12">
      {/* Mobile — copy above orbit so icons never cover text */}
      <div className="mx-auto mb-6 max-w-[min(100%,520px)] px-4 text-center lg:hidden">
        <h2 className="m-0 font-montserrat text-[clamp(22px,6vw,28px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#111827]">
          {title}
        </h2>
        <p className="mt-3 m-0 font-manrope text-[14px] font-semibold leading-[150%] text-[#A7A7A7] sm:text-[15px]">
          {description}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-center px-4 md:px-[clamp(16px,4vw,48px)]">
        <div
          className="relative mx-auto w-full max-w-[min(100%,360px)] [--mp-icon-scale:0.72] sm:max-w-[min(100%,440px)] sm:[--mp-icon-scale:0.82] lg:max-w-[967px] lg:[--mp-icon-scale:1]"
          style={{ aspectRatio: `${FRAME.width} / ${FRAME.height}` }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${FRAME.width} ${FRAME.height}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="mp-orbit-grad-l"
                gradientUnits="userSpaceOnUse"
                x1={LEFT_CENTER.x - 335}
                y1={LEFT_CENTER.y}
                x2={LEFT_CENTER.x + 335}
                y2={LEFT_CENTER.y}
              >
                <stop offset="0%" stopColor="#1565D8" />
                <stop offset="50%" stopColor="#F8FBFF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient
                id="mp-orbit-grad-r"
                gradientUnits="userSpaceOnUse"
                x1={RIGHT_CENTER.x - 335}
                y1={RIGHT_CENTER.y}
                x2={RIGHT_CENTER.x + 335}
                y2={RIGHT_CENTER.y}
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F8FBFF" />
                <stop offset="100%" stopColor="#1565D8" />
              </linearGradient>
            </defs>

            {RINGS.map((ring, i) => (
              <ellipse
                key={`left-${i}`}
                cx={LEFT_CENTER.x}
                cy={LEFT_CENTER.y}
                rx={ring.rx}
                ry={ring.ry}
                stroke="url(#mp-orbit-grad-l)"
                strokeWidth="1.54"
                opacity={ring.opacity}
              />
            ))}

            {RINGS.map((ring, i) => (
              <ellipse
                key={`right-${i}`}
                cx={RIGHT_CENTER.x}
                cy={RIGHT_CENTER.y}
                rx={ring.rx}
                ry={ring.ry}
                stroke="url(#mp-orbit-grad-r)"
                strokeWidth="1.54"
                opacity={ring.opacity}
              />
            ))}
          </svg>

          {/* Desktop / tablet — centered copy over orbit */}
          <div className="absolute left-1/2 top-1/2 z-[1] hidden w-[min(88%,360px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center lg:flex">
            <h2 className="m-0 font-montserrat text-[clamp(20px,2.3vw,28px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#111827]">
              {title}
            </h2>
            <p className="mt-2.5 m-0 font-manrope text-[clamp(13px,1.05vw,16px)] font-semibold leading-[150%] text-[#A7A7A7]">
              {description}
            </p>
          </div>

          {icons.map((tech, index) => {
            const layout = ICON_LAYOUT[index];
            if (!layout) return null;
            const center = layout.side === "left" ? LEFT_CENTER : RIGHT_CENTER;
            const ring = RINGS[layout.ring];
            const rad = (layout.angle * Math.PI) / 180;
            const x = center.x + ring.rx * Math.cos(rad);
            const y = center.y + ring.ry * Math.sin(rad);
            const iconWidth =
              ((layout.size / FRAME.width) * 100).toFixed(4) + "%";

            return (
              <div
                key={tech.name}
                className={`absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_6px_22px_rgba(15,23,42,0.1)] ${
                  layout.ring === 0 ? "max-sm:hidden" : ""
                }`}
                style={{
                  left: `${(x / FRAME.width) * 100}%`,
                  top: `${(y / FRAME.height) * 100}%`,
                  width: `calc(${iconWidth} * var(--mp-icon-scale))`,
                  aspectRatio: "1 / 1",
                }}
                title={tech.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-[48%] w-[48%] object-contain"
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
