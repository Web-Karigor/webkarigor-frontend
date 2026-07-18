/**
 * Pricing Page — Figma node 2546-10751 (1920 × 10024)
 */
export const PR = {
  frame: 1920,
  content: 1320,
  sectionY: 100,
  radius: 24,
  radiusLg: 32,
  green: "#0EC47B",
  lime: "#38F8AB",
  yellow: "#FEED35",
  cream: "#FFFDF6",
  black: "#0A0A0A",
  muted: "#6B7280",
} as const;

export const PRICING_HERO_FEATURES = [
  {
    title: "Full-stack development",
    description:
      "Design, frontend, and backend delivered as one cohesive product team.",
    icon: "stack",
  },
  {
    title: "Dedicated Project Manager",
    description:
      "A single point of contact who keeps scope, timeline, and quality aligned.",
    icon: "user",
  },
  {
    title: "No long-term contracts",
    description:
      "Pause or cancel anytime — scale up when you need, scale down when you don’t.",
    icon: "shield",
  },
  {
    title: "Scalable resources",
    description:
      "Add design or engineering capacity as your product and roadmap grow.",
    icon: "scale",
  },
] as const;

export type PricingBilling = "monthly" | "yearly";

export type PricingPlan = {
  id: string;
  name: string;
  subtitle: string;
  monthly: number;
  popular?: boolean;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "seed",
    name: "Seed",
    subtitle: "Best for start-up products",
    monthly: 2500,
    features: [
      "1 active request at a time",
      "Unlimited revisions",
      "Standard UI/UX design",
      "Trello board access",
      "Pause or cancel anytime",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Best for scaling products",
    monthly: 5000,
    popular: true,
    features: [
      "2 active requests at a time",
      "Unlimited revisions",
      "Standard UI/UX design",
      "Trello & Slack access",
      "Pause or cancel anytime",
      "Daily progress updates",
    ],
  },
  {
    id: "expert",
    name: "Expert",
    subtitle: "Best for large scale products",
    monthly: 7000,
    features: [
      "3 active requests at a time",
      "Unlimited revisions",
      "Premium UI/UX design",
      "Trello, Slack & video calls",
      "Pause or cancel anytime",
      "Priority support",
    ],
  },
];

export function planPrice(plan: PricingPlan, billing: PricingBilling): number {
  if (billing === "yearly") return Math.round(plan.monthly * 0.8);
  return plan.monthly;
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Figma: 4 columns under Complete Package */
export const PACKAGE_COLUMNS = [
  [
    "UI/UX Design",
    "Product Strategy",
    "UX Research",
    "Wireframing",
    "Interactive Prototypes",
    "Website Design",
    "Landing Page Design",
    "UI Audit",
  ],
  [
    "Back-end Development",
    "Full-stack Development",
    "API Development & Integration",
    "React Development",
    "Next.js Development",
    "Laravel Development",
    "Node.js Development",
    "WordPress Development",
  ],
  [
    "Brand Identity Design",
    "Logo Design",
    "Motion Graphics",
    "UI Animation",
    "Prototype",
    "Illustration Design",
    "Pitch Deck Design",
    "Marketing Creatives",
  ],
  [
    "Mobile App Development",
    "SaaS Product Design",
    "Front-end Development",
    "Dashboard Design",
    "Webflow Development",
    "Ongoing Maintenance & Support",
    "Mobile App Design",
  ],
] as const;

/** Figma: Webkarigor vs Other Agencies */
export const COMPARISON_ITEMS = [
  "Discovery and research before design",
  "Interactive prototypes for every flow",
  "Dedicated project manager",
  "Unlimited revisions within active requests",
  "Direct Slack communication",
  "Fixed monthly price — no surprises",
  "Pause or cancel anytime",
  "Source files & code ownership",
] as const;

export const PRICING_FAQS = [
  {
    question: "What's included in my plan?",
    answer:
      "Each plan includes design and development capacity, unlimited revisions within your active request slots, project management, and communication via Trello (and Slack on higher tiers).",
  },
  {
    question: "How do I pay?",
    answer:
      "We bill monthly by invoice. Yearly billing locks in a discounted monthly rate. Payment is due at the start of each billing cycle via bank transfer or card.",
  },
  {
    question: "Can I pause or cancel anytime?",
    answer:
      "Yes. There are no long-term contracts. You can pause or cancel at the end of your current billing period — no penalties.",
  },
  {
    question: "How fast will my requests be completed?",
    answer:
      "Most requests move within a few business days depending on complexity and your plan’s active request slots. Growth and Expert plans get faster turnaround and priority support.",
  },
  {
    question: "Do you offer custom pricing?",
    answer:
      "Absolutely. If your roadmap needs a dedicated squad, advisory retainers, or a one-off build, we’ll tailor a quote after a short discovery call.",
  },
  {
    question: "Who owns the work?",
    answer:
      "You do. All source files, code, and design assets are yours once delivered — we retain no ownership claim on your product IP.",
  },
] as const;

export const FEATURED_WORK = [
  { src: "/sm1.png", alt: "Mobile product screens", tall: true },
  { src: "/ecommerce/hero-phone.png", alt: "Ecommerce phone mockup", tall: false },
  { src: "/services/why-choose-main.jpg", alt: "Product dashboard", tall: true },
  { src: "/sm3.jpg", alt: "App interface collage", tall: false },
  { src: "/sm4.png", alt: "Fashion commerce UI", tall: true },
  { src: "/ecommerce/hero-composite.png", alt: "Multi-device product shots", tall: false },
] as const;
