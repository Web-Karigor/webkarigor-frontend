export type ProjectSoftwareDevelopementMedia = {
  id: number;
  url: string;
  name: string;
  alt_text?: string;
};

export type ProjectSoftwareDevelopementFields = {
  id: string;
  title: string;
  image: ProjectSoftwareDevelopementMedia;
};

export type ProjectSoftwareDevelopementPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ProjectSoftwareDevelopementFields;
};

export type ProjectSoftwareDevelopementData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ProjectSoftwareDevelopementPost[];
};

export type ProjectSoftwareDevelopementResponse = {
  success: boolean;
  data: ProjectSoftwareDevelopementData;
};
