"use client";

import Image from "next/image";
import servicesContent from "@/data/crm-content.json";
import PricingCtaButton from "@/components/home/PricingCtaButton";
import { useServiceQuery } from "@/hooks/queries/useServiceQuery";
import type { HomepagePackage } from "@/types/homepage-package";

const {
  eyebrow,
  title,
  description,
  ctaLabel,
} = servicesContent.pricing;

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

function formatPrice(pkg: HomepagePackage) {
  const amount = Number(pkg.monthly_price?.price);
  if (!Number.isFinite(amount) || amount <= 0) return "";
  // return `$${Math.round(amount).toLocaleString("en-US")}`;
  return `৳${Math.round(amount).toLocaleString("en-US")}`;
}

function groupByCategory(packages: HomepagePackage[]) {
  const groups = new Map<
    number,
    { id: number; name: string; slug: string; plans: HomepagePackage[] }
  >();

  for (const pkg of packages) {
    const category = pkg.package_category;
    if (!category) continue;
    const current = groups.get(category.id) ?? {
      id: category.id,
      name: category.name,
      slug: category.slug,
      plans: [],
    };
    current.plans.push(pkg);
    groups.set(category.id, current);
  }

  return [...groups.values()]
    .sort((a, b) => a.id - b.id)
    .map((group) => ({
      ...group,
      plans: [...group.plans].sort(
        (a, b) => Number(a.is_popular) - Number(b.is_popular),
      ),
    }));
}

export default function Pricing() {
  const { data } = useServiceQuery("crm");
  const serviceId = data?.data.service.id ?? 6;
  const markets = groupByCategory(data?.data.packages ?? []);

  return (
    <section id="pricing" className="scroll-mt-28 bg-white py-[clamp(48px,7vw,80px)]">
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

        <div className="service-pricing-markets">
          {markets.map((market) => {
            const isYellow = market.slug === "ecommerce";

            return (
              <div
                key={market.id}
                className={`service-pricing-market rounded-[24px] ${
                  isYellow
                    ? "border border-[#e8d48a] bg-[#fff8d9]"
                    : "border border-[#9fe8c8] bg-[#dffcf0]"
                }`}
              >
                <div
                  className={`service-pricing-market-label mx-4 mt-4 rounded-[16px] px-6 py-[14px] text-center font-montserrat text-[clamp(18px,1.4vw,22px)] font-bold text-[#111827] ${
                    isYellow ? "bg-[#feed35]" : "bg-[#38f8ab]"
                  }`}
                >
                  {market.name}
                </div>

                <div className="service-pricing-cards">
                  {market.plans.map((pkg) => {
                    const isPopular = pkg.is_popular;
                    const availText = pkg.availability || pkg.title;

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
                            <span className="home-pricing-popular-badge-text">
                              {POPULAR_LABEL}
                            </span>
                          </div>
                        ) : null}

                        <article
                          className={`home-pricing-card${isPopular ? " is-popular" : ""}`}
                        >
                          <div
                            className={`home-pricing-avail is-pill is-${
                              isPopular ? "red" : "green"
                            }${isPopular ? " is-marquee" : ""}`}
                          >
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
                          </div>

                          <h3 className="home-pricing-title">
                            {pkg.package_type?.name ?? pkg.slug}
                          </h3>
                          <p className="home-pricing-card-desc">{pkg.title}</p>

                          <div className="home-pricing-amount">
                            <span className="home-pricing-price">
                              {formatPrice(pkg)}
                            </span>
                          </div>

                          <p className="home-pricing-cancel">{CANCEL_LABEL}</p>

                          <PricingCtaButton
                            packageId={pkg.id}
                            serviceId={pkg.service?.id ?? serviceId}
                          >
                            {ctaLabel}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
