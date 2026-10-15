import { stripHtml } from "@/lib/home-page";
import type { Service } from "@/types/service";
import type { ServicePost, StoryService } from "@/types/service-posts";

function resolveServiceLink(
  title: string,
  navServices: Service[],
): string {
  if (!navServices.length) return "";

  const t = title.toLowerCase();
  const find = (test: (s: Service) => boolean) =>
    navServices.find(test)?.slug;

  let slug: string | undefined;
  if (/\bcrm\b/.test(t)) {
    slug = find((s) => /crm/i.test(s.slug) || /crm/i.test(s.title));
  } else if (/\bhrm\b/.test(t)) {
    slug = find((s) => /hrm/i.test(s.slug) || /hrm/i.test(s.title));
  } else if (/\berp\b/.test(t)) {
    slug = find((s) => /erp/i.test(s.slug) || /erp/i.test(s.title));
  } else if (/website|web\s*design/.test(t)) {
    slug = find(
      (s) => /website|web/.test(s.slug) || /website|web/.test(s.title),
    );
  } else if (/custom|software/.test(t)) {
    slug = find(
      (s) => /software/.test(s.slug) || /software/.test(s.title),
    );
  }

  return slug ? `/service/${slug}` : "";
}

export function mapServicePostsToStory(
  posts: ServicePost[] | undefined,
  navServices: Service[] | undefined,
): StoryService[] {
  const nav = navServices ?? [];

  return [...(posts ?? [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const fields = post.fields;
      const title = fields?.title?.trim() ?? "";
      const primary = fields?.images?.[0]?.url ?? "";
      const secondary = fields?.images?.[1]?.url ?? primary;

      return {
        id: post.id,
        title,
        highlight: "",
        subtitle: fields?.subtitle?.trim() ?? "",
        desc: fields?.content ? stripHtml(fields.content) : "",
        link: title ? resolveServiceLink(title, nav) : "",
        images: [primary, secondary] as [string, string],
      };
    })
    .filter((item) => item.title && item.images[0]);
}
