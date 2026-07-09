import { ArrowRight } from "lucide-react";

const plans = [
  {
    price: "$3,500",
    subtitle: "MVP Product Design & Development",
    title: "Launch Ready",
    features: [
      "UX/UI design for a single product or core feature",
      "Web or mobile app development",
      "Clean, scalable, and maintainable code",
      "Essential user flows and usability focus",
      "Basic testing and quality checks",
      "Deployment-ready build with source files",
      "Clear delivery timeline and milestone tracking",
    ],
    highlight: false,
  },
  {
    price: "$5,000",
    subtitle: "Full Product Design with Research & Development",
    title: "Build & Validate",
    features: [
      "User research and product discovery sessions",
      "End-to-end UX/UI design for the full product",
      "Design system for consistency and scale",
      "Web or mobile app development",
      "Usability testing and design iteration",
      "Performance and security best practices",
      "Post-launch support and proper handover",
    ],
    highlight: true,
  },
  {
    price: "$7,000",
    subtitle: "Advanced Product Design & Development",
    title: "Scale & Optimize",
    features: [
      "User research, audit, and competitor analysis",
      "Strategic roadmap and feature prioritization",
      "UX/UI design with system-level thinking",
      "Full development with scalable architecture",
      "Dedicated design and engineering team",
      "Continuous monitoring and optimization",
      "Priority support, maintenance",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="pricing-section bg-[#FFFDF6]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">

        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block rounded-full border border-[#38F8AB] px-4 sm:px-5 py-2 text-sm font-medium text-[#15D286]">
            Pricing Plans
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              Fair Pricing for
            </span>
            <span className="section-heading-split-title">
              Your Product
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 px-2">
            Our packages are designed to fit your product’s stage and ambition.
            Flexible, transparent, and customizable based on what your business truly needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3 lg:gap-16 pt-8 sm:pt-12 lg:pt-16">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative p-[2px] transition-all duration-300
              ${plan.highlight ? "pricing-card-highlight" : ""}`}
              style={{
                background:
                  "linear-gradient(135deg, #0EC47B, #2EEDA0, #FEF33F, #15D286)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(46, 237, 160, 0.35)"
                  : "none",
              }}
            >
              <div className="pricing-card-inner h-full bg-[#FFFDF6]">

                {plan.highlight && (
                  <div className="absolute top-3 left-1/2 w-[90%] text-center -translate-x-1/2 rounded-[12px] sm:rounded-[16px] bg-[#38F8AB] px-4 sm:px-8 py-1 text-base sm:text-xl font-semibold text-[#07422A] shadow-md">
                    Popular
                  </div>
                )}

                <h3 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold font-monserrat text-[#111] mb-4 sm:mb-6 mt-6 sm:mt-8">
                  {plan.title}
                </h3>

                <div className="text-3xl sm:text-4xl font-bold text-[#15D286] mb-2">
                  {plan.price}
                </div>

                <p className="text-[#000000] text-base sm:text-lg lg:text-[20px] font-semibold mb-6 sm:mb-8 mt-3 sm:mt-4 font-monserrat">
                  {plan.subtitle}
                </p>

                <hr className="mb-6 border-gray-200" />

                {/* Features */}
                <div className="mb-10">
                  <p className="font-semibold text-[#111] mb-4">
                    What you get:
                  </p>

                  <ul className="space-y-3 text-sm text-gray-700">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[#15D286]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  className="flex w-full items-center justify-center gap-[10px] rounded-[16px] sm:rounded-[20px] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-[#07422A] transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(to right, #38F8AB, #FEED35)",
                  }}
                >
                  Book a Call
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
