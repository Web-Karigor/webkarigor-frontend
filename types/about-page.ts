export type AboutMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type AboutHeroItem = {
  id: number;
  images?: AboutMedia[] | null;
};

export type AboutDigitalProductItem = {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  year?: number | string | null;
  projects?: number | string | null;
  year_content?: string | null;
  project_content?: string | null;
  images?: AboutMedia[] | null;
};

export type AboutVisionItem = {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  images?: AboutMedia[] | null;
};

export type AboutFooterItem = {
  id: number;
  title?: string | null;
  section?: string | null;
  section_2?: string | null;
  section_3?: string | null;
};

export type AboutPageResponse = {
  success: boolean;
  data?: {
    id?: number;
    name?: string;
    slug?: string;
    sections?: {
      hero?: { items?: AboutHeroItem[] };
      digital_product?: { items?: AboutDigitalProductItem[] };
      our_vision?: { items?: AboutVisionItem[] };
      footer?: { items?: AboutFooterItem[] };
    };
  };
};
