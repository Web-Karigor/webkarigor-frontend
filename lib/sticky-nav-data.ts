import {
  PROJECT_CARD_SLUGS,
  PROJECT_ITEMS,
} from "@/lib/projects-data";

export const STICKY_NAV_SERVICES = [
  {
    href: "/service",
    title: "Service",
    desc: "Full-stack product design & development.",
  },
  {
    href: "/service/ecommerce",
    title: "E-commerce",
    desc: "Stores built to convert and scale.",
  },
  {
    href: "/service/erp",
    title: "ERP",
    desc: "Custom systems for operations.",
  },
  {
    href: "/service/manpower",
    title: "Manpower",
    desc: "Specialist talent for your team.",
  },
] as const;

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

export const STICKY_NAV_MORE_LINKS = [
  { href: "/", title: "Home", desc: "Back to Webkarigor home" },
  { href: "/about-us", title: "About us", desc: "Who we are and how we work" },
  { href: "/projects", title: "All Projects", desc: "Browse the full portfolio" },
  { href: "/contact-us", title: "Contact us", desc: "Say hello — we reply fast" },
] as const;
