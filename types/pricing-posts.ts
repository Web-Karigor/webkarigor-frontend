export type PricingPost = {
  id: number;
  sort_order?: number | null;
  fields?: {
    title?: string | null;
    subtitle?: string | null;
    price?: number | string | null;
    discount_price?: number | string | null;
    description?: string | null;
    popular?: string | null;
  } | null;
};

export type PricingPostsResponse = {
  success: boolean;
  data?: {
    posts?: PricingPost[];
  };
};
