import aboutContent from "@/data/about-content.json";

export const ABOUT_HERO_IMAGES: string[] = [];

export const ABOUT_HERO_TITLE = "";

export const ABOUT_IMPACT = {
  intro: "",
  stats: [] as { value: string; label: string; description: string }[],
  mainImage: "",
  mainImageAlt: "",
  gallery: [] as string[],
};

export const ABOUT_VISION = {
  title: "",
  lead: "",
  body: "",
  images: {
    large: "",
    top: "",
    bottomLeft: "",
    bottomRight: "",
  },
  alts: {
    large: "",
    top: "",
    bottomLeft: "",
    bottomRight: "",
  },
};

export const ABOUT_CAPABILITIES: string[] = [];

export const ABOUT_WHY_CHOOSE = {
  title: aboutContent.whyChoose.title,
  subtitle: aboutContent.whyChoose.subtitle,
  items: [] as { title: string; description: string; icon: string }[],
};

export const ABOUT_METADATA = {
  title: "About Us",
  description: "",
};
