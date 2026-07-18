"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsCredits({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6]" style={{ paddingTop: PD.sectionGap, paddingBottom: 40 }}>
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
            className="m-0 font-montserrat font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]"
            style={{ fontSize: `clamp(28px, 3vw, ${PD.credits.titleSize}px)` }}
          >
            CREDITS
          </motion.h2>

          <div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2"
            style={{ columnGap: PD.credits.colGap }}
          >
            {project.credits.map((credit, index) => (
              <motion.div
                key={`${credit.role}-${credit.name}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.9, delay: index * 0.03, ease }}
                className="flex items-center justify-between gap-4 border-b border-[#E8E4DC] py-5"
              >
                <p className="m-0 min-w-0 flex-1 font-montserrat text-[15px] font-medium leading-[150%] text-[#6b7280]">
                  {credit.role}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <div
                    className="relative overflow-hidden rounded-full bg-[#f3f1ea]"
                    style={{
                      width: PD.credits.avatar,
                      height: PD.credits.avatar,
                    }}
                  >
                    <Image
                      src={credit.avatar}
                      alt={credit.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <p className="m-0 font-montserrat text-[15px] font-bold leading-[150%] text-[#0A0A0A]">
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
