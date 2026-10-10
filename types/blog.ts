export type BlogMeta = {
  title: string | null;
  description: string | null;
  keywords: string | null;
  image: string | null;
};

export type Blog = {
  id: number;
  title: string;
  slug: string;
  author: string;
  published_at: string;
  /** HTML from the admin editor. */
  description: string;
  image: string;
  banner: string | null;
  meta: BlogMeta;
};

export type BlogsResponse = {
  data: Blog[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  success: boolean;
  status: number;
};

export type BlogDetailResponse = {
  data: Blog[];
  success: boolean;
  status: number;
};
