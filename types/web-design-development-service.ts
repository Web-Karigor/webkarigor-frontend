export type WebDesignServiceFields = {
  title: string;
  description: string;
  color: string;
  bg: string;
  icon: string;
  category: string;
  tag: string;
};

export type WebDesignServicePost = {
  id: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  fields: WebDesignServiceFields;
};

export type WebDesignServiceData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: WebDesignServicePost[];
};

export type WebDesignServiceResponse = {
  success: boolean;
  data: WebDesignServiceData;
};
