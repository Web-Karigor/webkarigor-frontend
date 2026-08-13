import content from "@/data/project-details-content.json";

export type ProjectCredit = {
  role: string;
  name: string;
  avatar: string;
};

export type RelatedProject = {
  slug: string;
  title: string;
  description: string;
  image: string;
  variant?: "image" | "text";
};

export type ProjectDetail = {
  slug: string;
  title: string;
  titleLines?: readonly [string, string];
  heroImages: readonly [string, string, string];
  meta: {
    execution: string;
    clientName: string;
    projectArea: string;
    status: string;
    technologies: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  clientVoice: string;
  mockupImage: string;
  problem: string;
  solution: string;
  credits: ProjectCredit[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
  };
  ctaBody: string;
  related: RelatedProject[];
  nextSlug: string;
};

type ProjectContent = Omit<ProjectDetail, "credits" | "ctaBody">;

const projectContent = content.projects as unknown as Record<string, ProjectContent>;

export const PROJECT_DETAILS_METADATA = content.metadata;
export const PROJECT_DETAILS_UI = content.ui;
export const DEFAULT_PROJECT_SLUG = content.defaultSlug;
export const PROJECT_DETAILS: Record<string, ProjectDetail> = Object.fromEntries(
  Object.entries(projectContent).map(([slug, project]) => [
    slug,
    {
      ...project,
      credits: content.sharedCredits,
      ctaBody: content.sharedCtaBody
    }
  ])
);

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_DETAILS);
}
