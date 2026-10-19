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

export type ProjectExtraPhaseItem = {
  title: string;
  body: string;
};

export type ProjectExtraPhase = {
  title: string;
  period?: string;
  intro?: string;
  items: ProjectExtraPhaseItem[];
};

export type ProjectExtraSection = {
  title: string;
  headline?: string;
  intro?: string;
  paragraphs?: string[];
  phases?: ProjectExtraPhase[];
  flows?: { title: string; items: string[] }[];
  groups?: { title: string; intro?: string; items: string[] }[];
  focus?: string[];
  colors?: { label: string; value: string }[];
  closing?: string;
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
    items?: { title: string; body: string }[];
    more?: {
      headline: string;
      body: string;
      subhead?: string;
      items?: { title: string; body: string }[];
      closing?: string;
    };
  };
  clientVoice: string;
  mockupImage: string;
  problem: string;
  solution: string;
  /** When set (CMS HTML), body renders this instead of structured about/problem/solution/extras. */
  detailsHtml?: string;
  extraSections?: ProjectExtraSection[];
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

/** Section labels for the project-detail layout. Body copy comes from the projects API. */
export const PROJECT_DETAILS_METADATA = {
  siteName: "Webkarigor",
  fallbackTitle: "Project — Webkarigor",
};

export const PROJECT_DETAILS_UI = {
  backToProjects: "Back to Projects",
  projectDetails: "Project Details",
  clientsVoice: "Clients Voice",
  problem: "Problem",
  solution: "Solution",
  credits: "CREDITS",
  testimonial: "Testimonial",
  ctaTitle: "Have a project idea in mind?",
  ctaButton: "Let’s get started",
  nextProject: "View Next Project",
  relatedProjects: "Other Related Projects",
  viewProject: "View Project",
  mockupAlt: "Project desktop mockup",
  metaLabels: {
    execution: "Execution",
    clientName: "Client Name",
    projectArea: "Project Area",
    status: "Status",
    technologies: "Technologies",
  },
};

export const DEFAULT_PROJECT_SLUG = "";

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_DETAILS);
}
