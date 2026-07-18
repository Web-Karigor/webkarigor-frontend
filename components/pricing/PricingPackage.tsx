"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PACKAGE_COLUMNS, PR } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

export default function PricingPackage() {
  return (
    <section className="bg-[#FFFDF6] py-[clamp(64px,8vw,100px)]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden rounded-[32px] bg-black px-[clamp(24px,4vw,64px)] py-[clamp(48px,6vw,80px)]"
        >
          <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[65%] -translate-x-1/2 rounded-full bg-[#38F8AB]/22 blur-[90px]" />

          <h2 className="relative m-0 mx-auto max-w-[900px] text-center font-montserrat text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.2] tracking-[-0.03em] text-white">
            A Complete Package Of Everything You Need To Grow
          </h2>

          {/* Figma: 4 columns of checklist items */}
          <div className="relative mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {PACKAGE_COLUMNS.map((column, colIndex) => (
              <ul key={colIndex} className="m-0 flex list-none flex-col gap-4 p-0">
                {column.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-montserrat text-[14px] font-medium leading-[1.45] text-white/90 sm:text-[15px]"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#38F8AB]">
                      <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
