export type AllProjectsPageResponse = {
  success: boolean;
  data?: {
    sections?: {
      projects?: {
        items?: {
          title?: string | null;
          subtitle?: string | null;
        }[];
      };
    };
  };
};
