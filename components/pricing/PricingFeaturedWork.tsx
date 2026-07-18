"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORK, PR } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

export default function PricingFeaturedWork() {
  return (
    <section className="bg-black py-[clamp(64px,8vw,100px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 160 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.85, ease }}
          className="mx-auto max-w-[920px] text-center"
        >
          <h2 className="m-0 font-montserrat text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.2] tracking-[-0.03em] text-white">
            Featured Work That Turns Ideas Into Digital Products
          </h2>
          <p className="mx-auto mt-4 m-0 max-w-[640px] font-montserrat text-[15px] font-medium leading-[1.6] text-white/65 sm:text-[16px]">
            Explore selected work that highlights our design, development, and
            problem-solving approach.
          </p>
          <div className="mt-5 flex justify-center sm:justify-end sm:pr-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-montserrat text-[14px] font-bold text-white transition hover:opacity-80"
            >
              See All
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 columns-1 gap-4 sm:mt-12 sm:columns-2 sm:gap-5 lg:columns-3">
          {FEATURED_WORK.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.8, delay: index * 0.05, ease }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-[20px] sm:mb-5"
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
