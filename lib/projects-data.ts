import content from "@/data/projects-content.json";

export type ProjectItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  variant?: "image" | "brand-v" | "ventures";
  description?: string;
  keyPoints?: string[];
};

export type ProjectWatermark = {
  fontSize: number;
  color: string;
  opacity: number;
  width: number;
  items: Array<{
    id: string;
    text: string;
    side: "left" | "right";
    top?: string;
    bottom?: string;
    h: number;
  }>;
};

export const PROJECTS_METADATA = content.metadata;
export const PROJECTS_INTRO = content.intro;
export const PROJECTS_CONTENT_W = content.layout.contentWidth;
export const PROJECTS_GAP = content.layout.gap;
export const PROJECTS_RADIUS = content.layout.radius;
export const PROJECTS_WATERMARK = content.watermark as ProjectWatermark;
export const PROJECT_CARD_OVERLAY_LABELS = content.cardOverlayLabels;
export const PROJECT_CARD_SLUGS: Record<string, string> = content.cardSlugs;
export const PROJECT_ITEMS = content.items as ProjectItem[];
