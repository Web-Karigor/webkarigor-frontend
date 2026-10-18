export type ContactStoryMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type ContactStoryFields = {
  id?: string;
  label?: string;
  image?: ContactStoryMedia | null;
  imagealt?: string;
  quote?: string;
  name?: string;
  role?: string;
  avatar?: string;
};

export type ContactStoryPost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ContactStoryFields;
};

export type ContactUsSuccessStoriesData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ContactStoryPost[];
};

export type ContactUsSuccessStoriesResponse = {
  success: boolean;
  data: ContactUsSuccessStoriesData;
};
