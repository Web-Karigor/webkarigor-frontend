export type FooterMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type FooterMenuFields = {
  id?: string | null;
  label?: string | null;
  href?: string | null;
  icon?: FooterMedia | null;
};

export type FooterMenuPost = {
  id: number;
  sort_order: number;
  fields: FooterMenuFields;
};

export type FooterMenuResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    slug: string;
    posts: FooterMenuPost[];
  };
};
