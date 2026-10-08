"use client";

import Image from "next/image";
import { useState } from "react";
import homeContent from "@/data/home-content.json";
import PricingCtaButton from "@/components/home/PricingCtaButton";
import { useHomepagePackagesQuery } from "@/hooks/queries/useHomepagePackagesQuery";
import { usePackagesQuery } from "@/hooks/queries/usePackagesQuery";
import { useServiceQuery } from "@/hooks/queries/useServiceQuery";
import type { HomepagePackage } from "@/types/homepage-package";

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
} = homeContent.pricing;

type Billing = "monthly" | "yearly";

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

function pickAmount(price?: string, discount?: string) {
  const discounted = Number(discount);
  const base = Number(price);
  if (discounted > 0) return discounted;
  return Number.isFinite(base) ? base : 0;
}

function formatPrice(pkg: HomepagePackage, period: Billing) {
  const block = period === "monthly" ? pkg.monthly_price : pkg.yearly_price;
  const amount = pickAmount(block?.price, block?.discount_price);
  if (amount <= 0) return "";
  // return `$${Math.round(amount).toLocaleString("en-US")}`;
  return `৳${Math.round(amount).toLocaleString("en-US")}`;
}

function isCustomPrice(pkg: HomepagePackage) {
  return (
    pickAmount(pkg.monthly_price?.price, pkg.monthly_price?.discount_price) <= 0 &&
    pickAmount(pkg.yearly_price?.price, pkg.yearly_price?.discount_price) <= 0
  );
}

export default function PricingSection({
  backgroundColor,
  serviceSlug,
  fromPackages = false,
}: {
  backgroundColor?: string;
  serviceSlug?: string;
  fromPackages?: boolean;
} = {}) {
  const [period, setPeriod] = useState<Billing>("yearly");
  const home = useHomepagePackagesQuery(!serviceSlug && !fromPackages);
  const service = useServiceQuery(serviceSlug ?? "");
  const all = usePackagesQuery(fromPackages || (!serviceSlug && !fromPackages));

  const servicePackages = service.data?.data.packages ?? [];
  const homePackages = (home.data?.data ?? []).filter((pkg) => pkg.show_homepage);
  const allPackages = all.data?.data ?? [];
  const packages: HomepagePackage[] = [
    ...(servicePackages.length
      ? servicePackages
      : fromPackages
        ? allPackages
        : homePackages.length
          ? homePackages
          : allPackages),
  ].sort(
    (a, b) => (a.package_type?.id ?? a.id) - (b.package_type?.id ?? b.id),
  );

  const serviceId = service.data?.data.service.id ?? null;

  return (
    <section
      id="pricing"
      className="home-pricing-section scroll-mt-28"
      style={backgroundColor ? { background: backgroundColor } : undefined}
    >
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

        <div className="home-pricing-billing">
          <div className="home-pricing-tabs-row">
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
                aria-selected={period === "yearly"}
                className={`home-pricing-tab${period === "yearly" ? " is-active" : ""}`}
                onClick={() => setPeriod("yearly")}
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
        </div>

        <div className="home-pricing-grid">
          {packages.map((pkg) => {
            const price = formatPrice(pkg, period);
            const customPrice = isCustomPrice(pkg) || !price;
            const availText = pkg.availability?.trim() || "";
            const desc = pkg.title;
            const isPopular = pkg.is_popular;
            const isHurry = /hurry|slots/i.test(availText);
            const tone = isPopular ? "red" : isHurry ? "green" : "gray";
            const name = pkg.package_type?.name ?? pkg.slug;

            return (
              <div
                key={pkg.id}
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
                      unoptimized loading="lazy"/>
                    <span className="home-pricing-popular-badge-text">{popularLabel}</span>
                  </div>
                ) : null}

                <article
                  className={`home-pricing-card${isPopular ? " is-popular" : ""}`}
                >
                  {availText ? (
                    <div
                      className={`home-pricing-avail is-pill is-${tone}${
                        isPopular ? " is-marquee" : ""
                      }`}
                    >
                      <span
                        className={`home-pricing-dot${tone === "red" ? " is-red" : ""}`}
                        aria-hidden
                      >
                        <span className="home-pricing-dot-pulse" />
                      </span>

                      {isPopular ? (
                        <div className="home-pricing-marquee" aria-label={availText}>
                          <div className="home-pricing-marquee-track">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <span key={i}>{availText}</span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="home-pricing-avail-text">{availText}</span>
                      )}
                    </div>
                  ) : (
                    <div className="home-pricing-avail is-empty" aria-hidden />
                  )}

                  <h3 className="home-pricing-title">{name}</h3>
                  <p className="home-pricing-card-desc">{desc}</p>

                  <div className="home-pricing-amount">
                    {customPrice ? (
                      <CustomPriceIcon />
                    ) : (
                      <>
                        <span className="home-pricing-price">{price}</span>
                        <span className="home-pricing-duration">
                          {period === "yearly" ? "/year" : "/month"}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="home-pricing-cancel">{cancelLabel}</p>

                  <PricingCtaButton
                    packageId={pkg.id}
                    serviceId={serviceId ?? pkg.service?.id ?? null}
                  >
                    {customPrice ? "Contact Us" : "Book Now"}
                  </PricingCtaButton>

                  <div className="home-pricing-features">
                    <p className="home-pricing-features-title">{featuresHeading}</p>
                    <ul className="home-pricing-features-list">
                      {(pkg.features ?? []).map((feature, index) => (
                        <li key={`${pkg.id}-${index}`}>
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
