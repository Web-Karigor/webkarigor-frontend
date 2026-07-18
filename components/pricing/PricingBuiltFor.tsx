"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { COMPARISON_ITEMS, PR } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.2 } as const;

export default function PricingBuiltFor() {
  return (
    <section className="bg-[#FFFDF6] py-[clamp(64px,8vw,100px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.85, ease }}
        >
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <h2 className="m-0 font-montserrat text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0A]">
              Built for Growing Products
            </h2>
            <Link
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3 font-montserrat text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          {/* Figma: Webkarigor vs Other Agencies */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            <article className="overflow-hidden rounded-[24px] border border-[#E8E4DC] bg-white">
              <div className="bg-[#DFFCF0] px-7 py-4">
                <h3 className="m-0 font-montserrat text-[18px] font-bold text-[#0A0A0A]">
                  Webkarigor
                </h3>
              </div>
              <ul className="m-0 flex list-none flex-col gap-4 p-7">
                {COMPARISON_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-montserrat text-[15px] font-medium leading-[1.45] text-[#374151]"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#0EC47B]">
                      <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="overflow-hidden rounded-[24px] border border-[#E8E4DC] bg-white">
              <div className="bg-[#F3F4F6] px-7 py-4">
                <h3 className="m-0 font-montserrat text-[18px] font-bold text-[#9CA3AF]">
                  Other Agencies
                </h3>
              </div>
              <ul className="m-0 flex list-none flex-col gap-4 p-7">
                {COMPARISON_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-montserrat text-[15px] font-medium leading-[1.45] text-[#D1D5DB]"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#D1D5DB]">
                      <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
