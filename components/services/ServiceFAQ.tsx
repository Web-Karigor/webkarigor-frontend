"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICE_FAQS } from "@/lib/services-data";

export default function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="service-faq">
      <div className="service-section-wrap">
        <div className="service-section-head service-section-head--center">
          <span className="service-badge">FAQ</span>
          <h2 className="service-section-title">Frequently Asked Questions</h2>
        </div>

        <div className="service-faq-list">
          {SERVICE_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="service-faq-item">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="service-faq-trigger"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="service-faq-icon" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="service-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="service-faq-cta">
          <p>Still have questions? We&apos;re happy to help.</p>
          <Link href="/contact-us" className="service-faq-link">
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </section>
  );
}
