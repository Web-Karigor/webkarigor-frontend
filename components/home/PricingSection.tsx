import React from "react";

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

const PricingSection = () => {
  return (
    <section className="bg-[#FFFDF6] py-24">
      <div className="mx-auto max-w-[1600px] px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
            Pricing Plans
          </span>

          <h2 className="mt-8 text-[56px] font-bold leading-tight text-[#111]">
            <span className="italic text-[#15D286]">Fair Pricing</span> for Your Product
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600">
            Our packages are designed to fit your product’s stage and ambition.
            Flexible, transparent, and customizable based on what your business truly needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-16 md:grid-cols-3 pt-16">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-[40px] p-[2px] transition-all duration-300
              ${plan.highlight ? "scale-[1.15]" : ""}`}
              style={{
                background:
                  "linear-gradient(135deg, #0EC47B, #2EEDA0, #FEF33F, #15D286)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(46, 237, 160, 0.35)"
                  : "none",
              }}
            >
              {/* Inner Card */}
              <div className="h-full rounded-[38px] bg-[#FFFDF6] p-8">

                {/* Popular Badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#FEED35] px-8 py-2 text-sm font-semibold text-black shadow-md">
                    Popular
                  </div>
                )}

                {/* Title */}
                <h3 className="text-4xl text-center font-semibold font-monserrat text-[#111] mb-6">
                  {plan.title}
                </h3>

                {/* Price */}
                <div className="text-4xl font-bold text-[#15D286] mb-2">
                  {plan.price}
                </div>

                <p className="text-[#000000] text-[20px] font-semibold mb-8 mt-4 font-monserrat"> 
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
                  className={`w-full rounded-[20px] font-semibold text-black transition hover:opacity-90
                  ${plan.highlight ? "py-4" : "py-4"}`}
                  style={{
                    background:
                      "linear-gradient(135deg, #38F8AB, #FEED35)",
                  }}
                >
                  Explore This Package
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
