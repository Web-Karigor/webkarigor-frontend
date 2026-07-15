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

export default function AboutWhyChoose() {
  return (
    <section className="bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)]">
        <div className="mb-10 text-center sm:mb-14">
          <p className="m-0 font-montserrat text-[clamp(14px,1.15vw,16px)] font-semibold text-[#15d286]">
            Using Proven Methodologies
          </p>
          <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
          {ABOUT_WHY_CHOOSE.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="rounded-[24px] bg-gradient-to-br from-[#F3FFD6] via-[#F8FFDE] to-[#FFF6B8] p-7 sm:rounded-[28px] sm:p-8 md:p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#111827] shadow-[0_4px_16px_rgba(17,24,39,0.06)]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-5 m-0 font-montserrat text-[clamp(18px,1.5vw,22px)] font-bold leading-tight text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-3 m-0 max-w-[420px] font-montserrat text-[clamp(14px,1.05vw,15px)] font-medium leading-[1.65] text-[#6b7280]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
