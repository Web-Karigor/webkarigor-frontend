"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_HERO_IMAGES } from "@/lib/about-data";

const HEIGHTS = ["88%", "100%", "92%", "100%", "86%"] as const;

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFEFB] pt-[110px] sm:pt-[130px] lg:pt-[150px]">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(16px,4vw,40px)]">
        <div className="flex h-[220px] items-end justify-center gap-2 sm:h-[320px] sm:gap-3 md:h-[420px] md:gap-4 lg:h-[480px] lg:gap-5">
          {ABOUT_HERO_IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-w-0 flex-1 overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px]"
              style={{ height: HEIGHTS[index] }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={index < 3}
                className="object-cover"
                sizes="(max-width: 768px) 20vw, 240px"
              />
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-[920px] text-center font-montserrat text-[clamp(28px,4.2vw,56px)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827] sm:mt-14 md:mt-16"
        >
          Building Digital Products That Empower Businesses and Delight Users.
        </motion.h1>
      </div>
    </section>
  );
}
