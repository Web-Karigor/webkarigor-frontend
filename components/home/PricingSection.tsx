"use client";

import Image from "next/image";
import PricingCtaButton from "@/components/home/PricingCtaButton";
import { useMemo } from "react";
import { usePricingHomeQuery } from "@/hooks/queries/usePricingHomeQuery";
import { usePricingPageQuery } from "@/hooks/queries/usePricingPageQuery";
import { usePricingPostsQuery } from "@/hooks/queries/usePricingPostsQuery";
import { useServiceQuery } from "@/hooks/queries/useServiceQuery";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem } from "@/lib/home-page";
import { HOME_PRICING_LABELS } from "@/lib/home-static";
import { mapPricingPosts } from "@/lib/pricing-posts";
import { mapPackagesHeadingItem, mapPricingPlansHeader } from "@/lib/pricing-page";
import { SERVICE_PRICING_HEADINGS } from "@/lib/service-pricing-headings";
import {
  formatPackageOriginalPrice,
  formatPackagePrice,
  isCustomPackagePrice,
} from "@/lib/package-price";
import type { HomepagePackage } from "@/types/homepage-package";

const EMPTY_PRICING_LABELS = {
  popularLabel: "",
  featuresHeading: "",
  cancelLabel: "",
  noExtraFee: "",
};

const SERVICE_PRICING_POST: Record<string, string> = {
  erp: "pricing-erp",
  hrm: "pricing-hrm",
  "software-development": "pricing-software-development",
  "website-design-development": "pricing-web-design-development",
};

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

export default function PricingSection({
  backgroundColor,
  serviceSlug,
  headingSlug,
  fromPackages = false,
}: {
  backgroundColor?: string;
  serviceSlug?: string;
  headingSlug?: string;
  fromPackages?: boolean;
} = {}) {
  const isHome = !serviceSlug && !fromPackages;
  const pricingPostSlug = serviceSlug ? SERVICE_PRICING_POST[serviceSlug] ?? "" : "";
  const pricingPage = usePricingPageQuery(fromPackages);
  const homePage = useHomePageQuery(isHome);
  const plansHeader = useMemo(() => {
    const staticKey = headingSlug || (serviceSlug && !isHome ? serviceSlug : "");
    const staticHeading = staticKey ? SERVICE_PRICING_HEADINGS[staticKey] ?? null : null;
    if (fromPackages) return mapPricingPlansHeader(pricingPage.data);
    if (isHome && !headingSlug) {
      return mapPackagesHeadingItem(
        homeSectionItem(homePage.data?.data?.sections?.packages),
      );
    }
    return staticHeading;
  }, [fromPackages, isHome, serviceSlug, headingSlug, pricingPage.data, homePage.data]);
  const labels = isHome
    ? HOME_PRICING_LABELS
    : pricingPostSlug
      ? {
          ...EMPTY_PRICING_LABELS,
          popularLabel: HOME_PRICING_LABELS.popularLabel,
          featuresHeading: HOME_PRICING_LABELS.featuresHeading,
          cancelLabel: HOME_PRICING_LABELS.cancelLabel,
        }
      : EMPTY_PRICING_LABELS;
  const badgeText = plansHeader?.badge || "";
  const accentText = plansHeader?.headingAccent || "";
  const titleText = plansHeader?.headingTitle || "";
  const descriptionText = plansHeader?.description || "";
  const popularLabel = labels.popularLabel;
  const featuresHeading = labels.featuresHeading;
  const cancelLabel = labels.cancelLabel;
  const noExtraFee = labels.noExtraFee;

  const homePlans = usePricingHomeQuery(isHome);
  const pagePlans = usePricingPostsQuery("pricing", fromPackages);
  const servicePlans = usePricingPostsQuery(pricingPostSlug, Boolean(pricingPostSlug));
  const service = useServiceQuery(serviceSlug ?? "");

  const packages: HomepagePackage[] = useMemo(() => {
    if (pricingPostSlug) return mapPricingPosts(servicePlans.data?.data?.posts);
    if (serviceSlug) {
      return [...(service.data?.data.packages ?? [])].sort(
        (a, b) => (a.package_type?.id ?? a.id) - (b.package_type?.id ?? b.id),
      );
    }
    return mapPricingPosts(
      fromPackages ? pagePlans.data?.data?.posts : homePlans.data?.data?.posts,
    );
  }, [
    pricingPostSlug,
    servicePlans.data,
    serviceSlug,
    service.data,
    fromPackages,
    pagePlans.data,
    homePlans.data,
  ]);

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
            <span className="section-badge-text">{badgeText}</span>
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              {accentText}
            </span>
            <span className="section-heading-split-title">{titleText}</span>
          </h2>

          <p className="home-pricing-desc">{descriptionText}</p>
        </div>

        <div className="home-pricing-billing">
          <div className="home-pricing-tabs-row">
            {/* Monthly / Yearly toggle — hidden while API returns a single price */}
            {/* <div className="home-pricing-tabs" role="tablist" aria-label="Billing period">
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
            </div> */}
            {/* Save % badge — hidden for now
            {savePercent > 0 ? (
              <span className="home-pricing-save-badge" aria-hidden>
                Save {savePercent}%
              </span>
            ) : null}
            */}
          </div>

          <p className="home-pricing-fee-note">
            <span>{noExtraFee}</span>
            <InfoIcon />
          </p>
        </div>

        <div className="home-pricing-grid">
          {packages.map((pkg) => {
            const price = formatPackagePrice(pkg);
            const originalPrice = formatPackageOriginalPrice(pkg);
            const customPrice = isCustomPackagePrice(pkg) || !price;
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
                      <div className="home-pricing-price-stack">
                        <span className="home-pricing-price">{price}</span>
                        {originalPrice ? (
                          <span className="home-pricing-price-original">
                            {originalPrice}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <p className="home-pricing-cancel">{cancelLabel}</p>

                  <PricingCtaButton
                    packageId={pkg.id}
                    packageName={name}
                    serviceId={serviceId ?? pkg.service?.id ?? null}
                    serviceName={service.data?.data.service.title ?? null}
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
