import ecommerceContent from "@/data/ecommerce-content.json";

export const ECO_METADATA = ecommerceContent.metadata;

export const ECO_HERO = ecommerceContent.hero;

export const ECO_TRUSTED_LOGOS = ecommerceContent.trustedLogos;

export const ECO_FEATURES_SECTION = ecommerceContent.features;

export const ECO_FEATURES = ecommerceContent.features.items;

export const ECO_TECH_STACK_SECTION = ecommerceContent.techStack;

export const ECO_TECH_STACK = ecommerceContent.techStack.items;

/** Figma staggered rows: 5 / 4 / 3 */
export const ECO_TECH_ROWS = [
  ECO_TECH_STACK.slice(0, 5),
  ECO_TECH_STACK.slice(5, 9),
  ECO_TECH_STACK.slice(9, 12),
] as const;

export const ECO_PORTFOLIO_SECTION = ecommerceContent.portfolio;

export const ECO_PORTFOLIO_TABS = ecommerceContent.portfolio.tabs;

export const ECO_PORTFOLIO_ITEMS = ecommerceContent.portfolio.items;

export const ECO_REVIEWS_SECTION = ecommerceContent.reviews;

export const ECO_REVIEW_AVATARS = ecommerceContent.reviews.avatars;

export const ECO_TESTIMONIALS = ecommerceContent.reviews.items;

export const ECO_PRICING_SECTION = ecommerceContent.pricing;

export const ECO_PRICING_PLANS = ecommerceContent.pricing.plans;

export const ECO_MARQUEE_ITEMS = ecommerceContent.marqueeItems;
