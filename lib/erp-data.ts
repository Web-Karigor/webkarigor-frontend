import content from "@/data/erp-content.json";

export const ERP_METADATA = {
  title: "ERP",
  description: "",
};

export const ERP_HERO = {
  title: "",
  description: "",
};

export const ERP_TRUSTED_LOGOS = content.trustedLogos;

export const ERP_FEATURES_SECTION = {
  title: "",
  description: "",
};

export const ERP_FEATURES: {
  title: string;
  description: string;
  icon: string;
  bg: string;
  color: string;
}[] = [];

export const ERP_INTEGRATIONS_SECTION = {
  title: content.integrations.title,
  description: content.integrations.description,
};

export const ERP_TECH_INNER = content.integrations.inner;

export const ERP_TECH_OUTER = content.integrations.outer;

export const ERP_INTEGRATIONS = [
  ...ERP_TECH_INNER,
  ...ERP_TECH_OUTER,
] as const;

export const ERP_PORTFOLIO_SECTION = {
  title: "",
};

export const ERP_PORTFOLIO_ITEMS: {
  id: string;
  title: string;
  image: string;
}[] = [];

export const ERP_REVIEWS_SECTION = {
  title: content.reviews.title,
  description: "",
};

export const ERP_TESTIMONIALS = content.reviews.items.map((item) => ({
  ...item,
  avatar: "",
}));

export const ERP_PRICING_SECTION = {
  title: "",
};

export const ERP_PRICING_PLANS: unknown[] = [];
