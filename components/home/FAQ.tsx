"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "Who do you work with and what projects do you take on?",
    answer:
      "We partner with startups, established companies, and agencies of all sizes. Our team takes on digital product design and development projects that are mission-driven and innovative.",
  },
  {
    question: "How do you take a product from idea to launch?",
    answer:
      "We start with understanding your vision, users, and markets. We ideate, wireframe, prototype, design, and develop iteratively, collaborating closely with you through each phase and ensuring each milestone is met before launch.",
  },
  {
    question: "How do you approach UX, design, and technology decisions?",
    answer:
      "All decisions are driven by your business goals, user needs, and best-in-class modern technology. We combine research-driven UX, elegant UI, and practical engineering for scalable solutions.",
  },
  {
    question: "How involved will we be during the project?",
    answer:
      "You stay as involved as you want throughout the project. We encourage your feedback in each phase, use frequent check-ins, and provide clear, collaborative communication. You’re never left in the dark.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes! We offer continuous maintenance, support, and opportunities for evolution and improvement after your product launches. We’re your partner for the long run.",
  },
  {
    question: "How do pricing and timelines work?",
    answer:
      "We offer flexible pricing models (fixed, retainer, or hourly) depending on project needs. Timelines are validated during our initial call and adjusted collaboratively. Transparency is key.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#FFFDF6] pb-8 md:pb-12">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 md:px-6 py-2 bg-transparent mb-2">
            <span className="text-[#39B770] font-medium text-[22px] md:text-[25px] italic">Questions</span>
            <span className="ml-1 font-black text-[#222] text-[22px] md:text-[25px] not-italic">Answered?</span>
          </div>
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
                <span className="block min-w-0 flex-1 pr-3 text-base md:text-[17px] font-medium text-[#141414]">
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
                  <p className="text-base md:text-[17px] text-[#444] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg md:text-xl text-[#1F1E1C] mb-6">
            Still curious? We&#39;re happy to help
          </p>
          <Link
            href="/contact-us"
            className="px-5 md:px-6 py-2 md:py-3 border border-[#000000] text-[#000000] font-semibold text-base md:text-lg rounded-lg transition-colors"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </section>
  );
}
