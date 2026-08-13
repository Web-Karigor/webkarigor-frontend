import erpContent from "@/data/erp-content.json";

export const ERP_METADATA = erpContent.metadata;

export const ERP_HERO = erpContent.hero;

export const ERP_TRUSTED_LOGOS = erpContent.trustedLogos;

export const ERP_FEATURES_SECTION = erpContent.features;

export const ERP_FEATURES = erpContent.features.items;

export const ERP_INTEGRATIONS_SECTION = erpContent.integrations;

/** Tech icon content only — orbit angles/positions live in ErpIntegrations.tsx */
export const ERP_TECH_INNER = erpContent.integrations.inner;

export const ERP_TECH_OUTER = erpContent.integrations.outer;

/** @deprecated — kept for any leftover imports */
export const ERP_INTEGRATIONS = [
  ...ERP_TECH_INNER,
  ...ERP_TECH_OUTER,
] as const;

export const ERP_PORTFOLIO_SECTION = erpContent.portfolio;

export const ERP_PORTFOLIO_ITEMS = erpContent.portfolio.items;

export const ERP_REVIEWS_SECTION = erpContent.reviews;

export const ERP_TESTIMONIALS = erpContent.reviews.items;

export const ERP_PRICING_SECTION = erpContent.pricing;

export const ERP_PRICING_PLANS = erpContent.pricing.plans;
