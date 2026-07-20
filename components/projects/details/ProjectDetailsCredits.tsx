"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsCredits({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 lg:pt-[100px] lg:pb-10">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1, ease }}
            className="m-0 font-montserrat text-[clamp(24px,6vw,40px)] font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]"
          >
            CREDITS
          </motion.h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 sm:mt-10 sm:grid-cols-2 md:gap-x-10 lg:gap-x-20">
            {project.credits.map((credit, index) => (
              <motion.div
                key={`${credit.role}-${credit.name}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, delay: index * 0.03, ease }}
                className="flex items-center justify-between gap-3 border-b border-[#E8E4DC] py-4 sm:gap-4 sm:py-5"
              >
                <p className="m-0 min-w-0 flex-1 font-montserrat text-[clamp(13px,3.2vw,15px)] font-medium leading-[150%] text-[#6b7280]">
                  {credit.role}
                </p>
                <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
                  <div
                    className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#f3f1ea] sm:h-10 sm:w-10"
                  >
                    <Image
                      src={credit.avatar}
                      alt={credit.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <p className="m-0 max-w-[100px] truncate font-montserrat text-[clamp(13px,3.2vw,15px)] font-bold leading-[150%] text-[#0A0A0A] sm:max-w-none sm:overflow-visible sm:whitespace-normal">
                    {credit.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
