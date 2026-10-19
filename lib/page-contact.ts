/** CMS page slug for the route the visitor is on. */
export function pageSlugFromPath(pathname: string | null | undefined) {
  if (!pathname || pathname === "/") return "home";
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  const mapped: Record<string, string> = {
    "/contact-us": "contact-us",
    "/about-us": "abouts-us",
    "/projects": "all-projects",
    "/blog": "blog",
    "/team": "team",
    "/service/crm": "crm",
    "/service/erp": "erp",
    "/service/hrm": "hrm",
    "/service/software-development": "software-development",
    "/service/website-design-development": "web-design-development",
  };

  if (mapped[path]) return mapped[path];
  if (path.startsWith("/projects/")) return "all-projects";
  if (path.startsWith("/blog/")) return "blog";

  const last = path.split("/").filter(Boolean).pop();
  return last || "home";
}

export function whatsAppHref(label: string) {
  const digits = label.replace(/\D/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}
