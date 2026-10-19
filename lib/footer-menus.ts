import type { FooterMenuPost } from "@/types/footer-menus";

export type FooterLink = {
  id: number;
  label: string;
  href: string;
};

export type FooterSocialLink = FooterLink & {
  key: string;
  icon: string;
};

function normalizeHref(href: string) {
  if (href === "/services/website-design-development") {
    return "/service/website-design-development";
  }
  return href;
}

function sorted(posts: FooterMenuPost[] | undefined | null) {
  if (!posts?.length) return [];
  return [...posts].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function mapFooterLinks(
  posts: FooterMenuPost[] | undefined | null,
): FooterLink[] {
  return sorted(posts)
    .map((post) => {
      const label = post.fields?.label?.trim() ?? "";
      if (!label) return null;
      return {
        id: post.id,
        label,
        href: normalizeHref(post.fields?.href?.trim() || "#"),
      };
    })
    .filter((item): item is FooterLink => item !== null);
}

export function mapFooterSocialLinks(
  posts: FooterMenuPost[] | undefined | null,
): FooterSocialLink[] {
  return sorted(posts)
    .map((post) => {
      const label = post.fields?.label?.trim() ?? "";
      if (!label) return null;
      return {
        id: post.id,
        key: post.fields?.id?.trim().toLowerCase() ?? "",
        label,
        href: normalizeHref(post.fields?.href?.trim() || "#"),
        icon: post.fields?.icon?.url?.trim() ?? "",
      };
    })
    .filter((item): item is FooterSocialLink => item !== null);
}
