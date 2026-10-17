export type ClientReviewWebdesignFields = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export type ClientReviewWebdesignPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ClientReviewWebdesignFields;
};

export type ClientReviewWebdesignData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ClientReviewWebdesignPost[];
};

export type ClientReviewWebdesignResponse = {
  success: boolean;
  data: ClientReviewWebdesignData;
};
