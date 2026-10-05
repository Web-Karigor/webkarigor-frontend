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
  { href: "/blog", title: "Blog", desc: "Perspectives on design and growth" },
  { href: "/team", title: "Team", desc: "Meet the people behind the work" },
  { href: "/contact-us", title: "Contact us", desc: "Say hello — we reply fast" },
] as const;
