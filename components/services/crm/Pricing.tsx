"use client";

import Image from "next/image";
import { useMemo } from "react";
import PricingCtaButton from "@/components/home/PricingCtaButton";
import { useCrmPageQuery } from "@/hooks/queries/useCrmPageQuery";
import { usePricingPostsQuery } from "@/hooks/queries/usePricingPostsQuery";
import { useServiceQuery } from "@/hooks/queries/useServiceQuery";
import { crmSectionItem, extractCrmText } from "@/lib/crm-page";
import {
  formatPackageOriginalPrice,
  formatPackagePrice,
} from "@/lib/package-price";
import crmContent from "@/data/crm-content.json";
import { mapPricingPosts } from "@/lib/pricing-posts";

const CTA_LABEL = "Get A Quote";

const POPULAR_LABEL = "Most popular";
const FEATURES_HEADING = "What's Included:";
const CANCEL_LABEL = "Cancel any time";

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

export default function Pricing() {
  const { data: pageData } = useCrmPageQuery();
  const heading = crmSectionItem(pageData?.data?.sections?.pricing);
  const eyebrow = heading?.title?.trim() || crmContent.pricing.eyebrow;
  const title = heading?.subtitle?.trim() || crmContent.pricing.title;
  const description =
    extractCrmText(heading?.content ?? "") || crmContent.pricing.description;

  const { data } = useServiceQuery("crm");
  const plansQuery = usePricingPostsQuery("pricing-crm");
  const serviceId = data?.data.service.id ?? 6;
  const plans = useMemo(
    () => mapPricingPosts(plansQuery.data?.data?.posts),
    [plansQuery.data],
  );

  if (!eyebrow || !title || !description) return null;

  return (
    <section
      id="pricing"
      className="scroll-mt-28 bg-white py-[clamp(48px,7vw,80px)]"
    >
      <div className="mx-auto w-full max-w-[1800px] px-[clamp(16px,4vw,40px)]">
        <div className="mx-auto mb-[clamp(32px,5vw,48px)] max-w-[760px] text-center">
          <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#15d286]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-montserrat text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[680px] font-montserrat text-[clamp(13px,1vw,16px)] font-medium leading-[1.5] text-[#98a2b3]">
            {description}
          </p>
        </div>

        <div className="home-pricing-grid">
          {plans.map((pkg) => {
            const isPopular = pkg.is_popular;
            const availText = pkg.availability?.trim() || "";
            const price = formatPackagePrice(pkg);
            const originalPrice = formatPackageOriginalPrice(pkg);

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
                      unoptimized
                      loading="lazy"
                    />
                    <span className="home-pricing-popular-badge-text">
                      {POPULAR_LABEL}
                    </span>
                  </div>
                ) : null}

                <article
                  className={`home-pricing-card${isPopular ? " is-popular" : ""}`}
                >
                  <div
                    className={`home-pricing-avail${
                      availText
                        ? ` is-pill is-${isPopular ? "red" : "green"}${
                            isPopular ? " is-marquee" : ""
                          }`
                        : " is-empty"
                    }`}
                  >
                    {availText ? (
                      <>
                        <span
                          className={`home-pricing-dot${
                            isPopular ? " is-red" : ""
                          }`}
                          aria-hidden
                        >
                          <span className="home-pricing-dot-pulse" />
                        </span>

                        {isPopular ? (
                          <div
                            className="home-pricing-marquee"
                            aria-label={availText}
                          >
                            <div className="home-pricing-marquee-track">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <span key={i}>{availText}</span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="home-pricing-avail-text">
                            {availText}
                          </span>
                        )}
                      </>
                    ) : null}
                  </div>

                  <h3 className="home-pricing-title">
                    {pkg.package_type?.name ?? pkg.slug}
                  </h3>
                  <p className="home-pricing-card-desc">{pkg.title}</p>

                  <div className="home-pricing-amount">
                    <div className="home-pricing-price-stack">
                      <span className="home-pricing-price">{price}</span>
                      {originalPrice ? (
                        <span className="home-pricing-price-original">
                          {originalPrice}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="home-pricing-cancel">{CANCEL_LABEL}</p>

                  <PricingCtaButton
                    packageId={pkg.id}
                    packageName={pkg.package_type?.name ?? pkg.slug}
                    serviceId={pkg.service?.id ?? serviceId}
                    serviceName={data?.data.service.title ?? null}
                  >
                    {CTA_LABEL}
                  </PricingCtaButton>

                  <div className="home-pricing-features">
                    <p className="home-pricing-features-title">
                      {FEATURES_HEADING}
                    </p>
                    <ul className="home-pricing-features-list">
                      {pkg.features.map((feature) => (
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
