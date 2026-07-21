import { MANPOWER_TECH_ORBIT } from "@/lib/manpower-data";

/**
 * Figma 2409-12229 — 967 × 650
 * Left 3 arcs + Right 3 arcs (separate) · tight middle · icons both sides
 */
export default function ManpowerFeaturesOrbit() {
  const {
    title,
    description,
    frame,
    rings,
    leftCenter,
    rightCenter,
    icons,
  } = MANPOWER_TECH_ORBIT;

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
          style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${frame.width} ${frame.height}`}
            fill="none"
          >
            <defs>
              <linearGradient
                id="mp-orbit-grad-l"
                gradientUnits="userSpaceOnUse"
                x1={leftCenter.x - 335}
                y1={leftCenter.y}
                x2={leftCenter.x + 335}
                y2={leftCenter.y}
              >
                <stop offset="0%" stopColor="#1565D8" />
                <stop offset="50%" stopColor="#F8FBFF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient
                id="mp-orbit-grad-r"
                gradientUnits="userSpaceOnUse"
                x1={rightCenter.x - 335}
                y1={rightCenter.y}
                x2={rightCenter.x + 335}
                y2={rightCenter.y}
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F8FBFF" />
                <stop offset="100%" stopColor="#1565D8" />
              </linearGradient>
            </defs>

            {rings.map((ring, i) => (
              <ellipse
                key={`left-${i}`}
                cx={leftCenter.x}
                cy={leftCenter.y}
                rx={ring.rx}
                ry={ring.ry}
                stroke="url(#mp-orbit-grad-l)"
                strokeWidth="1.54"
                opacity={ring.opacity}
              />
            ))}

            {rings.map((ring, i) => (
              <ellipse
                key={`right-${i}`}
                cx={rightCenter.x}
                cy={rightCenter.y}
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

          {icons.map((tech) => {
            const center = tech.side === "left" ? leftCenter : rightCenter;
            const ring = rings[tech.ring];
            const rad = (tech.angle * Math.PI) / 180;
            const x = center.x + ring.rx * Math.cos(rad);
            const y = center.y + ring.ry * Math.sin(rad);
            const iconWidth =
              ((tech.size / frame.width) * 100).toFixed(4) + "%";

            return (
              <div
                key={tech.name}
                className={`absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_6px_22px_rgba(15,23,42,0.1)] ${
                  tech.ring === 0 ? "max-sm:hidden" : ""
                }`}
                style={{
                  left: `${(x / frame.width) * 100}%`,
                  top: `${(y / frame.height) * 100}%`,
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
