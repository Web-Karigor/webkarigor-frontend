"use client";

import Link from "next/link";
import { useState } from "react";
import { ERP_FAQS } from "@/lib/erp-data";

export default function ErpFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      <div className="mx-auto flex w-full max-w-[1245px] flex-col gap-12 px-[clamp(16px,4vw,40px)] py-12">
        <div className="text-center">
          <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#15d286]">
            FAQ
          </p>
          <h2 className="mt-3 font-montserrat text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="w-full">
          {ERP_FAQS.map((faq, index) => {
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
                    <span
                      className={`absolute h-0.5 w-3.5 rounded-full bg-current transition-transform ${
                        isOpen ? "rotate-0" : ""
                      }`}
                    />
                    <span
                      className={`absolute h-3.5 w-0.5 rounded-full bg-current transition-transform ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <p className="m-0 pb-6 font-montserrat text-[15px] font-medium leading-[1.65] text-[#667085]">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="m-0 text-center font-montserrat text-[15px] font-medium text-[#667085]">
          Still curious? We&apos;re happy to help —{" "}
          <Link
            href="#contact"
            className="font-semibold text-[#0ec47b] underline-offset-2 hover:underline"
          >
            Contact Us
          </Link>
        </p>
      </div>
    </section>
  );
}
