export type FaqSoftwareDevelopementFields = {
  question: string;
  answer: string;
};

export type FaqSoftwareDevelopementPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqSoftwareDevelopementFields;
};

export type FaqSoftwareDevelopementData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqSoftwareDevelopementPost[];
};

export type FaqSoftwareDevelopementResponse = {
  success: boolean;
  data: FaqSoftwareDevelopementData;
};
