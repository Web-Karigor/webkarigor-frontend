import type { HomeMedia, HomeSection } from "@/types/home-page";

export type ErpHeroItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  button_text: string;
  contact: string;
  image: HomeMedia;
};

export type ErpTeamItem = {
  id: number;
  sort_order?: number;
  title_left_top: string;
  /** CMS field name is intentionally misspelled as `tittle_right_down`. */
  tittle_right_down: string;
  images: HomeMedia[];
};

export type ErpFaqItem = {
  id: number;
  sort_order?: number;
  title: string;
  cta_text: string;
};

export type ErpPageSections = {
  hero?: HomeSection<ErpHeroItem>;
  team?: HomeSection<ErpTeamItem>;
  faq?: HomeSection<ErpFaqItem>;
};

export type ErpPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  custom_css?: string;
  sections: ErpPageSections;
};

export type ErpPageResponse = {
  success: boolean;
  data: ErpPageData;
  meta?: { section_keys: string[] };
};
