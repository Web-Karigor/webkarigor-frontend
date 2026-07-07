import { Check } from "lucide-react";
import { PRICING_MARKETS } from "@/lib/services-data";

export default function ServicePricing() {
  return (
    <section className="service-pricing">
      <div className="service-section-wrap">
        <div className="service-section-head service-section-head--center">
          <span className="service-badge">Pricing</span>
          <h2 className="service-section-title">Pricing Plans for Your Business</h2>
          <p className="service-section-desc">
            Transparent packages for local and global markets — flexible,
            scalable, and tailored to what your product truly needs.
          </p>
        </div>

        <div className="service-pricing-markets">
          {PRICING_MARKETS.map((market) => (
            <div
              key={market.label}
              className={`service-pricing-market service-pricing-market--${market.theme}`}
            >
              <h3 className="service-pricing-market-label">{market.label}</h3>

              <div className="service-pricing-cards">
                {market.plans.map((plan) => (
                  <article key={plan.title} className="service-pricing-card">
                    <h4>{plan.title}</h4>
                    <p className="service-pricing-price">{plan.price}</p>
                    <ul className="service-pricing-features">
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <Check strokeWidth={2.5} aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="service-pricing-cta">
                      Choose Plan
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
