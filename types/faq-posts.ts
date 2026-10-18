export type FaqPostFields = {
  question: string;
  answer: string;
};

export type FaqPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqPostFields;
};

export type FaqPostsData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqPost[];
};

export type FaqPostsResponse = {
  success: boolean;
  data: FaqPostsData;
};
