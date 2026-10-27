import type { ProjectDetail, ProjectCredit, RelatedProject } from "@/lib/project-details-data";
import {
  PROJECT_DETAILS_UI,
  DEFAULT_PROJECT_SLUG,
} from "@/lib/project-details-data";
import type { ProjectFields, ProjectPost, ProjectsResponse } from "@/types/projects";

/** Static Case card colors — keyed by API slug. */
export const PROJECT_CASE_COLORS: Record<string, string> = {
  "suma-international": "#007b7a",
  "shishu-poribahan": "#f0841a",
  "probashi-resort": "#268e6f",
  "kapital-properties": "#8e8834",
  "timestoday-bd": "#d63a2e",
};

const CASE_COLOR_FALLBACK = [
  "#007b7a",
  "#f0841a",
  "#268e6f",
  "#8e8834",
  "#d63a2e",
];

/** Old static routes → current CMS slugs. */
export const PROJECT_SLUG_ALIASES: Record<string, string> = {
  "times-today": "timestoday-bd",
  "kids-ecommerce": "shishu-poribahan",
  "probashi-resorts": "probashi-resort",
};

export type CaseProjectItem = {
  number: string;
  tags?: string[];
  title: string;
  titleOneLine?: boolean;
  description: string;
  platforms?: string[];
  color: string;
  href: string;
  quote?: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
  images: string[];
};

export type ProjectsGridItem = {
  id: string;
  slug: string;
  title: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  description?: string;
  keyPoints?: string[];
};

function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, "\u2019")
    .replace(/&lsquo;/gi, "\u2018")
    .replace(/&rdquo;/gi, "\u201D")
    .replace(/&ldquo;/gi, "\u201C")
    .replace(/&ndash;/gi, "\u2013")
    .replace(/&mdash;/gi, "\u2014")
    .replace(/&middot;/gi, "·")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCharCode(parseInt(n, 16)),
    );
}

