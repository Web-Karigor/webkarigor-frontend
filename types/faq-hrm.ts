export type FaqHrmFields = {
  question: string;
  answer: string;
};

export type FaqHrmPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqHrmFields;
};

export type FaqHrmData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqHrmPost[];
};

export type FaqHrmResponse = {
  success: boolean;
  data: FaqHrmData;
};
