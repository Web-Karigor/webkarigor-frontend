import type { HomeMedia, HomeSection } from "@/types/home-page";

export type SdHeroItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  button_text: string;
  contact: string;
  image: HomeMedia;
};

export type SdClientsItem = {
  id: number;
  sort_order?: number;
  title: string;
  images: HomeMedia[];
};

export type SdTechnologyItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
};

export type SdWhyItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  left_image_one: HomeMedia;
  left_image_two: HomeMedia;
};

export type SdTeamItem = {
  id: number;
  sort_order?: number;
  title_left_top: string;
  tittle_right_down: string;
  images: HomeMedia[];
};

export type SdFaqItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  cta_contact: string;
};

export type SoftwareDevelopmentPageSections = {
  hero?: HomeSection<SdHeroItem>;
  client_work_with?: HomeSection<SdClientsItem>;
  technology?: HomeSection<SdTechnologyItem>;
  why_webkarigor?: HomeSection<SdWhyItem>;
  team?: HomeSection<SdTeamItem>;
  faq?: HomeSection<SdFaqItem>;
};

export type SoftwareDevelopmentPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  custom_css?: string;
  sections: SoftwareDevelopmentPageSections;
};

export type SoftwareDevelopmentPageResponse = {
  success: boolean;
  data: SoftwareDevelopmentPageData;
  meta?: { section_keys: string[] };
};
