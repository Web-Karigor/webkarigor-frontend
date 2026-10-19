export type CapabilityPost = {
  id: number;
  sort_order: number;
  fields?: {
    title?: string | null;
  };
};

export type CapabilitiesResponse = {
  success: boolean;
  data?: {
    posts?: CapabilityPost[];
  };
};
