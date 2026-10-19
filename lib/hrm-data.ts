import content from "@/data/hrm-content.json";

export const HRM_METADATA = {
  title: "HRM",
  description: "",
};

export const HRM_HERO = {
  title: "",
  description: "",
};

export const HRM_TRUSTED_LOGOS: { name: string; src: string }[] = [];

export const HRM_FEATURES_SECTION = {
  title: "",
  description: "",
};

export const HRM_FEATURES: {
  title: string;
  description: string;
}[] = [];

export const HRM_INTEGRATIONS_SECTION = {
  title: "",
  description: "",
};

export const HRM_TECH_INNER = content.integrations.inner;

export const HRM_TECH_OUTER = content.integrations.outer;

export const HRM_INTEGRATIONS = [
  ...HRM_TECH_INNER,
  ...HRM_TECH_OUTER,
] as const;

export const HRM_PORTFOLIO_SECTION = { title: "" };

export const HRM_PORTFOLIO_ITEMS: {
  id: string;
  title: string;
  image: string;
}[] = [];

export const HRM_REVIEWS_SECTION = { title: "" };

export const HRM_TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}[] = [];

export const HRM_PRICING_SECTION = { title: "" };

export const HRM_PRICING_PLANS: unknown[] = [];
