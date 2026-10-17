export type ProjectMedia = {
  id: number;
  url: string;
  name: string;
  alt_text?: string;
};

export type ProjectFields = {
  title?: string;
  subtitle?: string;
  slug?: string;
  overview?: string;
  platform?: string;
  short_details?: string;
  client_voice?: string;
  project_details?: string;
  testimonial?: string;
  client_name?: string;
  designation?: string;
  rating?: number;
  thumbimage?: ProjectMedia | null;
  images?: ProjectMedia[];
  project_manager_name?: string;
  project_manager?: ProjectMedia | null;
  product_designer_name?: string;
  product_designer?: ProjectMedia | null;
  front_end_developer_name?: string;
  front_end_developer?: ProjectMedia | null;
  back_end_developer?: string;
  back_end_developer_2?: string;
  back_end_developers?: ProjectMedia[];
};

export type ProjectPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ProjectFields;
};

export type ProjectsData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ProjectPost[];
};

export type ProjectsResponse = {
  success: boolean;
  data: ProjectsData;
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
