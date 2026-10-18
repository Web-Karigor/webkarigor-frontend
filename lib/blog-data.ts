import type { Blog, BlogPost } from "@/types/blog";

export const BLOG_PAGE = {
  eyebrow: "Beyond the Interface",
  titleLead: "Perspectives on Design,",
  titleRest: "Technology & Growth",
  description:
    "Essays on design, technology, and the decisions that shape how products grow.",
};

const BLOG_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatBlogDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const parts = BLOG_DATE_FORMAT.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("day")} ${part("month")}, ${part("year")}`;
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function mapPostsToBlogs(posts: BlogPost[] | undefined | null): Blog[] {
  if (!posts?.length) return [];

  return [...posts]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const fields = post.fields ?? ({} as BlogPost["fields"]);
      const title = fields.title?.trim() ?? "";
      const slug = fields.slug?.trim() ?? "";
      const image = fields.thumb_image?.url?.trim() ?? "";

      if (!title || !slug || !image) return null;

      return {
        id: post.id,
        title,
        slug,
        author: fields.author?.trim() || "Web Karigor",
        published_at: fields.published_date?.trim() || "",
        subtitle: fields.subtitle?.trim() || "",
        details: fields.details?.trim() || "",
        image,
      } satisfies Blog;
    })
    .filter((item): item is Blog => item !== null);
}

export function findBlogBySlug(
  posts: BlogPost[] | undefined | null,
  slug: string,
): Blog | undefined {
  return mapPostsToBlogs(posts).find((post) => post.slug === slug);
}
