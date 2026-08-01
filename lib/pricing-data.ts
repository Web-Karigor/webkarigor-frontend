/**
 * Pricing Page — Figma node 2546-10751 (1920 × 10024)
 * Design tokens stay in TS; editable copy lives in data/pricing-content.json
 */
import pricingContent from "@/data/pricing-content.json";

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

export const PRICING_METADATA = pricingContent.metadata;

export const PRICING_HERO = pricingContent.hero;

export const PRICING_HERO_FEATURES = pricingContent.hero.features;

export type PricingBilling = "monthly" | "yearly";

export type PricingPlan = {
  id: string;
  name: string;
  subtitle: string;
  monthly: number;
  popular?: boolean;
  features: string[];
};

export const PRICING_PLANS_SECTION = pricingContent.plans;

export const PRICING_PLANS: PricingPlan[] = pricingContent.plans.items;

export const PRICING_CUSTOM_BANNER = pricingContent.customBanner;

export const PACKAGE_SECTION = pricingContent.package;

export const PACKAGE_COLUMNS = pricingContent.package.columns;

export const BUILT_FOR_SECTION = pricingContent.builtFor;

export const COMPARISON_ITEMS = pricingContent.builtFor.items;

export const FEATURED_WORK_SECTION = pricingContent.featuredWork;

export const FEATURED_WORK = pricingContent.featuredWork.items;

/** Figma: Save 25% on yearly */
export function planPrice(plan: PricingPlan, billing: PricingBilling): number {
  if (billing === "yearly") return Math.round(plan.monthly * 0.75);
  return plan.monthly;
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
