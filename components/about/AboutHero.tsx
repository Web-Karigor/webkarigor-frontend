"use client";

import { motion } from "framer-motion";
import { ABOUT_HERO_IMAGES } from "@/lib/about-data";
import Carousel from "./Carousel";

export default function AboutHero() {
  return (
    <section className="relative overflow-x-clip bg-[#FFFEFB] pt-[110px] sm:pt-[130px] lg:pt-[150px]">
      <div className="w-full">
        <Carousel images={ABOUT_HERO_IMAGES} />
      </div>

      <div className="mx-auto w-full max-w-[1174px] px-[clamp(16px,4vw,40px)]">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 text-center font-montserrat text-[clamp(32px,4.2vw,60px)] font-bold leading-[150%] tracking-[-0.05em] text-black sm:mt-14 md:mt-16"
        >
          Building Digital Products That Empower Businesses and Delight Users
        </motion.h1>
      </div>
    </section>
  );
}
