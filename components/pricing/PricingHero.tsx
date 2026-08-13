"use client";

import { motion } from "framer-motion";
import {
  MousePointer2,
  Code2,
  CalendarCheck2,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { PRICING_HERO, PRICING_HERO_FEATURES, PR } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.2 } as const;

const ICONS: Record<string, LucideIcon> = {
  pointer: MousePointer2,
  code: Code2,
  calendar: CalendarCheck2,
  compass: Compass,
};

/**
 * Figma Ellipse 1570 — in the GAPS between 4 cards
 * Size 199 · Gradient #AEFFDF → #FFF68F · Layer blur 240
 */
const GAP_GLOWS = ["25%", "50%", "75%"] as const;

export default function PricingHero() {
  return (
    <section className="relative bg-[#F8F6EF] pt-[120px] pb-8 sm:pt-[140px] sm:pb-10 lg:pb-12">
      {/* Soft green glow — top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(174, 255, 223, 0.55) 0%, rgba(248, 246, 239, 0) 70%)",
        }}
      />

      <div
        className="relative z-[1] mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.heroContent + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto text-center"
          style={{ maxWidth: PR.heroTitle.titleMax }}
        >
          {/* Figma: MuseoModerno Medium Italic 48 — gradient, NO underline */}
          <p
            className="m-0 mx-auto font-museoModerno font-medium italic text-center"
            style={{
              maxWidth: PR.heroTitle.eyebrowW,
              minHeight: PR.heroTitle.eyebrowH,
              fontSize: `clamp(28px, 3.5vw, ${PR.heroTitle.eyebrowSize}px)`,
              lineHeight: PR.heroTitle.eyebrowLeading,
              letterSpacing: PR.heroTitle.eyebrowTracking,
              background: PR.heroTitle.eyebrowGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {PRICING_HERO.eyebrow}
          </p>

          <h1
            className="m-0 font-montserrat font-bold text-[#1A1A1A]"
            style={{
              marginTop: PR.heroTitle.titleGap,
              fontSize: `clamp(28px, 4.2vw, ${PR.heroTitle.titleSize}px)`,
              lineHeight: PR.heroTitle.titleLeading,
              letterSpacing: PR.heroTitle.titleTracking,
            }}
          >
            {PRICING_HERO.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </motion.div>

        <div
          className="relative mt-12 sm:mt-14"
        >
          {/* ——— Gradients between cards (the red-circle spots) ——— */}
          <div
            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
            aria-hidden
          >
            {GAP_GLOWS.map((left) => (
              <div
                key={left}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left }}
              >
                {/* Figma Ellipse 1570: 199×199, #AEFFDF→#FFF68F, blur 240 */}
                <div
                  style={{
                    width: 199,
                    height: 199,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(180deg, #AEFFDF 0%, #FFF68F 100%)",
                    filter: "blur(240px)",
                    WebkitFilter: "blur(240px)",
                  }}
                />
                {/* Core so the gap glow stays readable (Figma soft blob) */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: 80,
                    height: 160,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(180deg, #AEFFDF 0%, #FFF68F 100%)",
                    filter: "blur(48px)",
                    WebkitFilter: "blur(48px)",
                    opacity: 0.85,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Mobile / tablet: softer gap glows still visible */}
          <div
            className="pointer-events-none absolute inset-0 z-0 lg:hidden"
            aria-hidden
          >
            <div
              className="absolute left-1/2 top-1/4 h-[199px] w-[199px] -translate-x-1/2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #AEFFDF 0%, #FFF68F 100%)",
                filter: "blur(120px)",
              }}
            />
            <div
              className="absolute left-1/2 top-3/4 h-[199px] w-[199px] -translate-x-1/2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #AEFFDF 0%, #FFF68F 100%)",
                filter: "blur(120px)",
              }}
            />
          </div>

          <div
            className="relative z-[1] grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5"
          >
            {PRICING_HERO_FEATURES.map((item, index) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: index * 0.06, ease }}
                  className="relative flex w-full max-w-[370px] flex-col gap-4 rounded-[20px] p-5 sm:gap-5 sm:p-6 lg:min-h-[329px] lg:p-8"
                  style={{
                    backgroundColor: PR.heroCard.bg,
                    boxShadow: PR.heroCard.shadow,
                  }}
                >
                  <span className="relative z-[1] inline-flex text-[#15D286]">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden />
                  </span>

                  <h3 className="relative z-[1] m-0 font-montserrat text-[clamp(17px,4vw,20px)] font-bold leading-[1.3] tracking-[-0.02em] text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="relative z-[1] m-0 font-montserrat text-[clamp(13px,3.5vw,15px)] font-medium leading-[1.65] text-[#666666]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
