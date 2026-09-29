import type { HomepagePackage } from "@/types/homepage-package";

export type Service = {
  id: number;
  title: string;
  slug: string;
};

export type ServicesResponse = {
  data: Service[];
  success: boolean;
  status: number;
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
