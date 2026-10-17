export type ClientReviewSoftwareDevelopmentFields = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  highlight?: string | boolean;
};

export type ClientReviewSoftwareDevelopmentPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ClientReviewSoftwareDevelopmentFields;
};

export type ClientReviewSoftwareDevelopmentData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ClientReviewSoftwareDevelopmentPost[];
};

export type ClientReviewSoftwareDevelopmentResponse = {
  success: boolean;
  data: ClientReviewSoftwareDevelopmentData;
};
