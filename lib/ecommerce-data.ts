import content from "@/data/ecommerce-content.json";

export const ECO_METADATA = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export const ECO_HERO = {
  clients: content.hero.clients.map((client) => ({
    ...client,
    alt: client.name,
  })),
  clientsLabel: content.hero.clientsLabel,
  heroImage: content.hero.heroImage,
  heroImageAlt: content.hero.heroImageAlt,
  titleLine1: content.hero.titleLine1,
  titleLine2: content.hero.titleLine2,
  description: content.hero.description,
  primaryCta: content.hero.primaryCta,
  hotline: content.hero.hotline,
  hotlineLabel: content.hero.hotlineLabel,
};

export const ECO_TRUSTED_LOGOS = content.trustedLogos;

export const ECO_FEATURES_SECTION = {
  eyebrow: content.features.eyebrow,
  title: content.features.title,
  description: content.features.description,
};

export const ECO_FEATURES = content.features.items;

export const ECO_TECH_STACK_SECTION = {
  title: content.techStack.title,
  description: content.techStack.description,
};

export const ECO_TECH_STACK = content.techStack.items;

export const ECO_TECH_ROWS = [
  ECO_TECH_STACK.slice(0, 5),
  ECO_TECH_STACK.slice(5, 9),
  ECO_TECH_STACK.slice(9, 12),
];

export const ECO_PORTFOLIO_SECTION = { title: "" };

export const ECO_PORTFOLIO_TABS = content.portfolio.tabs;

export const ECO_PORTFOLIO_ITEMS = content.portfolio.items;

export const ECO_REVIEWS_SECTION = {
  eyebrow: content.reviews.eyebrow,
  title: content.reviews.title,
  rating: content.reviews.rating,
  ratingLabel: content.reviews.ratingLabel,
};

export const ECO_REVIEW_AVATARS = content.reviews.avatars;

export const ECO_TESTIMONIALS = content.reviews.items.map((item) => ({
  quote: item.quote,
  name: item.name,
  role: item.role,
  avatar: "",
  rating: item.rating,
}));

export const ECO_PRICING_SECTION = { title: "" };

export const ECO_PRICING_PLANS: unknown[] = [];

export const ECO_MARQUEE_ITEMS = content.marqueeItems;
