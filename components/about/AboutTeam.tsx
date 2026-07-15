"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_TEAM_IMAGES } from "@/lib/about-data";

export default function AboutTeam() {
  const topRow = ABOUT_TEAM_IMAGES.slice(0, 4);
  const bottomRow = ABOUT_TEAM_IMAGES.slice(4, 8);

  return (
    <section className="overflow-hidden bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-[clamp(16px,4vw,40px)]">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 className="m-0 max-w-[640px] font-montserrat text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#111827]">
            Our Team Is at the Heart of Everything We Do
          </h2>
          <p className="m-0 max-w-[380px] font-montserrat text-[clamp(14px,1.05vw,16px)] font-medium leading-[1.65] text-[#6b7280] lg:text-right">
            A tight-knit crew of designers, engineers, and strategists building products that matter.
          </p>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ABOUT_TEAM_IMAGES.map((src, index) => (
              <div
                key={src}
                className="relative aspect-[4/5] overflow-hidden rounded-[18px] sm:rounded-[22px]"
              >
                <Image
                  src={src}
                  alt={`Team member ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="45vw"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="m-0 font-montserrat text-[clamp(40px,12vw,64px)] font-bold leading-[0.92] tracking-[-0.04em] text-[#111827]">
              Small Team
            </p>
            <p className="m-0 mt-1 font-montserrat text-[clamp(40px,12vw,64px)] font-bold leading-[0.92] tracking-[-0.04em] text-[#A0A4AA]">
              Big Result
            </p>
          </div>
        </div>

        {/* Desktop — Figma: photos + Small Team / Big Result */}
        <div className="hidden lg:block">
          <div className="mb-6 flex items-center gap-5 xl:gap-6">
            <div className="grid min-w-0 flex-1 grid-cols-4 gap-4 xl:gap-5">
              {topRow.map((src, index) => (
                <motion.div
                  key={`top-${src}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-[220px] shrink-0 text-right font-montserrat text-[clamp(52px,5vw,76px)] font-bold leading-[0.88] tracking-[-0.04em] text-[#111827] xl:w-[260px]"
            >
              <span className="block">Small</span>
              <span className="block">Team</span>
            </motion.div>
          </div>

          <div className="flex items-center gap-5 xl:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-[220px] shrink-0 font-montserrat text-[clamp(52px,5vw,76px)] font-bold leading-[0.88] tracking-[-0.04em] text-[#A0A4AA] xl:w-[260px]"
            >
              <span className="block">Big</span>
              <span className="block">Result</span>
            </motion.div>
            <div className="grid min-w-0 flex-1 grid-cols-4 gap-4 xl:gap-5">
              {bottomRow.map((src, index) => (
                <motion.div
                  key={`bottom-${src}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
