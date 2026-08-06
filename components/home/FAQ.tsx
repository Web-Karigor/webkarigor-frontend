"use client";

import Link from "next/link";
import { useState } from "react";
import homeContent from "@/data/home-content.json";

const {
  badge,
  headingAccent,
  headingTitle,
  ctaText,
  ctaLabel,
  ctaHref,
  items: faqs,
} = homeContent.faq;

export default function FAQ({
  className = "bg-[#FFFDF6]",
}: {
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className={`relative scroll-mt-24 px-4 py-16 pb-8 font-montserrat md:px-6 md:py-24 md:pb-12 ${className}`}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="faq-section-header mb-12 text-center md:mb-16">
          <span className="faq-section-badge">
            <span className="faq-badge-text">{badge}</span>
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent faq-gradient-text faq-accent-text">
              {headingAccent}
            </span>
            <span className="section-heading-split-title">{headingTitle}</span>
          </h2>
        </div>

        <div className="mb-12 space-y-1 md:mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-[#e5e5e5]">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between py-7 text-left focus:outline-none md:py-8"
                >
                  <span className="block min-w-0 flex-1 pr-3 font-montserrat text-base font-semibold leading-[100%] tracking-[-0.05em] text-[#141414] md:text-[26px]">
                    {faq.question}
                  </span>
                  <span
                    className={`relative flex h-6 w-6 shrink-0 items-center justify-center text-[#141414] transition-colors duration-300 ease-out ${
                      isOpen ? "text-[#39B770]" : "text-[#141414]"
                    }`}
                    aria-hidden
                  >
                    {/* Horizontal bar always visible */}
                    <span className="absolute h-[2px] w-[14px] rounded-full bg-current" />
                    {/* Vertical bar rotates away for minus */}
                    <span
                      className={`absolute h-[14px] w-[2px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>

                {/* Height-only animation — no opacity (avoids flicker/shake) */}
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-7 pr-0 font-montserrat text-base font-medium tracking-[-0.05em] text-[#525151] md:pb-8 md:text-[20px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="mb-6 font-montserrat text-[26px] font-semibold leading-[140%] tracking-[-0.05em] text-black">
            {ctaText}
          </p>
          <Link
            href={ctaHref}
            className="cursor-pointer rounded-lg capitalize border border-[#000000] px-5 py-2 font-montserrat text-base font-semibold text-[#000000] transition-colors md:px-6 md:py-3 md:text-lg"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
