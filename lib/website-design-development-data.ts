import website_design_development from "@/data/website-design-development-content.json";

export const WEBSITE_DESIGN_DEVELOPMENT_METADATA = website_design_development.metadata;

export const WEBSITE_DESIGN_DEVELOPMENT_HERO = website_design_development.hero;

export const WEBSITE_DESIGN_DEVELOPMENT_TRUSTED_LOGOS = website_design_development.trustedLogos;

export const WEBSITE_DESIGN_DEVELOPMENT_FEATURES_SECTION = website_design_development.features;

export const WEBSITE_DESIGN_DEVELOPMENT_FEATURES = website_design_development.features.items;

export const WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION = website_design_development.integrations;

/** Tech icon content only — orbit angles/positions live in ErpIntegrations.tsx */
export const WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER = website_design_development.integrations.inner;

export const WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER = website_design_development.integrations.outer;

/** @deprecated — kept for any leftover imports */
export const WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS = [
    ...WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER,
    ...WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER,
] as const;

export const WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_SECTION = website_design_development.portfolio;

export const WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS = website_design_development.portfolio.items;

export const WEBSITE_DESIGN_DEVELOPMENT_REVIEWS_SECTION = website_design_development.reviews;

export const WEBSITE_DESIGN_DEVELOPMENT_TESTIMONIALS = website_design_development.reviews.items;

export const WEBSITE_DESIGN_DEVELOPMENT_PRICING_SECTION = website_design_development.pricing;

export const WEBSITE_DESIGN_DEVELOPMENT_PRICING_PLANS = website_design_development.pricing.plans;
