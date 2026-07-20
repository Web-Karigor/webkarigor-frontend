/**
 * Pricing Page — Figma node 2546-10751 (1920 × 10024)
 */
export const PR = {
  frame: 1920,
  content: 1320,
  /** Hero feature row: 4 × 370 + gaps */
  heroContent: 1540,
  sectionY: 100,
  radius: 24,
  radiusLg: 32,
  green: "#0EC47B",
  lime: "#38F8AB",
  yellow: "#FEED35",
  cream: "#F8F6EF",
  black: "#0A0A0A",
  muted: "#6B7280",
  /** Shared brand gradient — borders / price / CTA */
  gradient:
    "linear-gradient(135deg, #0EC47B 0%, #2EEDA0 35%, #FFEF3F 70%, #15D286 100%)",
  gradientBtn: "linear-gradient(90deg, #38F8AB 0%, #FEED35 100%)",
  gradientText:
    "linear-gradient(90deg, #0EC47B 0%, #2EEDA0 40%, #FFEF3F 100%)",
  planCard: {
    radius: 32,
    pad: 32,
    gap: 24,
    titleSize: 32,
    priceSize: 48,
    bodySize: 16,
    featureSize: 14,
  },
  heroCard: {
    w: 370,
    h: 329,
    radius: 20,
    gap: 20,
    pad: 32,
    /** #FFFFFF @ 24% */
    bg: "rgba(255, 255, 255, 0.24)",
    /** Drop shadow: 1 / 3 / 24 / 0 — #000 @ 4% */
    shadow: "1px 3px 24px 0 rgba(0, 0, 0, 0.04)",
  },
  heroTitle: {
    /** Figma: MuseoModerno Medium Italic 48 / 140% / -5% — gradient fill, no underline */
    eyebrowW: 438,
    eyebrowH: 67,
    eyebrowSize: 48,
    eyebrowLeading: 1.4,
    eyebrowTracking: "-0.05em",
    eyebrowGradient:
      "linear-gradient(90deg, #0EC47B 0%, #2EEDA0 33%, #FFEF3F 66%, #15D286 100%)",
    /** Figma H1 — Montserrat Bold */
    titleSize: 48,
    titleLeading: 1.3,
    titleTracking: "-0.03em",
    titleGap: 16,
    titleMax: 820,
  },
  /** Figma Ellipse 1570 — 199×199, blur 240, gradient #AEFFDF → #FFF68F */
  heroGlows: [
    { left: 444, top: 692 },
    { left: 861, top: 609 },
    { left: 1271, top: 692 },
  ],
} as const;

export const PRICING_HERO_FEATURES = [
  {
    title: "Clickable Design Prototype",
    description:
      "Visualize and test your product experience before development.",
    icon: "pointer",
  },
  {
    title: "Developer-Ready Files",
    description:
      "Organized assets and specifications for a smoother build process.",
    icon: "code",
  },
  {
    title: "Efficient Project Management",
    description:
      "A clear workflow helps keep projects aligned and moving forward.",
    icon: "calendar",
  },
  {
    title: "Ongoing Design Guidance",
    description:
      "Receive expert guidance to support informed product decisions.",
    icon: "compass",
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
    id: "launch",
    name: "Launch Ready",
    subtitle: "MVP Product Design & Development",
    monthly: 3500,
    features: [
      "UX/UI design for a single product or core feature",
      "Web or mobile app development",
      "Clean, scalable, and maintainable code",
      "Essential user flows and usability focus",
      "Basic testing and quality checks",
      "Deployment-ready build with source files",
      "Clear delivery timeline and milestone tracking",
    ],
  },
  {
    id: "build",
    name: "Build & Validate",
    subtitle: "Full Product Design with Research & Development",
    monthly: 5000,
    popular: true,
    features: [
      "User research and product discovery sessions",
      "End-to-end UX/UI design for the full product",
      "Design system for consistency and scale",
      "Web or mobile app development",
      "Usability testing and design iteration",
      "Performance and security best practices",
      "Post-launch support and proper handover",
    ],
  },
  {
    id: "scale",
    name: "Scale & Optimize",
    subtitle: "Advanced Product Design & Development",
    monthly: 7000,
    features: [
      "User research, audit, and competitor analysis",
      "Strategic roadmap and feature prioritization",
      "UX/UI design with system-level thinking",
      "Full development with scalable architecture",
      "Dedicated design and engineering team",
      "Continuous monitoring and optimization",
      "Priority support, maintenance",
    ],
  },
];

/** Figma: Save 25% on yearly */
export function planPrice(plan: PricingPlan, billing: PricingBilling): number {
  if (billing === "yearly") return Math.round(plan.monthly * 0.75);
  return plan.monthly;
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Figma Frame — Complete Package 1520 × 696, 4 columns */
export const PACKAGE_COLUMNS = [
  [
    "UI/UX Design",
    "Product Strategy",
    "UX Research",
    "Wireframing",
    "Interactive Prototyping",
    "Website Design",
    "Landing Page Design",
    "UX Audit",
  ],
  [
    "Back-end Development",
    "Full-Stack Development",
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
    "Framer Development",
    "Front-end Development",
    "Dashboard Design",
    "Webflow Development",
    "Ongoing Maintenance & Support",
    "Mobile App Design",
  ],
] as const;

/** Figma: Webkarigor vs Other Agencies — Built for Growing Products */
export const COMPARISON_ITEMS = [
  {
    label: "Discovery and research before design",
    otherHas: true,
  },
  {
    label: "Interactive prototypes for key flows",
    otherHas: false,
  },
  {
    label: "Developer-ready handoff documentation",
    otherHas: true,
  },
  {
    label: "Design system and reusable components",
    otherHas: false,
  },
  {
    label: "Flexible engagement based on project needs",
    otherHas: true,
  },
  {
    label: "Ongoing design consultation",
    otherHas: false,
  },
  {
    label: "Transparent communication throughout the project",
    otherHas: false,
  },
  {
    label: "Structured process from concept to delivery",
    otherHas: true,
  },
] as const;

/** Figma Featured Work — 1521 × 1083: 2 top + 3 bottom */
export const FEATURED_WORK = [
  { src: "/sm1.png", alt: "Simple is More website" },
  { src: "/sm4.png", alt: "Fashion mobile app screens" },
  { src: "/services/why-choose-main.jpg", alt: "Desktop product interface" },
  { src: "/sm3.jpg", alt: "Analytics dashboard" },
  { src: "/ecommerce/hero-composite.png", alt: "Lifestyle commerce UI" },
] as const;
