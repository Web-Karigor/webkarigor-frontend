export type TechServicesMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type TechServicesFields = {
  category?: string | null;
  /** Most posts. */
  src?: TechServicesMedia | null;
  variant?: string | null;
  /** First post uses these spellings. */
  image?: TechServicesMedia | null;
  varient?: string | null;
};

export type TechServicesPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: TechServicesFields;
};

export type TechServicesHomeData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: TechServicesPost[];
};

export type TechServicesHomeResponse = {
  success: boolean;
  data: TechServicesHomeData;
};
