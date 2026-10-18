export type ProjectsHomeMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type ProjectsHomeFields = {
  image?: ProjectsHomeMedia | null;
};

export type ProjectsHomePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ProjectsHomeFields;
};

export type ProjectsHomeData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ProjectsHomePost[];
};

export type ProjectsHomeResponse = {
  success: boolean;
  data: ProjectsHomeData;
};
