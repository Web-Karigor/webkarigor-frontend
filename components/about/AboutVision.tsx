"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_VISION } from "@/lib/about-data";

export default function AboutVision() {
  return (
    <section className="bg-[#FFFEFB] pb-16 sm:pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-[1800px] px-[clamp(16px,3.5vw,50px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[1725px] text-left"
        >
          <h2 className="m-0 font-montserrat text-[clamp(20px,2.2vw,30px)] font-medium leading-[160%] tracking-normal text-[#0A0A0A]">
            <span className="text-[clamp(36px,3.8vw,56px)] font-bold leading-[1.15] tracking-[-0.02em]">
              {ABOUT_VISION.title}
            </span>{" "}
            {ABOUT_VISION.lead} {ABOUT_VISION.body}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:grid-cols-[1.2fr_1fr] md:grid-rows-2 md:h-[min(780px,48vw)] md:gap-6"
        >
          {/* Large left image — full height */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[20px] sm:min-h-[400px] sm:rounded-[24px] md:row-span-2 md:min-h-0 md:rounded-[28px]">
            <Image
              src={ABOUT_VISION.images.large}
              alt="Team collaborating on product craft"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>

          {/* Top-right image */}
          <div className="relative min-h-[200px] overflow-hidden rounded-[20px] sm:min-h-[240px] sm:rounded-[24px] md:min-h-0 md:rounded-[28px]">
            <Image
              src={ABOUT_VISION.images.top}
              alt="Team discussion in the office"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          {/* Bottom-right pair */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="relative min-h-[160px] overflow-hidden rounded-[16px] sm:min-h-[200px] sm:rounded-[20px] md:min-h-0 md:rounded-[28px]">
              <Image
                src={ABOUT_VISION.images.bottomLeft}
                alt="Collaborating over ideas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 440px"
              />
            </div>
            <div className="relative min-h-[160px] overflow-hidden rounded-[16px] sm:min-h-[200px] sm:rounded-[20px] md:min-h-0 md:rounded-[28px]">
              <Image
                src={ABOUT_VISION.images.bottomRight}
                alt="Designer reviewing digital interfaces"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 440px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
