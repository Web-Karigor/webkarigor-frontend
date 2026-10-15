export type ServicePostMedia = {
  id: number;
  url: string;
  name: string;
  alt_text: string;
};

export type ServicePostFields = {
  title: string;
  subtitle: string;
  content: string;
  images: ServicePostMedia[];
};

export type ServicePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ServicePostFields;
};

export type ServicePostsData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ServicePost[];
};

export type ServicePostsResponse = {
  success: boolean;
  data: ServicePostsData;
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

export type StoryService = {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  desc: string;
  link: string;
  images: [string, string];
};
