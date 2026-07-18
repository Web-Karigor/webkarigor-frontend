"use client";

import { motion } from "framer-motion";
import { PROJECTS_INTRO } from "@/lib/projects-data";

export default function ProjectsHero() {
  return (
    <section className="relative bg-[#FFFDF6] pt-[120px] sm:pt-[140px] lg:pt-[160px]">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 font-montserrat text-[clamp(40px,6vw,72px)] font-bold leading-none tracking-[-0.04em] text-[#0A0A0A]"
        >
          {PROJECTS_INTRO.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-[720px] font-montserrat text-[clamp(14px,1.2vw,17px)] font-medium leading-[1.7] text-[#6b7280] sm:mt-6"
        >
          {PROJECTS_INTRO.body}
        </motion.p>
      </div>
    </section>
  );
}
