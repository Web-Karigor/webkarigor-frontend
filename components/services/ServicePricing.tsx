import Image from "next/image";
import Link from "next/link";
import servicesContent from "@/data/services-content.json";
import { PRICING_MARKETS } from "@/lib/services-data";

const {
  eyebrow,
  title,
  description,
  ctaLabel,
} = servicesContent.pricing;

const POPULAR_LABEL = "Most popular";
const FEATURES_HEADING = "What's Included:";
const CANCEL_LABEL = "Cancel any time";

/** Match home pricing card availability chrome (1st = green, 2nd popular = red marquee) */
const CARD_AVAIL = [
  {
    text: "3 Slots Available, Hurry!",
    tone: "green" as const,
    marquee: false,
  },
  {
    text: "2 Slots Available, Hurry!",
    tone: "red" as const,
    marquee: true,
  },
];

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

export default function ServicePricing() {
  return (
    <section className="bg-white py-[clamp(48px,7vw,80px)]">
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
          {PRICING_MARKETS.map((market) => {
            const isYellow = market.theme === "yellow";

            return (
              <div
                key={market.label}
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
                  {market.label}
                </div>

                <div className="service-pricing-cards">
                  {market.plans.map((plan, index) => {
                    const isPopular = index === 1;
                    const avail = CARD_AVAIL[index] ?? CARD_AVAIL[0];

                    return (
                      <div
                        key={`${market.label}-${plan.title}-${index}`}
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
                            <span className="home-pricing-popular-badge-text">
                              {POPULAR_LABEL}
                            </span>
                          </div>
                        ) : null}

                        <article
                          className={`home-pricing-card${isPopular ? " is-popular" : ""}`}
                        >
                          <div
                            className={`home-pricing-avail is-pill is-${avail.tone}${
                              avail.marquee ? " is-marquee" : ""
                            }`}
                          >
                            <span
                              className={`home-pricing-dot${
                                avail.tone === "red" ? " is-red" : ""
                              }`}
                              aria-hidden
                            >
                              <span className="home-pricing-dot-pulse" />
                            </span>

                            {avail.marquee ? (
                              <div
                                className="home-pricing-marquee"
                                aria-label={avail.text}
                              >
                                <div className="home-pricing-marquee-track">
                                  {Array.from({ length: 8 }).map((_, i) => (
                                    <span key={i}>{avail.text}</span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="home-pricing-avail-text">
                                {avail.text}
                              </span>
                            )}
                          </div>

                          <h3 className="home-pricing-title">{plan.title}</h3>
                          <p className="home-pricing-card-desc">{plan.subtitle}</p>

                          <div className="home-pricing-amount">
                            <span className="home-pricing-price">{plan.price}</span>
                          </div>

                          <p className="home-pricing-cancel">{CANCEL_LABEL}</p>

                          <Link
                            href="/pricing"
                            className="home-pricing-cta capitalize"
                          >
                            {ctaLabel}
                          </Link>

                          <div className="home-pricing-features">
                            <p className="home-pricing-features-title">
                              {FEATURES_HEADING}
                            </p>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
