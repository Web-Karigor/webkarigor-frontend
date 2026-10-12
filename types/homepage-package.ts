export type HomepagePackageType = {
  id: number;
  name: string;
  slug: string;
};

export type HomepagePackage = {
  id: number;
  title: string;
  subtitle: string | null;
  availability?: string | null;
  slug: string;
  features: string[];
  price: string;
  discounted_price: string;
  image?: string;
  is_popular: boolean;
  show_homepage: boolean;
  package_type: HomepagePackageType | null;
  package_category?: { id: number; name: string; slug: string } | null;
  service?: { id: number } | null;
};

export type HomepagePackagesResponse = {
  data: HomepagePackage[];
  success: boolean;
  status: number;
};
