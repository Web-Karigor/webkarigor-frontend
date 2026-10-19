import content from "@/data/software-development-content.json";

export const METADATA = {
  title: "Software Development",
  description: "",
};

export const HERO = {
  title: "",
  description: "",
};

export const TRUST_TITLE = "";

export const TRUSTED_LOGOS: { name: string; src: string }[] = [];

export const TECH_ORBIT = {
  icons: content.techOrbit.icons,
};

export const WHY = {
  items: content.whyChoose.items,
};

export const PORTFOLIO_SECTION = { title: "" };

export const PORTFOLIO_ITEMS: {
  id: string;
  title: string;
  image: string;
}[] = [];

export const REVIEWS_SECTION = { title: "" };

export const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}[] = [];

export const PRICING_SECTION = { title: "" };

export const PRICING_PLANS: unknown[] = [];
