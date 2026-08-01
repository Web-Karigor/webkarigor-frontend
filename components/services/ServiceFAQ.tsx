"use client";

import Link from "next/link";
import { useState } from "react";
import serviceSharedContent from "@/data/service-shared-content.json";

const {
  eyebrow,
  title,
  ctaText,
  ctaLabel,
  ctaHref,
  items: faqs,
} = serviceSharedContent.faq;

export default function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      {/* Figma Frame 298 — 1245 × hug, py 48, gap 80 */}
      <div className="mx-auto flex w-full max-w-[1245px] flex-col gap-20 px-[clamp(16px,4vw,40px)] py-12">
        <div className="text-center">
          <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#15d286]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-montserrat text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {title}
          </h2>
        </div>

        <div className="w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b-[0.5px] border-[#e5e7eb]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 bg-transparent py-6 text-left font-montserrat text-[clamp(15px,1.15vw,18px)] font-medium leading-[1.4] text-[#111827] transition-colors hover:text-[#0ec47b]"
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 pr-2">{faq.question}</span>
                  <span
                    className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                    <span
                      className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-200 ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10">
                    <p className="m-0 font-montserrat text-[clamp(14px,1vw,16px)] font-medium leading-[1.7] text-[#6b7280]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="m-0 mb-5 font-montserrat text-[clamp(18px,1.6vw,24px)] font-bold leading-[1.3] text-[#111827]">
            {ctaText}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-xl border-[0.5px] border-[#111827] px-7 py-3 font-montserrat text-[clamp(14px,1.1vw,16px)] font-bold text-[#111827] transition-colors hover:bg-[#111827] hover:text-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
