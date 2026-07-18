"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsCTA({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] py-16 sm:py-20 md:py-24">
      {/* Figma: 1321 × Hug, vertical gap 40, centered (left 300 on 1920) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 1, ease }}
        className="mx-auto flex w-full flex-col items-center px-[clamp(16px,4vw,40px)] text-center"
        style={{
          maxWidth: PD.cta.w,
          gap: PD.cta.gap,
        }}
      >
        <h2
          className="m-0 font-montserrat font-bold leading-[130%] tracking-[-0.03em] text-black"
          style={{ fontSize: `clamp(28px, 3.4vw, ${PD.cta.titleSize}px)` }}
        >
          Have a project idea in mind?
        </h2>
        <p className="m-0 max-w-[780px] font-montserrat text-[15px] font-medium leading-[170%] text-black sm:text-[16px]">
          {project.ctaBody}
        </p>
        <Link
          href="/#contact"
          className="inline-flex h-[48px] items-center justify-center rounded-[10px] border border-black bg-transparent px-8 font-montserrat text-[15px] font-bold leading-none text-black transition hover:bg-black hover:text-white"
        >
          Let’s get started
        </Link>
      </motion.div>

      {/* Figma: 1321 × Hug(84), pad 24×32, gap 12, border top/bottom 0.5 #8E8874 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ duration: 1, delay: 0.12, ease }}
        className="mx-auto mt-16 w-full px-[clamp(16px,4vw,40px)] sm:mt-20"
        style={{ maxWidth: PD.cta.w + 80 }}
      >
        <Link
          href={`/projects/${project.nextSlug}`}
          className="mx-auto flex w-full items-center justify-center font-montserrat text-[13px] font-medium tracking-[0.14em] text-[#8E8874] uppercase transition hover:text-[#0A0A0A]"
          style={{
            maxWidth: PD.cta.w,
            padding: "24px 32px",
            gap: 12,
            borderTop: "0.5px solid #8E8874",
            borderBottom: "0.5px solid #8E8874",
          }}
        >
          View Next Project
          <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.75} />
        </Link>
      </motion.div>
    </section>
  );
}

export function ProjectDetailsRelated({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6]" style={{ paddingBottom: PD.sectionGap + 20 }}>
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
            className="m-0 font-montserrat text-[clamp(26px,3vw,40px)] font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]"
          >
            Other Related Projects
          </motion.h2>

          {/* Figma: 3 cards — image | text | image */}
          <div
            className="mt-8 grid grid-cols-1 sm:mt-10 md:grid-cols-3"
            style={{ gap: PD.related.gap }}
          >
            {project.related.map((item, index) => {
              const isText = item.variant === "text";
              return (
                <motion.article
                  key={`${item.slug}-${item.variant}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, delay: index * 0.08, ease }}
                  className="relative overflow-hidden bg-[#E8E4DC] shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
                  style={{
                    borderRadius: PD.related.cardRadius,
                    height: PD.related.cardH,
                  }}
                >
                  {isText ? (
                    <div className="flex h-full flex-col justify-between border border-[#EDEAE3] bg-white p-7 sm:p-8">
                      <p className="m-0 font-montserrat text-[15px] font-medium leading-[170%] text-[#6B7280]">
                        {item.description}
                      </p>
                      <Link
                        href={`/projects/${item.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 self-end font-montserrat text-[14px] font-bold leading-none text-[#0A0A0A] underline underline-offset-4 transition hover:opacity-70"
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/projects/${item.slug}`}
                      className="relative block h-full w-full"
                      aria-label={item.title}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="420px"
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
