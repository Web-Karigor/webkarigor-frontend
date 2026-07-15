"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_VISION } from "@/lib/about-data";

export default function AboutVision() {
  return (
    <section className="bg-[#FFFEFB] pb-16 sm:pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(16px,4vw,40px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="m-0 font-montserrat text-[clamp(32px,4vw,52px)] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            {ABOUT_VISION.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] font-montserrat text-[clamp(15px,1.15vw,18px)] font-medium leading-[1.7] text-[#6b7280]">
            {ABOUT_VISION.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-[1.05fr_1fr] md:gap-5"
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-[20px] sm:min-h-[420px] sm:rounded-[24px] md:min-h-[520px]">
            <Image
              src={ABOUT_VISION.images.large}
              alt="Team working on product craft"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>

          <div className="grid grid-rows-[1.15fr_1fr] gap-3 sm:gap-4 md:gap-5">
            <div className="relative min-h-[180px] overflow-hidden rounded-[20px] sm:min-h-[220px] sm:rounded-[24px]">
              <Image
                src={ABOUT_VISION.images.top}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <div className="relative min-h-[140px] overflow-hidden rounded-[16px] sm:min-h-[180px] sm:rounded-[20px]">
                <Image
                  src={ABOUT_VISION.images.bottomLeft}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="relative min-h-[140px] overflow-hidden rounded-[16px] sm:min-h-[180px] sm:rounded-[20px]">
                <Image
                  src={ABOUT_VISION.images.bottomRight}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
