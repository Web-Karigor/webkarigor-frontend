export type FeaturePricingPost = {
  id: number;
  sort_order: number;
  fields?: {
    title?: string | null;
    description?: string | null;
    icon?: string | null;
  };
};

export type FeaturePricingResponse = {
  success: boolean;
  data?: {
    posts?: FeaturePricingPost[];
  };
};
