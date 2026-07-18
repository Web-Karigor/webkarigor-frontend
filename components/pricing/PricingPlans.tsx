"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  formatPrice,
  planPrice,
  PR,
  PRICING_PLANS,
  type PricingBilling,
} from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15 } as const;

export default function PricingPlans() {
  const [billing, setBilling] = useState<PricingBilling>("monthly");

  return (
    <section className="bg-[#FFFDF6] pb-10 sm:pb-14">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 80 }}
      >
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-[#E8E4DC] bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            {(["monthly", "yearly"] as const).map((option) => {
              const active = billing === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBilling(option)}
                  className={`rounded-full px-6 py-2.5 font-montserrat text-[14px] font-bold capitalize transition ${
                    active
                      ? "bg-[#FEED35] text-[#0A0A0A]"
                      : "bg-transparent text-[#6B7280] hover:text-[#0A0A0A]"
                  }`}
                >
                  {option}
                  {option === "yearly" && (
                    <span className="ml-1.5 text-[11px] font-semibold text-[#0EC47B]">
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-12 lg:grid-cols-3 lg:gap-7">
          {PRICING_PLANS.map((plan, index) => {
            const price = planPrice(plan, billing);
            const popular = Boolean(plan.popular);

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.85, delay: index * 0.08, ease }}
                className={`relative flex flex-col rounded-[24px] border bg-white p-7 sm:p-8 ${
                  popular
                    ? "border-[#38F8AB] shadow-[0_0_40px_rgba(56,248,171,0.28)] lg:-mt-3 lg:mb-[-12px] lg:pb-10"
                    : "border-[#E8E4DC] shadow-[0_10px_32px_rgba(0,0,0,0.04)]"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#38F8AB] px-4 py-1 font-montserrat text-[12px] font-bold text-[#07422A]">
                    Most Popular
                  </span>
                )}

                <h3 className="m-0 font-montserrat text-[22px] font-bold text-[#0A0A0A]">
                  {plan.name}
                </h3>
                <p className="mt-2 m-0 font-montserrat text-[14px] font-medium text-[#6B7280]">
                  {plan.subtitle}
                </p>

                <p className="mt-6 m-0 font-montserrat text-[42px] font-bold leading-none text-[#0A0A0A]">
                  {formatPrice(price)}
                  <span className="ml-1.5 text-[15px] font-medium text-[#98A2B3]">
                    /mo
                  </span>
                </p>

                <hr className="my-6 border-0 border-t border-[#EDEAE3]" />

                <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-montserrat text-[14px] font-medium leading-[1.45] text-[#475467]"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#38F8AB]/25 text-[#0EC47B]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-[14px] px-5 py-3.5 font-montserrat text-[15px] font-bold transition hover:opacity-90 ${
                    popular
                      ? "mt-8 bg-[#0EC47B] text-white"
                      : "mt-8 border border-[#0A0A0A] bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
                  }`}
                >
                  Book a Call
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
