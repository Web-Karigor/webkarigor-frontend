import content from "@/data/website-design-development-content.json";

export const WEBSITE_DESIGN_DEVELOPMENT_METADATA = {
  title: "Website Design & Development",
  description: "",
};

export const WEBSITE_DESIGN_DEVELOPMENT_HERO = {
  title: "",
  description: "",
};

export const WEBSITE_DESIGN_DEVELOPMENT_TRUSTED_LOGOS: {
  name: string;
  src: string;
}[] = [];

export const WEBSITE_DESIGN_DEVELOPMENT_FEATURES_SECTION = {
  eyebrow: "",
  title: "",
  description: "",
};

export const WEBSITE_DESIGN_DEVELOPMENT_FEATURES: {
  title: string;
  description: string;
  icon: string;
  bg: string;
  color: string;
}[] = [];

export const WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS_SECTION = {
  title: content.integrations.title,
  description: content.integrations.description,
};

export const WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER = content.integrations.inner;

export const WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER = content.integrations.outer;

export const WEBSITE_DESIGN_DEVELOPMENT_INTEGRATIONS = [
  ...WEBSITE_DESIGN_DEVELOPMENT_TECH_INNER,
  ...WEBSITE_DESIGN_DEVELOPMENT_TECH_OUTER,
] as const;

export const WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_SECTION = { title: "" };

export const WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS = content.portfolio.items;

export const WEBSITE_DESIGN_DEVELOPMENT_REVIEWS_SECTION = { title: "" };

export const WEBSITE_DESIGN_DEVELOPMENT_TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}[] = [];

export const WEBSITE_DESIGN_DEVELOPMENT_PRICING_SECTION = { title: "" };

export const WEBSITE_DESIGN_DEVELOPMENT_PRICING_PLANS: unknown[] = [];
