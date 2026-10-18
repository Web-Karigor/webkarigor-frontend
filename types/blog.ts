export type BlogMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type BlogPostFields = {
  title: string;
  subtitle?: string;
  author?: string;
  published_date?: string;
  thumb_image?: BlogMedia | null;
  details?: string;
  slug: string;
};

export type BlogPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: BlogPostFields;
};

export type BlogPostsData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: BlogPost[];
};

export type BlogPostsResponse = {
  success: boolean;
  data: BlogPostsData;
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

/** UI-mapped blog post used by list + detail pages. */
export type Blog = {
  id: number;
  title: string;
  slug: string;
  author: string;
  published_at: string;
  subtitle: string;
  details: string;
  image: string;
};
