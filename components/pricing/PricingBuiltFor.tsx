"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { COMPARISON_ITEMS } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.2 } as const;

/** Figma Frame 1000003108 — 1520 × Hug, gap 48 */
const BUILT_FOR_W = 1520;

/** Figma: green filled circle + white check */
function CompareCheck({ active }: { active: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        active ? "bg-[#15D286]" : "bg-[#E5E7EB]"
      }`}
      aria-hidden
    >
      <Check
        className={`h-3 w-3 ${active ? "text-white" : "text-[#F3F4F6]"}`}
        strokeWidth={3}
      />
    </span>
  );
}

export default function PricingBuiltFor() {
  return (
    <section className="bg-[#F8F6EF] py-[clamp(64px,8vw,100px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: BUILT_FOR_W + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.85, ease }}
          className="mx-auto flex flex-col gap-12"
          style={{ maxWidth: BUILT_FOR_W }}
        >
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <h2 className="m-0 max-w-[520px] font-montserrat text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0A]">
              Built for Growing Products
            </h2>
            <Link
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3.5 font-montserrat text-[15px] font-semibold text-white transition hover:opacity-90"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          {/* Figma: single card, soft green→yellow gradient border, 2 columns */}
          <div
            className="rounded-[28px] p-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, #AEFFDF 0%, #C8F5B8 35%, #FFF68F 100%)",
            }}
          >
            <div className="overflow-hidden rounded-[26.5px] bg-[#FFFEFB]">
              <div className="grid grid-cols-1 gap-10 px-[clamp(24px,4vw,56px)] py-[clamp(28px,4vw,48px)] md:grid-cols-2 md:gap-12 lg:gap-16">
                {/* Webkarigor — all active */}
                <div>
                  <h3 className="m-0 mb-6 font-montserrat text-[20px] font-bold text-[#0A0A0A] md:mb-8 md:text-[22px]">
                    Webkarigor
                  </h3>
                  <ul className="m-0 flex list-none flex-col gap-4 p-0 md:gap-5">
                    {COMPARISON_ITEMS.map((item) => (
                      <li
                        key={`wk-${item.label}`}
                        className="flex items-start gap-3 font-montserrat text-[clamp(14px,3.5vw,18px)] font-medium leading-[1.45] text-[#0A0A0A]"
                      >
                        <CompareCheck active />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Other Agencies — mixed active / faded */}
                <div>
                  <h3 className="m-0 mb-6 font-montserrat text-[20px] font-bold text-[#0A0A0A] md:mb-8 md:text-[22px]">
                    Other Agencies
                  </h3>
                  <ul className="m-0 flex list-none flex-col gap-4 p-0 md:gap-5">
                    {COMPARISON_ITEMS.map((item) => (
                      <li
                        key={`oa-${item.label}`}
                        className={`flex items-start gap-3 font-montserrat text-[clamp(14px,3.5vw,18px)] font-medium leading-[1.45] ${
                          item.otherHas ? "text-[#0A0A0A]" : "text-[#D1D5DB]"
                        }`}
                      >
                        <CompareCheck active={item.otherHas} />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
