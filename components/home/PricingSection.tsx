import React from "react";

const plans = [
  {
    price: "$2,200",
    subtitle: "Ideal for Startup Owners, MVP Builders",
    title: "Website Design",
    features: [
      "Design Style Guide",
      "Responsive across all devices",
      "Unlimited Revisions",
      "Developer Handoff",
    ],
    highlight: false,
  },
  {
    price: "$3,500",
    subtitle: "For SaaS & fast MVP launches",
    title: "Web / Mobile App Design",
    features: [
      "UX Research",
      "Design System with tokens",
      "Unlimited Revisions",
      "Developer handoff",
      "Transparent communication",
      "Responsive across all devices",
    ],
    highlight: true,
  },
  {
    price: "$2,950+",
    subtitle: "Ideal for Startup or MVP",
    title: "Monthly Subscription",
    features: [
      "Monthly dedicated designers",
      "Adhoc design support",
      "Right designer for right product",
      "Transparent communication",
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0f] via-[#0a0a0a] to-black py-24">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-emerald-400/30 px-4 py-1 text-sm text-emerald-400">
            Pricing plans
          </span>

          <h2 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
            <span className="italic text-emerald-300">Unbeatable</span> Value
            <br />
            Unmatched <span className="italic text-emerald-300">Quality</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 backdrop-blur transition
              ${
                plan.highlight
                  ? "border-purple-500 bg-gradient-to-b from-purple-700/30 to-black shadow-[0_0_60px_rgba(139,92,246,0.35)] scale-[1.03]"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {/* Price */}
              <div className="mb-4">
                <div className="text-4xl font-bold text-white">
                  {plan.price}
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  {plan.subtitle}
                </p>
              </div>

              {/* Title */}
              <h3 className="mb-6 text-lg font-semibold text-lime-400">
                {plan.title}
              </h3>

              {/* Features */}
              <ul className="mb-8 space-y-3 text-sm text-gray-300">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`group relative w-full overflow-hidden rounded-lg py-3 font-medium transition
                ${
                  plan.highlight
                    ? "bg-purple-600 text-white hover:bg-purple-500"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Explore More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
