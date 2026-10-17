"use client";

import "./FAQ.css";

import { useMemo, useState } from "react";
import { openConsultationModal } from "@/components/home/ConsultationModal";
import { useFaqSoftwareDevelopementQuery } from "@/hooks/queries/useFaqSoftwareDevelopementQuery";

export default function FAQ({
  className = "bg-[#FFFDF6]",
}: {
  className?: string;
  ctaHref?: string;
}) {
  const { data } = useFaqSoftwareDevelopementQuery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = useMemo(
    () =>
      [...(data?.data?.posts ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((post) => ({
          id: post.id,
          question: post.fields?.question?.trim() ?? "",
          answer: post.fields?.answer?.trim() ?? "",
        }))
        .filter((item) => item.question && item.answer),
    [data],
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  if (!faqs.length) return null;

  return (
    <section
      id="faq"
      className={`relative scroll-mt-24 px-4 py-16 pb-8 font-montserrat md:px-6 md:py-24 md:pb-12 ${className}`}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="faq-section-header mb-12 text-center md:mb-16">
          <span className="faq-section-badge">
            <span className="faq-badge-text">Frequently Asked Questions</span>
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent faq-gradient-text faq-accent-text">
              Custom Software
            </span>
            <span className="section-heading-split-title">Questions Answered?</span>
          </h2>
        </div>

        <div className="mb-12 space-y-1 md:mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.id} className="border-b border-[#e5e5e5]">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between py-7 text-left focus:outline-none md:py-8"
                >
                  <span className="faq-question-text block min-w-0 flex-1 pr-3 font-montserrat text-base font-semibold tracking-[-0.02em] text-[#141414] md:text-[26px] md:tracking-[-0.05em]">
                    {faq.question}
                  </span>
                  <span
                    className={`relative flex h-6 w-6 shrink-0 items-center justify-center text-[#141414] transition-colors duration-300 ease-out ${
                      isOpen ? "text-[#39B770]" : "text-[#141414]"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute h-[2px] w-[14px] rounded-full bg-current" />
                    <span
                      className={`absolute h-[14px] w-[2px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>

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
          <p className="faq-cta-heading mx-auto mb-6 max-w-[669px] font-montserrat text-[clamp(22px,4.2vw,42px)] font-bold leading-[140%] tracking-[-0.05em] text-black">
            Talk to Web Karigor About Your Software Needs
          </p>
          <button
            type="button"
            onClick={openConsultationModal}
            className="faq-cta cursor-pointer rounded-lg border border-[#000000] px-5 py-2 font-montserrat text-base font-semibold capitalize text-[#000000] md:px-6 md:py-3 md:text-lg"
          >
            Let&apos;s talk
          </button>
        </div>
      </div>
    </section>
  );
}
