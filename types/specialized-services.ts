export type SpecializedServiceFields = {
  title: string;
  description: string;
  icon: string;
  variant: string;
};

export type SpecializedServicePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: SpecializedServiceFields;
};

export type SpecializedServicesData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: SpecializedServicePost[];
};

export type SpecializedServicesResponse = {
  success: boolean;
  data: SpecializedServicesData;
};
