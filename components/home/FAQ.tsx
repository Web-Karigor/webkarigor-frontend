"use client";

import Link from "next/link";
import { useState } from "react";
import homeContent from "@/data/home-content.json";

const { headingAccent, headingTitle, ctaText, ctaLabel, ctaHref, items: faqs } =
  homeContent.faq;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#FFFDF6] pb-8 md:pb-12">
      <div className="max-w-[1320px] mx-auto">
        {/* Header — Figma: Montserrat SemiBold 26 / 140% / -5% / Center / #000 */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="m-0 font-montserrat text-[26px] font-semibold leading-[140%] tracking-[-0.05em] text-black">
            <span className="italic text-[#39B770]">{headingAccent}</span>
            <span className="ml-1 not-italic">{headingTitle}</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-1 md:space-y-1 mb-12 md:mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#e5e5e5]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between py-5 text-left hover:bg-[#faf9f4] transition focus:outline-none`}
              >
                <span className="block min-w-0 flex-1 pr-3 text-base md:text-[26px] font-semibold leading-[100%] tracking-[-0.05em] text-[#141414]">
                  {faq.question}
                </span>
                <span
                  className="flex shrink-0 items-center justify-center w-6 h-6 rounded-full text-[#141414] font-bold text-xl transition-colors duration-200"
                >
                  {openIndex === index ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" className="text-[#39B770]"><line x1="4" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" className="text-[#141414]"><line x1="9" y1="4" x2="9" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="4" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="pr-0 pb-5">
                  <p className="text-base md:text-[20px] font-medium  tracking-[-0.05em] text-[#525151]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA — Figma: Montserrat SemiBold 26 / 140% / -5% / Center / #000 */}
        <div className="text-center">
          <p className="mb-6 font-montserrat text-[26px] font-semibold leading-[140%] tracking-[-0.05em] text-black">
            {ctaText}
          </p>
          <Link
            href={ctaHref}
            className="px-5 md:px-6 py-2 md:py-3 border border-[#000000] text-[#000000] font-semibold text-base md:text-lg rounded-lg transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
