"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  formatPrice,
  planPrice,
  PRICING_PLANS,
  PRICING_PLANS_SECTION,
  type PricingBilling,
} from "@/lib/pricing-data";

export default function PricingPlans() {
  const [billing, setBilling] = useState<PricingBilling>("yearly");
  const { saveBadge, includedLabel, popularLabel, whatYouGetLabel, cta } =
    PRICING_PLANS_SECTION;

  return (
    <section className="pricing-section bg-[#F8F6EF] !pt-0">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        {/* Monthly / Yearly toggle */}
        <div className="mb-10 flex flex-col items-center gap-3 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center rounded-full bg-[#FEED35] p-1">
              {(["monthly", "yearly"] as const).map((option) => {
                const active = billing === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBilling(option)}
                    className={`rounded-full px-4 py-2 font-montserrat text-[13px] font-bold capitalize transition sm:px-6 sm:py-2.5 sm:text-[15px] ${
                      active
                        ? "bg-white text-black shadow-sm"
                        : "bg-transparent text-black/80 hover:text-black"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <span className="inline-flex items-center rounded-full bg-black px-3 py-1.5 font-montserrat text-[11px] font-bold text-white sm:px-3.5 sm:text-[12px]">
              {saveBadge}
            </span>
          </div>
          <p className="m-0 font-montserrat text-[14px] font-medium text-[#9CA3AF]">
            {includedLabel}
          </p>
        </div>

        {/* Same card design as home PricingSection */}
        <div className="grid grid-cols-1 gap-8 pt-8 sm:gap-12 sm:pt-12 lg:grid-cols-3 lg:gap-16 lg:pt-16">
          {PRICING_PLANS.map((plan) => {
            const price = planPrice(plan, billing);
            const highlight = Boolean(plan.popular);

            return (
              <div
                key={plan.id}
                className={`pricing-card relative p-[2px] transition-all duration-300 ${
                  highlight ? "pricing-card-highlight" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #0EC47B, #2EEDA0, #FEF33F, #15D286)",
                  boxShadow: highlight
                    ? "0 0 40px rgba(46, 237, 160, 0.35)"
                    : "none",
                }}
              >
                <div className="pricing-card-inner relative h-full bg-[#FFFDF6]">
                  {highlight && (
                    <div className="absolute top-3 left-1/2 w-[90%] -translate-x-1/2 rounded-[12px] bg-[#38F8AB] px-4 py-1 text-center text-base font-semibold text-[#07422A] shadow-md sm:rounded-[16px] sm:px-8 sm:text-xl">
                      {popularLabel}
                    </div>
                  )}

                  <h3 className="font-monserrat mb-4 mt-6 text-center text-2xl font-semibold text-[#111] sm:mb-6 sm:mt-8 sm:text-3xl lg:text-4xl">
                    {plan.name}
                  </h3>

                  <div className="mb-2 text-3xl font-bold text-[#15D286] sm:text-4xl">
                    {formatPrice(price)}
                  </div>

                  <p className="font-monserrat mb-6 mt-3 text-base font-semibold text-black sm:mb-8 sm:mt-4 sm:text-lg lg:text-[20px]">
                    {plan.subtitle}
                  </p>

                  <hr className="mb-6 border-gray-200" />

                  <div className="mb-10">
                    <p className="mb-4 font-semibold text-[#111]">{whatYouGetLabel}</p>

                    <ul className="space-y-3 text-sm text-gray-700">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="text-[#15D286]">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={cta.href}
                    className="flex w-full items-center justify-center gap-[10px] rounded-[16px] px-6 py-4 text-sm font-semibold text-[#07422A] transition hover:opacity-90 sm:rounded-[20px] sm:px-8 sm:py-5 sm:text-base"
                    style={{
                      background: "linear-gradient(to right, #38F8AB, #FEED35)",
                    }}
                  >
                    {cta.label}
                    <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
