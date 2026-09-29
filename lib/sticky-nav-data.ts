import {
  PROJECT_CARD_SLUGS,
  PROJECT_ITEMS,
} from "@/lib/projects-data";

function buildLatestProjects() {
  const seen = new Set<string>();
  const items: { href: string; title: string; desc: string }[] = [];

  for (const project of PROJECT_ITEMS) {
    const slug = PROJECT_CARD_SLUGS[project.id] ?? project.id;
    if (seen.has(slug)) continue;
    seen.add(slug);
    items.push({
      href: `/projects/${slug}`,
      title: project.title,
      desc: project.alt,
    });
    if (items.length >= 6) break;
  }

  return items;
}

export const STICKY_NAV_PROJECTS = buildLatestProjects();

export const SERVICE_NAV_DESC: Record<string, string> = {
  "website-design-development": "Custom websites for your business.",
  erp: "Custom systems for operations.",
  hrm: "Specialist talent for your team.",
  "software-development": "Specialist talent for your team.",
  crm: "Specialist talent for your team.",
};

export const STICKY_NAV_MORE_LINKS = [
  { href: "/about-us", title: "About us", desc: "Who we are and how we work" },
  { href: "/projects", title: "All Projects", desc: "Browse the full portfolio" },
  { href: "/team", title: "Team", desc: "Meet the people behind the work" },
  { href: "/contact-us", title: "Contact us", desc: "Say hello — we reply fast" },
] as const;
