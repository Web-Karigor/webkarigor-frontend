export type ErpServiceFields = {
  title: string;
  description: string;
  color: string;
  bg: string;
  icon: string;
};

export type ErpServicePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: ErpServiceFields;
};

export type ErpServicesData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ErpServicePost[];
};

export type ErpServicesResponse = {
  success: boolean;
  data: ErpServicesData;
};
