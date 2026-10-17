export type HrmServiceFields = {
  title: string;
  description: string;
  color: string;
  bg: string;
  icon: string;
};

export type HrmServicePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: HrmServiceFields;
};

export type HrmServicesData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: HrmServicePost[];
};

export type HrmServicesResponse = {
  success: boolean;
  data: HrmServicesData;
};
