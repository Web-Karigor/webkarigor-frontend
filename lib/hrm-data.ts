import hrmContent from "@/data/hrm-content.json";

export const HRM_METADATA = hrmContent.metadata;

export const HRM_HERO = hrmContent.hero;

export const HRM_TRUSTED_LOGOS = hrmContent.trustedLogos;

export const HRM_FEATURES_SECTION = hrmContent.features;

export const HRM_FEATURES = hrmContent.features.items;

export const HRM_INTEGRATIONS_SECTION = hrmContent.integrations;

/** Tech icon content only — orbit angles/positions live in HrmIntegrations.tsx */
export const HRM_TECH_INNER = hrmContent.integrations.inner;

export const HRM_TECH_OUTER = hrmContent.integrations.outer;

/** @deprecated — kept for any leftover imports */
export const HRM_INTEGRATIONS = [
    ...HRM_TECH_INNER,
    ...HRM_TECH_OUTER,
] as const;

export const HRM_PORTFOLIO_SECTION = hrmContent.portfolio;

export const HRM_PORTFOLIO_ITEMS = hrmContent.portfolio.items;

export const HRM_REVIEWS_SECTION = hrmContent.reviews;

export const HRM_TESTIMONIALS = hrmContent.reviews.items;

export const HRM_PRICING_SECTION = hrmContent.pricing;

export const HRM_PRICING_PLANS = hrmContent.pricing.plans;
