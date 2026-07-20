"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_IMPACT } from "@/lib/about-data";

export default function AboutImpact() {
  return (
    <section className="bg-[#FFFAEA] xl:h-[756px] xl:min-h-[756px] xl:flex xl:items-center mt-10 mb-14">
      <div className="mx-auto grid w-full pt-10 pb-10 max-w-[1920px] grid-cols-1 items-center gap-12 px-[clamp(16px,4.75vw,99px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
        {/* Left — copy + stats */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <p className="m-0 max-w-[523px] font-montserrat text-[clamp(15px,1.2vw,18px)] font-medium leading-[1.7] text-[#0A0A0A]">
            {ABOUT_IMPACT.intro}
          </p>

          <div className="mt-10 flex flex-col sm:mt-12">
            {ABOUT_IMPACT.stats.map((stat, index) => (
              <div
                key={stat.value}
                className={
                  index === 0
                    ? "border-b border-[#d1d5db]/70 pb-8 sm:pb-10"
                    : "pt-8 sm:pt-10"
                }
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 md:gap-8">
                  <div className="shrink-0">
                    <p className="m-0 font-montserrat text-[clamp(40px,10vw,72px)] font-bold leading-none tracking-[-0.04em] text-[#0A0A0A]">
                      {stat.value}
                    </p>
                    <p className="mt-1 m-0 font-montserrat text-[clamp(16px,4vw,24px)] font-bold leading-none text-[#0A0A0A]">
                      {stat.label}
                    </p>
                  </div>
                  <p className="m-0 max-w-[344px] pt-0 font-montserrat text-[clamp(14px,1.1vw,16px)] font-medium leading-[1.65] text-[#6b7280] sm:pt-3">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — main image + overlapping gallery */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <div className="relative xl:pt-1">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[32px] xl:max-w-[1100px]">
              <Image
                src={ABOUT_IMPACT.mainImage}
                alt="Webkarigor team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>

            <div className="relative z-10 -mt-10 grid grid-cols-4 gap-2 px-2 sm:-mt-14 sm:gap-3 sm:px-4 md:-mt-16 md:gap-4 md:px-5 xl:max-w-[1100px]">
              {ABOUT_IMPACT.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[5/4] overflow-hidden rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:rounded-[16px] md:rounded-[20px]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
