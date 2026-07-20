"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORK } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

/** Figma: 1521 × 1083 Hug — same width as Complete Package (1520) */
const FEATURED_W = 1521;

export default function PricingFeaturedWork() {
  const [topLeft, topRight, bottomLeft, bottomMid, bottomRight] = FEATURED_WORK;

  return (
    <section className="bg-black py-[clamp(64px,8vw,100px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: FEATURED_W + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.85, ease }}
          className="mx-auto"
          style={{ maxWidth: FEATURED_W }}
        >
          <h2 className="m-0 mx-auto max-w-[900px] text-center font-montserrat text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.2] tracking-[-0.03em] text-white">
            Featured Work That Turns Ideas Into Digital Products
          </h2>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:mt-8 sm:flex-row sm:items-end">
            <p className="m-0 max-w-[520px] font-montserrat text-[15px] font-medium leading-[1.6] text-white/70 sm:text-[16px]">
              Explore selected work that highlights our design, development, and
              problem-solving approach.
            </p>
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-1.5 font-montserrat text-[15px] font-semibold text-white transition hover:opacity-80"
            >
              See All
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          {/* Figma grid: 2 top + 3 bottom, full 1521 width */}
          <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {[topLeft, topRight].map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: index * 0.06, ease }}
                  className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#1a1a1a]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 760px"
                  />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {[bottomLeft, bottomMid, bottomRight].map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: 0.12 + index * 0.06, ease }}
                  className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#1a1a1a]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 500px"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
