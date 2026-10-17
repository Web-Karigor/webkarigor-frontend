export type ProjectsHrmMedia = {
  id: number;
  url: string;
  name: string;
  alt_text?: string;
};

export type ProjectsHrmFields = {
  id: string;
  title: string;
  image: ProjectsHrmMedia;
};

export type ProjectsHrmPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ProjectsHrmFields;
};

export type ProjectsHrmData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ProjectsHrmPost[];
};

export type ProjectsHrmResponse = {
  success: boolean;
  data: ProjectsHrmData;
};
