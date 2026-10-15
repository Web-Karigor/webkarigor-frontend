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

export type HomePageSections = {
  hero?: HomeSection<HeroItem>;
  brands_work_with?: HomeSection<BrandsItem>;
  center_solutions?: HomeSection<CenterSolutionsItem>;
  industries_work_with?: HomeSection<IndustriesItem>;
  video?: HomeSection<VideoItem>;
  team?: HomeSection<TeamItem>;
  services?: HomeSection<ServicesHeadingItem>;
  specialized_services?: HomeSection<SpecializedServicesItem>;
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
