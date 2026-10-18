import type { HomeMedia, HomeSection } from "@/types/home-page";

export type CrmHeroItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  image: HomeMedia;
};

export type CrmBrandsItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  images: HomeMedia[];
};

export type CrmIndustriesItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type CrmWhyItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type CrmWhyServiceItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type CrmWhyCrmItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
  content_one_title: string;
  content_one_description: string;
  content_two_title: string;
  content_two_description: string;
  content_three_title: string;
  content_three_description: string;
  content_four_title: string;
  content_four_description: string;
  left_image_one: HomeMedia;
  left_image_two: HomeMedia;
};

export type CrmTeamItem = {
  id: number;
  sort_order?: number;
  title_left_top: string;
  tittle_right_down: string;
  images: HomeMedia[];
};

export type CrmClientsSuccessItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type CrmPricingItem = {
  id: number;
  sort_order?: number;
  title: string;
  subtitle: string;
  content: string;
};

export type CrmFaqItem = {
  id: number;
  sort_order?: number;
  title: string;
  title_two: string;
  cta_contact: string;
};

export type CrmPageSections = {
  hero?: HomeSection<CrmHeroItem>;
  brands_work_with?: HomeSection<CrmBrandsItem>;
  industries?: HomeSection<CrmIndustriesItem>;
  why_webkarigor?: HomeSection<CrmWhyItem>;
  why_webkarigor_service?: HomeSection<CrmWhyServiceItem>;
  why_webkarigor_crm?: HomeSection<CrmWhyCrmItem>;
  team?: HomeSection<CrmTeamItem>;
  clients_sucess?: HomeSection<CrmClientsSuccessItem>;
  pricing?: HomeSection<CrmPricingItem>;
  faq?: HomeSection<CrmFaqItem>;
};

export type CrmPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  custom_css?: string;
  sections: CrmPageSections;
};

export type CrmPageResponse = {
  success: boolean;
  data: CrmPageData;
  meta?: { section_keys: string[] };
};
