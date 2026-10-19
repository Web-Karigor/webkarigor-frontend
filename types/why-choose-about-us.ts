export type WhyChooseAboutUsPost = {
  id: number;
  sort_order: number;
  fields?: {
    title?: string | null;
    description?: string | null;
    icon?: string | null;
  };
};

export type WhyChooseAboutUsResponse = {
  success: boolean;
  data?: {
    posts?: WhyChooseAboutUsPost[];
  };
};
