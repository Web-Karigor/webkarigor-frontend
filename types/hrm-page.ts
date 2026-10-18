import type { HomeMedia, HomeSection } from "@/types/home-page";

export type HrmHeroItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  button_text: string;
  contact: string;
  image: HomeMedia;
};

export type HrmClientsItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  images: HomeMedia[];
};

export type HrmWhyItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type HrmTechnologiesItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
};

export type HrmTeamItem = {
  id: number;
  sort_order?: number;
  title_left_top: string;
  tittle_right_down: string;
  images: HomeMedia[];
};

export type HrmFaqItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  cta_contact: string;
};

export type HrmPageSections = {
  hero?: HomeSection<HrmHeroItem>;
  our_clients?: HomeSection<HrmClientsItem>;
  why_webkarigor?: HomeSection<HrmWhyItem>;
  technologies_used?: HomeSection<HrmTechnologiesItem>;
  team?: HomeSection<HrmTeamItem>;
  faq?: HomeSection<HrmFaqItem>;
};

export type HrmPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  custom_css?: string;
  sections: HrmPageSections;
};

export type HrmPageResponse = {
  success: boolean;
  data: HrmPageData;
  meta?: { section_keys: string[] };
};
