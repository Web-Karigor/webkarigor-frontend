"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetailsHero({ project }: { project: ProjectDetail }) {
  const { hero } = PD;
  /** 3 cards + 2 gaps — button + cards share this block so button aligns with first card */
  const galleryW = hero.cardW * 3 + hero.gap * 2;

  return (
    <section className="relative bg-[#FFFDF6] pt-[110px] sm:pt-[120px] lg:pt-[132px]">
      <div
        className="mx-auto w-full px-[clamp(16px,2.5vw,60px)]"
        style={{ maxWidth: PD.heroContent + 120 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.heroContent }}>
          {/* Centered gallery block — button sits on first card’s left edge (shifted right) */}
          <div
            className="mx-auto w-full"
            style={{
              maxWidth: galleryW,
              marginTop: hero.backTop,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Link
                href="/projects"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#FFF68F] px-5 font-montserrat text-[14px] font-semibold leading-none text-[#0A0A0A] transition hover:bg-[#f5e96a]"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                Back to Projects
              </Link>
            </motion.div>

            <div
              className="mt-8 grid w-full grid-cols-1 justify-items-center md:grid-cols-3"
              style={{ gap: hero.gap }}
            >
              {project.heroImages.map((src, index) => (
                <motion.div
                  key={`${src}-${index}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.08 * index, ease }}
                  className="relative w-full overflow-hidden"
                  style={{
                    maxWidth: hero.cardW,
                    width: "100%",
                    aspectRatio: `${hero.cardW} / ${hero.cardH}`,
                    borderRadius: hero.radius,
                    padding: hero.pad,
                    backgroundColor: hero.cardBg,
                    backdropFilter: `blur(${hero.blur}px)`,
                    WebkitBackdropFilter: `blur(${hero.blur}px)`,
                    boxShadow: hero.shadow,
                  }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden"
                    style={{ borderRadius: Math.max(0, hero.radius - hero.pad) }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      priority={index < 2}
                      className="object-cover"
                      sizes="562px"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
