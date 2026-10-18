import type { HomeMedia, HomeSection } from "@/types/home-page";

export type WddHeroItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  button_text: string;
  contact: string;
  image: HomeMedia;
};

export type WddWhyItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  subtitle_two: string;
};

export type WddTeamItem = {
  id: number;
  sort_order?: number;
  title_left_top: string;
  tittle_right_down: string;
  images: HomeMedia[];
};

export type WddFaqItem = {
  id: number;
  sort_order?: number;
  title: string;
  cta_text: string;
};

export type WebDesignDevelopmentPageSections = {
  hero?: HomeSection<WddHeroItem>;
  why_webkarigor?: HomeSection<WddWhyItem>;
  team?: HomeSection<WddTeamItem>;
  faq?: HomeSection<WddFaqItem>;
};

export type WebDesignDevelopmentPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  custom_css?: string;
  sections: WebDesignDevelopmentPageSections;
};

export type WebDesignDevelopmentPageResponse = {
  success: boolean;
  data: WebDesignDevelopmentPageData;
  meta?: { section_keys: string[] };
};
