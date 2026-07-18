"use client";

import Link from "next/link";
import { useState } from "react";
import { PRICING_FAQS } from "@/lib/pricing-data";

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#FFFDF6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[900px] px-[clamp(16px,4vw,40px)]">
        <div className="mb-12 text-center sm:mb-14">
          <h2 className="m-0 font-montserrat text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.02em]">
            <span className="italic font-medium text-[#0EC47B]">Questions</span>{" "}
            <span className="text-[#0A0A0A]">Answered?</span>
          </h2>
        </div>

        <div className="space-y-0">
          {PRICING_FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:bg-[#faf9f4]"
                >
                  <span className="min-w-0 flex-1 pr-2 font-montserrat text-[16px] font-medium text-[#141414] sm:text-[17px]">
                    {faq.question}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#141414]">
                    {open ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                        <line
                          x1="4"
                          y1="9"
                          x2="14"
                          y2="9"
                          stroke="#0EC47B"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                        <line
                          x1="9"
                          y1="4"
                          x2="9"
                          y2="14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="4"
                          y1="9"
                          x2="14"
                          y2="9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                {open && (
                  <p className="m-0 max-w-[720px] pb-5 font-montserrat text-[15px] font-medium leading-[1.65] text-[#667085]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 m-0 text-center font-montserrat text-[15px] font-medium text-[#667085]">
          Still curious? We&apos;re happy to help.{" "}
          <Link
            href="#contact"
            className="font-bold text-[#0EC47B] underline-offset-2 hover:underline"
          >
            Chat now
          </Link>
        </p>
      </div>
    </section>
  );
}
