import type { ContactUsItem, HomeMedia, HomeSection } from "@/types/home-page";

export type ContactHeroItem = {
  id: number;
  sort_order?: number;
  title?: string;
};

export type ContactConnectItem = {
  id: number;
  sort_order?: number;
  title?: string;
  email_info_title?: string;
  email_info_email?: string;
  career_email_title?: string;
  career_email?: string;
  address?: string;
  whatsapp?: string;
};

export type ContactCompanyDeskItem = {
  id: number;
  sort_order?: number;
  title?: string;
  subtitle?: string;
  left_image?: HomeMedia | null;
};

export type ContactSuccessStoriesItem = {
  id: number;
  sort_order?: number;
  title?: string;
};

export type ContactFaqItem = {
  id: number;
  sort_order?: number;
  title?: string;
  subtitle?: string;
  cta_contact?: string;
};

export type ContactPageSections = {
  hero?: HomeSection<ContactHeroItem>;
  connect?: HomeSection<ContactConnectItem>;
  company_desk?: HomeSection<ContactCompanyDeskItem>;
  success_stories?: HomeSection<ContactSuccessStoriesItem>;
  faq?: HomeSection<ContactFaqItem>;
  contact_us?: HomeSection<ContactUsItem>;
};

export type ContactPageData = {
  id: number;
  name: string;
  slug: string;
  updated_at?: string;
  custom_css?: string;
  sections: ContactPageSections;
};

export type ContactPageResponse = {
  success: boolean;
  data: ContactPageData;
  meta?: {
    section_keys?: string[];
  };
};
