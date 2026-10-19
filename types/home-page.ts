export type HomeMedia = {
  id: number;
  url: string;
  name: string;
  alt_text: string;
};

export type HomeSection<T> = {
  id: number;
  key: string;
  name: string;
  type: string;
  sort_order: number;
  items_count: number;
  items: T[];
};

export type HeroItem = {
  id: number;
  years: string;
  title: string;
  middle_title: string;
  text: string;
  right_top: HomeMedia;
  left_down: HomeMedia;
  contact: string;
};

export type BrandsItem = {
  id: number;
  title: string;
  text: string;
  brand_logo: HomeMedia[];
};

export type CenterSolutionsItem = {
  id: number;
  solution: HomeMedia;
  solution_two: HomeMedia;
  solution_three: HomeMedia;
  solution_four: HomeMedia;
  solution_five: HomeMedia;
  solution_six: HomeMedia;
  center: HomeMedia;
};

export type IndustriesItem = {
  id: number;
  title: string;
  subtitle: string;
};

export type VideoItem = {
  id: number;
  video_link: string;
};

export type TeamItem = {
  id: number;
  right_top_text: string;
  bottom_left_text: string;
  home_team: HomeMedia[];
};

export type ServicesHeadingItem = {
  id: number;
  title: string;
  subtitle: string;
};

export type SpecializedServicesItem = {
  id: number;
  title: string;
  subtitle: string;
};

export type FaqHeadingItem = {
  id: number;
  title: string;
  subtitle: string;
  cta_title: string;
  cta_button_text: string;
};

export type RequestQuoteItem = {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
};

export type ContactUsItem = {
  id: number;
  sort_order?: number;
  title_sm?: string;
  title?: string;
  subtitle?: string;
  coo_name?: string;
  coo_designation?: string;
  prefer_talk_title?: string;
  cta_whats_app?: string;
  image?: HomeMedia | null;
};

export type HomePageSections = {
  hero?: HomeSection<HeroItem>;
  brands_work_with?: HomeSection<BrandsItem>;
  center_solutions?: HomeSection<CenterSolutionsItem>;
  industries_work_with?: HomeSection<IndustriesItem>;
  faq?: HomeSection<FaqHeadingItem>;
  video?: HomeSection<VideoItem>;
  team?: HomeSection<TeamItem>;
  request_quote?: HomeSection<RequestQuoteItem>;
  contact_us?: HomeSection<ContactUsItem>;
  services?: HomeSection<ServicesHeadingItem>;
  specialized_services?: HomeSection<SpecializedServicesItem>;
  packages?: HomeSection<{
    title?: string | null;
    subtitle?: string | null;
    content?: string | null;
  }>;
};

export type HomePageData = {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
  sections: HomePageSections;
};

export type HomePageResponse = {
  success: boolean;
  data: HomePageData;
  meta?: { section_keys: string[] };
};
