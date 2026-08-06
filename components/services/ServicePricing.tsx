import { Check } from "lucide-react";
import servicesContent from "@/data/services-content.json";
import { PRICING_MARKETS } from "@/lib/services-data";

const {
  eyebrow,
  title,
  description,
  whatYouGetLabel,
  ctaLabel,
} = servicesContent.pricing;

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

        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
          {PRICING_MARKETS.map((market) => {
            const isYellow = market.theme === "yellow";

            return (
              <div
                key={market.label}
                className={`rounded-[24px] ${
                  isYellow
                    ? "border-[#e8d48a] bg-[#fff8d9]"
                    : "border-[#9fe8c8] bg-[#dffcf0]"
                }`}
              >
                <div
                  className={`mx-4 mt-4 rounded-[16px] px-6 py-[14px] text-center font-montserrat text-[clamp(18px,1.4vw,22px)] font-bold text-[#111827] ${
                    isYellow ? "bg-[#feed35]" : "bg-[#38f8ab]"
                  }`}
                >
                  {market.label}
                </div>

                <div className="grid grid-cols-1 place-items-center gap-[30px] p-5 sm:grid-cols-2 sm:p-6">
                  {market.plans.map((plan, index) => (
                    <article
                      key={`${market.label}-${plan.title}-${index}`}
                      className="box-border flex w-full max-w-[400px] flex-col rounded-[20px] border border-[#0EC47B] bg-[#FFFEFB] p-[clamp(20px,4vw,24px)_clamp(14px,3vw,16px)] lg:min-h-[697px]"
                    >
                      <h3 className="m-0 font-montserrat text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827] sm:text-[32px]">
                        {plan.title}
                      </h3>
                      <p className="mt-3 m-0 font-montserrat text-[52px] font-bold leading-none text-[#0EC47B] sm:mt-4 sm:text-[56px]">
                        {plan.price}
                      </p>
                      <p className="mt-3 m-0 max-w-[300px] font-montserrat text-[15px] font-semibold leading-[1.45] text-[#111827] sm:mt-4 sm:text-[16px]">
                        {plan.subtitle}
                      </p>

                      <hr className="mx-0 mb-5 mt-6 w-full border-0 border-t border-[#E5E7EB]" />

                      <div className="flex w-full flex-1 flex-col">
                        <p className="m-0 font-montserrat text-[16px] font-bold text-[#111827]">
                          {whatYouGetLabel}
                        </p>
                        <ul className="mt-4 flex list-none flex-col gap-3.5 p-0">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5 font-montserrat text-[14px] font-medium leading-[1.5] text-[#6b7280] sm:text-[15px]"
                            >
                              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-[#0EC47B]">
                                <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        className="mt-auto w-full rounded-full bg-[#0EC47B] px-5 py-3.5 font-montserrat text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                      >
                        {ctaLabel}
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
