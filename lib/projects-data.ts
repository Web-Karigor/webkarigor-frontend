import projectsContent from "@/data/projects-content.json";
import {
  getProjectDetail,
  type ProjectDetail,
} from "@/lib/project-details-data";

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

export const PROJECTS_METADATA = {
  title: "Projects",
  description: "",
};

export const PROJECTS_INTRO = {
  title: projectsContent.intro.title,
  body: projectsContent.intro.body,
};

/** Bento frame — layout only. Cards come from the projects API. */
export const PROJECTS_CONTENT_W = 1300;
export const PROJECTS_GAP = 20;
export const PROJECTS_RADIUS = 32;

export const PROJECTS_WATERMARK: ProjectWatermark = {
  fontSize: 248,
  color: "#E8E4DC",
  opacity: 0.18,
  width: 281,
  items: [
    { id: "tl-projects", text: "PROJECTS", side: "left", top: "0%", h: 1424 },
    {
      id: "bl-webkarigor",
      text: "WEBKARIGOR",
      side: "left",
      bottom: "6%",
      h: 1943,
    },
    {
      id: "tr-webkarigor",
      text: "WEBKARIGOR",
      side: "right",
      top: "6%",
      h: 1943,
    },
    {
      id: "br-projects",
      text: "PROJECTS",
      side: "right",
      bottom: "0%",
      h: 1424,
    },
  ],
};

export const PROJECT_CARD_OVERLAY_LABELS = projectsContent.cardOverlayLabels;

export const PROJECT_CARD_SLUGS: Record<string, string> = {};

export const PROJECT_ITEMS: ProjectItem[] = [];

export type ProjectCardOverview = {
  title: string;
  description: string;
  keyPoints: string[];
};

function overviewCopy(body: string) {
  const paragraphs = body
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return "";
  if (paragraphs[0].length < 180 && paragraphs[1]) {
    return `${paragraphs[0]} ${paragraphs[1]}`;
  }
  return paragraphs[0];
}

function numberedSolutionPoints(solution: string) {
  return [...solution.matchAll(/\d+\.\s+([^—\n]+)/g)]
    .map((match) => match[1].trim().replace(/[.:]$/, ""))
    .filter(Boolean)
    .slice(0, 5);
}

function shortItems(items: string[] | undefined) {
  return (items ?? [])
    .map((item) => item.split("—")[0].trim())
    .filter((item) => item.length > 0 && item.length <= 48)
    .slice(0, 5);
}

function overviewPoints(project: ProjectDetail) {
  const numbered = numberedSolutionPoints(project.solution);
  if (numbered.length >= 3) return numbered;

  const features = project.extraSections?.find(
    (section) => section.title === "Features",
  );
  const featureItems = shortItems(features?.groups?.[0]?.items);
  if (featureItems.length >= 3) return featureItems;

  const built = project.extraSections?.find(
    (section) => section.title === "What Web Karigor Built",
  );
  const builtItems = shortItems(built?.groups?.[0]?.items);
  if (builtItems.length >= 3) return builtItems;

  return [
    project.meta.projectArea,
    project.meta.technologies,
    project.meta.status,
    project.meta.execution,
  ].filter(Boolean);
}

/** Hover overview for a projects-page card, taken from that project's detail record. */
export function getProjectCardOverview(
  cardId: string,
): ProjectCardOverview | null {
  const slug = PROJECT_CARD_SLUGS[cardId];
  const project = slug ? getProjectDetail(slug) : undefined;
  if (!project) return null;

  const description = overviewCopy(project.about.body);
  if (!description) return null;

  return {
    title: project.meta.clientName || project.titleLines?.[1] || project.title,
    description,
    keyPoints: overviewPoints(project),
  };
}
