export type ProjectErpMedia = {
  id: number;
  url: string;
  name: string;
  alt_text?: string;
};

export type ProjectErpFields = {
  id: string;
  title: string;
  image: ProjectErpMedia;
};

export type ProjectErpPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ProjectErpFields;
};

export type ProjectErpData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ProjectErpPost[];
};

export type ProjectErpResponse = {
  success: boolean;
  data: ProjectErpData;
};
