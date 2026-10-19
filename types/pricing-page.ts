export type PricingMedia = {
  id: number;
  url: string;
  name?: string;
  alt_text?: string;
};

export type PricingPageResponse = {
  success: boolean;
  data?: {
    sections?: {
      packages?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
          content?: string | null;
        }[];
      };
      hero?: {
        items?: {
          title?: string | null;
          title_2?: string | null;
        }[];
      };
      request_quote?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
          button_text?: string | null;
        }[];
      };
      complete_packages?: {
        items?: {
          title?: string | null;
          packages?: string[] | null;
        }[];
      };
      testimonial?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
        }[];
      };
      build_for_growth?: {
        items?: {
          title?: string | null;
          section_one_title?: string | null;
          section_two_title?: string | null;
          section_one_lists?: string[] | null;
          section_two_lists?: string[] | null;
        }[];
      };
      faq?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
          cta_title?: string | null;
          cta_button_text?: string | null;
        }[];
      };
      featured_work?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
          images?: PricingMedia[] | null;
        }[];
      };
    };
  };
};
