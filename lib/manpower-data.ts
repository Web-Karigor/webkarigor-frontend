import manpowerContent from "@/data/manpower-content.json";

export const MANPOWER_METADATA = manpowerContent.metadata;

export const MANPOWER_HERO = manpowerContent.hero;

export const MANPOWER_TRUST_TITLE = manpowerContent.trustTitle;

export const MANPOWER_TRUSTED_LOGOS = manpowerContent.trustedLogos;

/** Tech icon content only — orbit geometry lives in ManpowerFeaturesOrbit.tsx */
export const MANPOWER_TECH_ORBIT = manpowerContent.techOrbit;

/** @deprecated — kept for any leftover imports */
export const MANPOWER_FEATURES_ORBIT = MANPOWER_TECH_ORBIT;

/** Active Why Choose copy (from ManpowerWhyChoose — not the unused legacy MANPOWER_WHY) */
export const MANPOWER_WHY = manpowerContent.whyChoose;

export const MANPOWER_PORTFOLIO_SECTION = manpowerContent.portfolio;

export const MANPOWER_PORTFOLIO_ITEMS = manpowerContent.portfolio.items;

export const MANPOWER_REVIEWS_SECTION = manpowerContent.reviews;

export const MANPOWER_TESTIMONIALS = manpowerContent.reviews.items;

export const MANPOWER_PRICING_SECTION = manpowerContent.pricing;

export const MANPOWER_PRICING_PLANS = manpowerContent.pricing.plans;

export const MANPOWER_FAQ_SECTION = manpowerContent.faq;

export const MANPOWER_FAQS = manpowerContent.faq.items;
