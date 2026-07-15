"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_IMPACT } from "@/lib/about-data";

export default function AboutImpact() {
  return (
    <section className="bg-[#FFFEFB] py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-12 px-[clamp(16px,4vw,40px)] lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <p className="m-0 max-w-[480px] font-montserrat text-[clamp(15px,1.15vw,18px)] font-medium leading-[1.7] text-[#6b7280]">
            {ABOUT_IMPACT.intro}
          </p>

          <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:gap-10">
            {ABOUT_IMPACT.stats.map((stat) => (
              <div key={stat.value} className="flex items-baseline gap-3 sm:gap-4">
                <span className="font-montserrat text-[clamp(48px,5.5vw,72px)] font-bold leading-none tracking-[-0.04em] text-[#111827]">
                  {stat.value}
                </span>
                <span className="pb-1 font-montserrat text-[clamp(14px,1.1vw,16px)] font-medium leading-snug text-[#6b7280]">
                  <span className="block font-semibold text-[#111827]">{stat.label}</span>
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
            <Image
              src={ABOUT_IMPACT.mainImage}
              alt="Webkarigor team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3 sm:mt-4 sm:gap-4">
            {ABOUT_IMPACT.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-[16px] sm:rounded-[20px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
