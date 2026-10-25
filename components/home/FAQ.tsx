"use client";

import "./FAQ.css";

import { useMemo, useState } from "react";
import { openConsultationModal } from "@/components/home/ConsultationModal";
import { useFaqHomeQuery } from "@/hooks/queries/useFaqHomeQuery";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem, splitTrailingWords } from "@/lib/home-page";

export default function FAQ({
  className = "bg-[#FFFDF6]",
}: {
  className?: string;
  ctaHref?: string;
}) {
  const { data: homeData } = useHomePageQuery();
  const { data } = useFaqHomeQuery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heading = homeSectionItem(homeData?.data?.sections?.faq);

  const badge = heading?.title?.trim() ?? "";
  const { head: headingAccent, tail: headingTitle } = useMemo(
    () => splitTrailingWords(heading?.subtitle ?? "", 1),
    [heading?.subtitle],
  );
  const ctaText = heading?.cta_title?.trim() ?? "";
  const ctaLabel = heading?.cta_button_text?.trim() ?? "";

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

  if (!faqs.length || !heading) return null;

  const showHeader = Boolean(badge || headingAccent || headingTitle);
  const showCta = Boolean(ctaText || ctaLabel);

  return (
    <section
      id="faq"
      className={`relative scroll-mt-24 px-4 py-16 pb-8 font-montserrat md:px-6 md:py-24 md:pb-12 ${className}`}
    >
      <div className="mx-auto max-w-[1320px]">
        {showHeader ? (
          <div className="faq-section-header mb-12 text-center md:mb-16">
            {badge ? (
              <span className="faq-section-badge">
                <span className="faq-badge-text">{badge}</span>
              </span>
            ) : null}

            {headingAccent || headingTitle ? (
              <h2 className="section-heading">
                {headingAccent ? (
                  <span className="section-heading-split-accent faq-gradient-text faq-accent-text">
                    {headingAccent}
                  </span>
                ) : null}
                {headingTitle ? (
                  <span className="section-heading-split-title">
                    {headingTitle}
                  </span>
                ) : null}
              </h2>
            ) : null}
          </div>
        ) : null}

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

        {showCta ? (
          <div className="text-center">
            {ctaText ? (
              <p className="faq-cta-heading mx-auto mb-6 max-w-[669px] font-montserrat text-[clamp(22px,4.2vw,42px)] font-bold leading-[140%] tracking-[-0.05em] text-black">
                {ctaText}
              </p>
            ) : null}
            {ctaLabel ? (
              <button
                type="button"
                onClick={openConsultationModal}
                data-gtm-cta="true"
                data-cta-id="home-faq-consultation"
                data-cta-location="home_faq"
                className="faq-cta cursor-pointer rounded-lg border border-[#000000] px-5 py-2 font-montserrat text-base font-semibold capitalize text-[#000000] md:px-6 md:py-3 md:text-lg"
              >
                {ctaLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
