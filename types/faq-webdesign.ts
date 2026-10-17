export type FaqWebdesignFields = {
  question: string;
  answer: string;
};

export type FaqWebdesignPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqWebdesignFields;
};

export type FaqWebdesignData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqWebdesignPost[];
};

export type FaqWebdesignResponse = {
  success: boolean;
  data: FaqWebdesignData;
};
