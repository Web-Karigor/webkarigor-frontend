"use client";

import Image from "next/image";
import { useState } from "react";
import homeContent from "@/data/home-content.json";

const {
  badge,
  headingAccent,
  headingTitle,
  description,
  popularLabel,
  featuresHeading,
  cancelLabel,
  noExtraFee,
  billing,
  plans,
} = homeContent.pricing;

type Billing = "monthly" | "quarterly";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="13"
      viewBox="0 0 17 13"
      fill="none"
      className="home-pricing-check"
      aria-hidden
    >
      <path
        d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CustomPriceIcon() {
  return (
    <svg
      width="56"
      height="40"
      viewBox="0 0 56 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="home-pricing-custom-icon"
    >
      <rect x="2" y="14" width="12" height="24" rx="6" stroke="#111" strokeWidth="2" />
      <rect x="22" y="2" width="12" height="36" rx="6" stroke="#111" strokeWidth="2" />
      <circle cx="28" cy="10" r="3.5" fill="#16c784" />
      <rect x="42" y="10" width="12" height="28" rx="6" stroke="#111" strokeWidth="2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 6.2V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="4.2" r="0.7" fill="currentColor" />
    </svg>
  );
}

export default function PricingSection() {
  const [period, setPeriod] = useState<Billing>("quarterly");

  return (
    <section className="home-pricing-section">
      <div className="home-pricing-shell">
        <div className="home-pricing-header">
          <span className="home-pricing-badge">
            <span className="section-badge-text">{badge}</span>
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              {headingAccent}
            </span>
            <span className="section-heading-split-title">{headingTitle}</span>
          </h2>

          <p className="home-pricing-desc">{description}</p>
        </div>

        <div className="home-pricing-tabs-wrap">
          <div className="home-pricing-tabs" role="tablist" aria-label="Billing period">
            <button
              type="button"
              role="tab"
              aria-selected={period === "monthly"}
              className={`home-pricing-tab${period === "monthly" ? " is-active" : ""}`}
              onClick={() => setPeriod("monthly")}
            >
              {billing.monthly}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={period === "quarterly"}
              className={`home-pricing-tab${period === "quarterly" ? " is-active" : ""}`}
              onClick={() => setPeriod("quarterly")}
            >
              {billing.quarterly}
            </button>
          </div>
          {billing.saveBadge ? (
            <span className="home-pricing-save-badge" aria-hidden>
              {billing.saveBadge}
            </span>
          ) : null}
        </div>

        <p className="home-pricing-fee-note">
          <span>{noExtraFee}</span>
          <InfoIcon />
        </p>

        <div className="home-pricing-grid">
          {plans.map((plan) => {
            const price = plan.price[period];
            const isPopular = plan.highlight;

            return (
              <div
                key={plan.id}
                className={`home-pricing-plan${isPopular ? " is-popular" : ""}`}
              >
                {isPopular ? (
                  <div className="home-pricing-popular-badge">
                    <Image
                      src="/pricing/popular-tab.png"
                      alt=""
                      width={174}
                      height={34}
                      className="home-pricing-popular-badge-img"
                      unoptimized
                    />
                    <span className="home-pricing-popular-badge-text">{popularLabel}</span>
                  </div>
                ) : null}

                <article
                  className={`home-pricing-card${isPopular ? " is-popular" : ""}`}
                >
                <div
                  className={`home-pricing-avail is-pill is-${plan.availabilityTone}${
                    plan.availabilityMarquee ? " is-marquee" : ""
                  }`}
                >
                  <span
                    className={`home-pricing-dot${
                      plan.availabilityTone === "red" ? " is-red" : ""
                    }`}
                    aria-hidden
                  >
                    <span className="home-pricing-dot-pulse" />
                  </span>

                  {plan.availabilityMarquee ? (
                    <div className="home-pricing-marquee" aria-label={plan.availability}>
                      <div className="home-pricing-marquee-track">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <span key={i}>{plan.availability}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="home-pricing-avail-text">{plan.availability}</span>
                  )}
                </div>

                <h3 className="home-pricing-title">{plan.title}</h3>
                <p className="home-pricing-card-desc">{plan.description}</p>

                <div className="home-pricing-amount">
                  {plan.customPrice ? (
                    <CustomPriceIcon />
                  ) : (
                    <>
                      <span className="home-pricing-price">{price}</span>
                      <span className="home-pricing-duration">/month</span>
                    </>
                  )}
                </div>

                <p className="home-pricing-cancel">{cancelLabel}</p>

                <a href="#book-a-call" className="home-pricing-cta">
                  {plan.cta}
                </a>

                <div className="home-pricing-features">
                  <p className="home-pricing-features-title">{featuresHeading}</p>
                  <ul className="home-pricing-features-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
