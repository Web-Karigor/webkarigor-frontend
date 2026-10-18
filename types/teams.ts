export type TeamsMedia = {
  id: number;
  url: string;
  name: string;
  alt_text?: string;
};

export type TeamsFields = {
  id: string;
  name: string;
  role: string;
  image: TeamsMedia;
  bio: string;
};

export type TeamsPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: TeamsFields;
};

export type TeamsData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: TeamsPost[];
};

export type TeamsPagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type TeamsResponse = {
  success: boolean;
  data: TeamsData;
  meta?: {
    pagination?: TeamsPagination;
  };
};
