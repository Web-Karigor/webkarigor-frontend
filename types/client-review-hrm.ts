export type ClientReviewHrmFields = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export type ClientReviewHrmPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ClientReviewHrmFields;
};

export type ClientReviewHrmData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ClientReviewHrmPost[];
};

export type ClientReviewHrmResponse = {
  success: boolean;
  data: ClientReviewHrmData;
};