export function stripHtml(html: string | null | undefined) {
  if (!html) return "";
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function sortedPosts(posts: ProjectPost[] | undefined) {
  return [...(posts ?? [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );
}

export function resolveProjectSlug(slug: string) {
  return PROJECT_SLUG_ALIASES[slug] ?? slug;
}

export function getProjectSlug(fields: ProjectFields | undefined) {
  return fields?.slug?.trim() ?? "";
}

function caseTitle(fields: ProjectFields) {
  const title = fields.title?.trim() ?? "";
  const subtitle = fields.subtitle?.trim() ?? "";
  if (!subtitle) return title;
  if (!title) return subtitle;

  const token = title.split(/\s+/)[0]?.toLowerCase() ?? "";
  if (token && !subtitle.toLowerCase().includes(token)) {
    return title;
  }
  return subtitle;
}

function parsePlatforms(platform: string | undefined) {
  if (!platform) return [];
  return platform
    .split(/[,|/]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) =>
      part.replace(/\bweb\b/i, "Web").replace(/\bmobile\b/i, "Mobile"),
    );
}

export function parseProjectMeta(shortDetails: string | undefined) {
  const html = shortDetails ?? "";
  const pick = (label: string) => {
    // Value may sit inside <strong> (e.g. "Execution : 30") or after it.
    const block = html.match(
      new RegExp(
        `<div[^>]*>\\s*<strong>[^<]*${label}[^<]*</strong>[\\s\\S]*?</div>`,
        "i",
      ),
    )?.[0];
    if (!block) return "";
    const text = stripHtml(block)
      .replace(new RegExp(`^${label}\\s*:?\\s*`, "i"), "")
      .replace(/^[:\s]+/, "")
      .trim();
    return text;
  };

  return {
    execution: pick("Execution"),
    clientName: pick("Client Name"),
    projectArea: pick("Project Area"),
    status: pick("Status"),
    technologies: pick("Technologies"),
  };
}

/** Pull CMS narrative HTML starting at the first heading (keeps Tailwind classes). */
export function extractProjectDetailsHtml(html: string | undefined) {
  if (!html?.trim()) return "";
  const source = html.trim();
  const headingIdx = source.search(/<h[23][\s>]/i);
  let body = headingIdx >= 0 ? source.slice(headingIdx) : source;
  body = body.replace(/(?:<\/div>\s*)+$/i, "").trim();
  return body;
}

function overviewKeyPoints(meta: ReturnType<typeof parseProjectMeta>) {
  return [
    meta.projectArea,
    meta.technologies,
    meta.status,
    meta.execution,
  ].filter(Boolean);
}

function buildCredits(fields: ProjectFields): ProjectCredit[] {
  const credits: ProjectCredit[] = [];

  if (fields.project_manager_name && fields.project_manager?.url) {
    credits.push({
      role: "Project Manager",
      name: fields.project_manager_name,
      avatar: fields.project_manager.url,
    });
  }
  if (fields.product_designer_name && fields.product_designer?.url) {
    credits.push({
      role: "Product Designer",
      name: fields.product_designer_name,
      avatar: fields.product_designer.url,
    });
  }
  if (fields.front_end_developer_name && fields.front_end_developer?.url) {
    credits.push({
      role: "Developer (Front-End)",
      name: fields.front_end_developer_name,
      avatar: fields.front_end_developer.url,
    });
  }

  const backendNames = [
    fields.back_end_developer,
    fields.back_end_developer_2,
  ].filter(Boolean) as string[];
  const backendAvatars = fields.back_end_developers ?? [];

  backendNames.forEach((name, index) => {
    const avatar = backendAvatars[index]?.url;
    if (!avatar) return;
    credits.push({
      role: "Developer (Back-End)",
      name,
      avatar,
    });
  });

  return credits;
}

function heroImages(fields: ProjectFields): [string, string, string] {
  const urls = (fields.images ?? [])
    .map((image) => image.url)
    .filter(Boolean);
  const fallback = fields.thumbimage?.url ?? "/h1.webp";
  return [
    urls[0] ?? fallback,
    urls[1] ?? urls[0] ?? fallback,
    urls[2] ?? urls[1] ?? urls[0] ?? fallback,
  ];
}

export function mapPostsToCaseItems(
  posts: ProjectPost[] | undefined,
): CaseProjectItem[] {
  const items: CaseProjectItem[] = [];

  sortedPosts(posts).forEach((post) => {
    const fields = post.fields ?? {};
    const slug = getProjectSlug(fields);
    if (!slug) return;

    const meta = parseProjectMeta(fields.short_details);
    const thumb =
      fields.thumbimage?.url ?? fields.images?.[0]?.url ?? "";
    if (!thumb) return;

    const authorName = fields.client_name?.trim() ?? "";
    const authorRole = fields.designation?.trim() ?? "";
    const index = items.length;

    items.push({
      number: `(${String(index + 1).padStart(2, "0")})`,
      tags: meta.projectArea ? [meta.projectArea] : undefined,
      title: caseTitle(fields),
      description: stripHtml(fields.overview),
      platforms: parsePlatforms(fields.platform),
      color:
        PROJECT_CASE_COLORS[slug] ??
        CASE_COLOR_FALLBACK[index % CASE_COLOR_FALLBACK.length],
      href: `/projects/${slug}`,
      quote: stripHtml(fields.testimonial) || undefined,
      author: authorName
        ? {
            name: authorName,
            role: authorRole.replace(/,\s*/g, " • "),
            image: "",
          }
        : undefined,
      images: [thumb],
    });
  });

  return items;
}

export function mapPostsToGridItems(
  posts: ProjectPost[] | undefined,
): ProjectsGridItem[] {
  const items: ProjectsGridItem[] = [];

  sortedPosts(posts).forEach((post) => {
    const fields = post.fields ?? {};
    const slug = getProjectSlug(fields);
    const src = fields.thumbimage?.url ?? "";
    if (!slug || !src) return;

    const meta = parseProjectMeta(fields.short_details);
    const title = fields.title?.trim() || caseTitle(fields);

    items.push({
      id: String(post.id),
      slug,
      title,
      src,
      alt: fields.thumbimage?.alt_text || fields.thumbimage?.name || title,
      w: 1300,
      h: 600,
      description: stripHtml(fields.overview),
      keyPoints: overviewKeyPoints(meta),
    });
  });

  return items;
}

function relatedFromPosts(
  posts: ProjectPost[],
  currentSlug: string,
): RelatedProject[] {
  const others = posts.filter(
    (post) => getProjectSlug(post.fields) !== currentSlug,
  );
  return others.slice(0, 3).map((post) => {
    const fields = post.fields ?? {};
    const slug = getProjectSlug(fields);
    return {
      slug,
      title: fields.title?.trim() || caseTitle(fields),
      description: stripHtml(fields.overview),
      image: fields.thumbimage?.url ?? fields.images?.[0]?.url ?? "/h1.webp",
      variant: "image" as const,
    };
  });
}

function nextSlugFromPosts(posts: ProjectPost[], currentSlug: string) {
  const index = posts.findIndex(
    (post) => getProjectSlug(post.fields) === currentSlug,
  );
  if (index < 0) return posts[0] ? getProjectSlug(posts[0].fields) : "";
  const next = posts[(index + 1) % posts.length];
  return getProjectSlug(next?.fields) || currentSlug;
}

export function mapPostToProjectDetail(
  post: ProjectPost,
  allPosts: ProjectPost[],
): ProjectDetail | null {
  const fields = post.fields ?? {};
  const slug = getProjectSlug(fields);
  if (!slug) return null;

  const meta = parseProjectMeta(fields.short_details);
  const detailsHtml = extractProjectDetailsHtml(fields.project_details);
  const overviewText = stripHtml(fields.overview);
  const credits = buildCredits(fields);

  return {
    slug,
    title: caseTitle(fields) || fields.title?.trim() || "Project",
    heroImages: heroImages(fields),
    meta: {
      execution: meta.execution,
      clientName: meta.clientName || fields.title?.trim() || "",
      projectArea: meta.projectArea,
      status: meta.status,
      technologies: meta.technologies,
    },
    about: {
      eyebrow: "About Project",
      headline: fields.subtitle?.trim() || fields.title?.trim() || "Project",
      body: overviewText,
    },
    clientVoice: stripHtml(fields.client_voice),
    mockupImage: fields.thumbimage?.url ?? heroImages(fields)[0],
    problem: "",
    solution: "",
    detailsHtml,
    credits,
    testimonial: {
      quote: stripHtml(fields.testimonial),
      name: fields.client_name?.trim() || "Client",
      role: fields.designation?.trim() || "",
      avatar: "/h1.webp",
      rating: Math.max(1, Math.min(5, Number(fields.rating) || 5)),
    },
    ctaBody:
      "We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.",
    related: relatedFromPosts(allPosts, slug),
    nextSlug: nextSlugFromPosts(allPosts, slug) || DEFAULT_PROJECT_SLUG,
  };
}

export function findProjectPost(
  posts: ProjectPost[] | undefined,
  slug: string,
) {
  const resolved = resolveProjectSlug(slug);
  return sortedPosts(posts).find(
    (post) => getProjectSlug(post.fields) === resolved,
  );
}

export async function fetchProjectsResponse(): Promise<ProjectsResponse | null> {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) return null;

  try {
    const res = await fetch(`${base}/post-types/projects`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ProjectsResponse;
  } catch {
    return null;
  }
}

export { PROJECT_DETAILS_UI };
