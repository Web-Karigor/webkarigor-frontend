"use client";

import { motion } from "framer-motion";
import { Code2, Handshake, Layers3, Zap } from "lucide-react";
import { ABOUT_WHY_CHOOSE } from "@/lib/about-data";

const ICONS = {
  support: Handshake,
  tech: Code2,
  plans: Layers3,
  performance: Zap,
} as const;

const TOP_CARDS = ABOUT_WHY_CHOOSE.slice(0, 2);
const BOTTOM_CARDS = ABOUT_WHY_CHOOSE.slice(2, 4);

function WhyChooseCard({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  index: number;
}) {
  const Icon = ICONS[icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex w-full max-w-[600px] flex-col items-center justify-center gap-6 rounded-[24px] border-2 border-transparent p-6 text-center shadow-[0_12px_40px_rgba(63,255,178,0.18),0_4px_20px_rgba(255,239,63,0.12)] md:h-[329px] md:w-[600px] md:max-w-none md:shrink-0"
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
    </motion.article>
  );
}

export default function AboutWhyChoose() {
  return (
    <section className="bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1478px] px-[clamp(16px,4vw,40px)] md:px-0">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="m-0 mx-auto max-w-[533px] font-museoModerno text-[clamp(28px,4vw,48px)] font-medium italic leading-[140%] tracking-[-0.05em] text-[#15D286]">
            Why Choose Webkarigor
          </h2>
          <p className="mt-3 m-0 font-montserrat text-[clamp(14px,1.15vw,16px)] font-medium text-[#6b7280]">
            Thoughtful Design and Technology Built for Long-Term Growth
          </p>
        </div>

        {/* Figma Frame 191: 1478 × 739 */}
        <div className="mx-auto flex w-full max-w-[1478px] flex-col gap-6 sm:gap-8 md:h-[739px] md:justify-between md:gap-0">
          {/* Top row — left */}
          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 md:justify-start md:gap-6 lg:gap-8">
            {TOP_CARDS.map((item, index) => (
              <WhyChooseCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>

          {/* Bottom row — right */}
          <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 md:justify-end md:gap-6 lg:gap-8">
            {BOTTOM_CARDS.map((item, index) => (
              <WhyChooseCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={index + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
