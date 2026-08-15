"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORK, FEATURED_WORK_SECTION } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

/** Figma: 1521 × 1083 Hug — same width as Complete Package (1520) */
const FEATURED_W = 1521;

function FeaturedImage({
  src,
  alt,
  href,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  href: string;
  sizes: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      data-project-cursor
      className={`group relative block overflow-hidden rounded-[20px] bg-[#1a1a1a] outline-none ${className}`}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        sizes={sizes}
      />
    </Link>
  );
}

export default function PricingFeaturedWork() {
  const { title, description, seeAll } = FEATURED_WORK_SECTION;
  const [topLeft, topRight, bottomLeft, bottomMid, bottomRight] = FEATURED_WORK;

  return (
    <section className="pricing-featured bg-black py-[clamp(64px,8vw,100px)]">
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
            {title}
          </h2>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:mt-8 sm:flex-row sm:items-end">
            <p className="m-0 max-w-[520px] font-montserrat text-[15px] font-medium leading-[1.6] text-white/70 sm:text-[16px]">
              {description}
            </p>
            <Link
              href={seeAll.href}
              className="inline-flex shrink-0 items-center gap-1.5 font-montserrat text-[15px] font-semibold text-white transition hover:opacity-80"
            >
              {seeAll.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {[topLeft, topRight].map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.8, delay: index * 0.06, ease }}
                >
                  <FeaturedImage
                    src={item.src}
                    alt={item.alt}
                    href={seeAll.href}
                    className="aspect-[16/10] w-full"
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
                >
                  <FeaturedImage
                    src={item.src}
                    alt={item.alt}
                    href={seeAll.href}
                    className="aspect-[4/3] w-full"
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
