export type FaqHomeFields = {
  question: string;
  answer: string;
};

export type FaqHomePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: FaqHomeFields;
};

export type FaqHomeData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: FaqHomePost[];
};

export type FaqHomeResponse = {
  success: boolean;
  data: FaqHomeData;
  meta?: {
    pagination?: {
      current_page: number;
      per_page: number;
      total: number;
      last_page: number;
      next_page_url: string | null;
      prev_page_url: string | null;
    };
  };
};
