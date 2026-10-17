export type FaqErpFields = {
  question: string;
  answer: string;
};

export type FaqErpPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqErpFields;
};

export type FaqErpData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqErpPost[];
};

export type FaqErpResponse = {
  success: boolean;
  data: FaqErpData;
};
