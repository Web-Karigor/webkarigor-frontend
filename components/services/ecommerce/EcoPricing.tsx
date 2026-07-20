import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ECO_PRICING_PLANS } from "@/lib/ecommerce-data";

const PRICE_COLORS = {
  dark: "text-[#1f1e1c]",
  green: "text-[#0EC47B]",
  blue: "text-[#2563EB]",
} as const;

export default function EcoPricing() {
  return (
    <section className="bg-[#F7F8FA] py-[clamp(48px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[1100px] px-[clamp(16px,4vw,40px)]">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="m-0 font-montserrat text-[clamp(14px,1.2vw,18px)] font-semibold leading-none text-[#0EC47B]">
            Pricing Plane
          </p>
          <h2 className="mt-3 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#1f1e1c]">
            Fair Pricing for Your Product
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] font-montserrat text-[clamp(13px,1vw,16px)] font-medium leading-[1.55] text-[#98A2B3]">
            Our packages are designed to fit your product&apos;s stage and ambition.
            Flexible, transparent, and customizable based on what your business
            truly needs.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 md:flex-row md:items-center md:gap-6 lg:gap-8">
          {ECO_PRICING_PLANS.map((plan) => {
            const recommended = plan.recommended;

            return (
              <article
                key={plan.name}
                className={`relative flex w-full max-w-[320px] flex-col overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:w-[min(320px,30vw)] lg:w-[320px] ${
                  recommended
                    ? "z-[1] md:min-h-[551px] md:shadow-[0_16px_48px_rgba(15,23,42,0.1)] lg:min-h-[591px]"
                    : "md:min-h-[500px] lg:min-h-[551px]"
                }`}
              >
                {recommended && (
                  <div className="shrink-0 bg-[#0EC47B] px-4 py-2.5 text-center font-montserrat text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                    Recommended
                  </div>
                )}

                <div className="flex min-h-0 flex-1 flex-col px-7 pb-7 pt-8">
                  <p
                    className={`m-0 font-montserrat text-[48px] font-bold leading-none ${PRICE_COLORS[plan.priceColor]}`}
                  >
                    {plan.price}
                    <span className="ml-1.5 align-middle text-[14px] font-medium text-[#98A2B3]">
                      {plan.period}
                    </span>
                  </p>

                  <h3 className="mt-5 m-0 font-montserrat text-[22px] font-bold leading-none text-[#1f1e1c]">
                    {plan.name}
                  </h3>
                  <p className="mt-3 m-0 font-montserrat text-[14px] font-medium leading-[1.5] text-[#98A2B3]">
                    {plan.description}
                  </p>

                  <hr className="my-6 w-full shrink-0 border-0 border-t border-[#E5E7EB]" />

                  <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 font-montserrat text-[14px] font-medium leading-[1.4] text-[#475467]"
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0EC47B]/15 text-[#0EC47B]">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      href="#contact"
                      className={`inline-flex w-full items-center justify-between rounded-[10px] px-5 py-3.5 font-montserrat text-[14px] font-bold transition-opacity hover:opacity-90 ${
                        recommended
                          ? "bg-[#0EC47B] text-white"
                          : "border border-[#2563EB] bg-white text-[#2563EB]"
                      }`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
