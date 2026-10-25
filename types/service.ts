import type { HomepagePackage } from "@/types/homepage-package";

export type Service = {
  id: number;
  title: string;
  slug: string;
};

export type ServicesResponse = {
  data: Service[] | ServicesMenuData;
  success: boolean;
  status?: number;
  meta?: Record<string, unknown>;
};

export type ServiceMenuPost = {
  id: number;
  fields: {
    label?: string | null;
    href?: string | null;
  };
};

export type ServicesMenuData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  updated_at?: string;
  posts: ServiceMenuPost[];
};

export type ServiceDetailData = {
  service: Service;
  packages: HomepagePackage[];
};

export type ServiceDetailResponse = {
  data: ServiceDetailData;
  success: boolean;
  status: number;
};
