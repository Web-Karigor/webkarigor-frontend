export type TechnologyFields = {
  icon: string;
  name: string;
};

export type TechnologyPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: TechnologyFields;
};

export type TechnologiesData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: TechnologyPost[];
};

export type TechnologiesResponse = {
  success: boolean;
  data: TechnologiesData;
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

export type TechItem = {
  id: number;
  icon: string;
  name: string;
};

export type TechGroup = {
  title: string;
  items: TechItem[];
};
