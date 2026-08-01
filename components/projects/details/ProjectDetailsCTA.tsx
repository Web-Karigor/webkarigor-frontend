"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  PROJECT_DETAILS_UI,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsCTA({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Figma: 1321 × Hug, vertical gap 40, centered (left 300 on 1920) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 1, ease }}
        className="mx-auto flex w-full flex-col items-center gap-6 px-[clamp(16px,4vw,40px)] text-center sm:gap-8 lg:gap-10"
        style={{ maxWidth: PD.cta.w }}
      >
        <h2 className="m-0 font-montserrat text-[clamp(24px,5.5vw,42px)] font-bold leading-[130%] tracking-[-0.03em] text-black">
          {PROJECT_DETAILS_UI.ctaTitle}
        </h2>
        <p className="m-0 max-w-[780px] font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-black">
          {project.ctaBody}
        </p>
        <Link
          href="/#contact"
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-black bg-transparent px-6 font-montserrat text-[14px] font-bold leading-none text-black transition hover:bg-black hover:text-white sm:h-[48px] sm:px-8 sm:text-[15px]"
        >
          {PROJECT_DETAILS_UI.ctaButton}
        </Link>
      </motion.div>

      {/* Figma: 1321 × Hug(84), pad 24×32, gap 12, border top/bottom 0.5 #8E8874 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ duration: 1, delay: 0.12, ease }}
        className="mx-auto mt-12 w-full px-[clamp(16px,4vw,40px)] sm:mt-16 md:mt-20"
        style={{ maxWidth: PD.cta.w + 80 }}
      >
        <Link
          href={`/projects/${project.nextSlug}`}
          className="mx-auto flex w-full items-center justify-center gap-2 border-y border-[#8E8874]/50 px-4 py-5 font-montserrat text-[11px] font-medium tracking-[0.08em] text-[#8E8874] uppercase transition hover:text-[#0A0A0A] sm:gap-3 sm:px-8 sm:py-6 sm:text-[13px] sm:tracking-[0.14em]"
          style={{ maxWidth: PD.cta.w }}
        >
          {PROJECT_DETAILS_UI.nextProject}
          <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.75} />
        </Link>
      </motion.div>
    </section>
  );
}

export function ProjectDetailsRelated({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] pb-12 sm:pb-16 md:pb-20 lg:pb-[120px]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.related.w + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.related.w }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1, ease }}
            className="m-0 font-montserrat text-[clamp(22px,5.5vw,40px)] font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]"
          >
            {PROJECT_DETAILS_UI.relatedProjects}
          </motion.h2>

          {/* Figma: 3 cards — image | text | image */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-3 md:gap-5">
            {project.related.map((item, index) => {
              const isText = item.variant === "text";
              return (
                <motion.article
                  key={`${item.slug}-${item.variant}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, delay: index * 0.08, ease }}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#E8E4DC] shadow-[0_8px_28px_rgba(0,0,0,0.06)] md:aspect-auto md:h-[420px] md:rounded-[24px]"
                >
                  {isText ? (
                    <div className="flex h-full flex-col justify-between border border-[#EDEAE3] bg-white p-5 sm:p-7 md:p-8">
                      <p className="m-0 font-montserrat text-[clamp(14px,3.5vw,15px)] font-medium leading-[170%] text-[#6B7280]">
                        {item.description}
                      </p>
                      <Link
                        href={`/projects/${item.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 self-end font-montserrat text-[14px] font-bold leading-none text-[#0A0A0A] underline underline-offset-4 transition hover:opacity-70"
                      >
                        {PROJECT_DETAILS_UI.viewProject}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/projects/${item.slug}`}
                      data-project-cursor
                      className="relative block h-full w-full"
                      aria-label={item.title}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </Link>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
