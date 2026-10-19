import type { HomepagePackage } from "@/types/homepage-package";
import type { PricingPost } from "@/types/pricing-posts";

function listItems(html: string) {
  return [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) =>
      match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function amount(value?: number | string | null) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? String(Math.round(n)) : "";
}

export function mapPricingPosts(posts: PricingPost[] | undefined): HomepagePackage[] {
  return [...(posts ?? [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const title = post.fields?.title?.trim() || "";
      const subtitle = post.fields?.subtitle?.trim() || "";
      return {
        id: post.id,
        title: subtitle,
        subtitle,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || String(post.id),
        features: listItems(post.fields?.description ?? ""),
        price: amount(post.fields?.price),
        discounted_price: amount(post.fields?.discount_price),
        is_popular: post.fields?.popular?.trim().toLowerCase() === "yes",
        show_homepage: true,
        package_type: title
          ? { id: post.id, name: title, slug: title.toLowerCase() }
          : null,
      };
    })
    .filter((pkg) => pkg.package_type?.name || pkg.title || pkg.features.length);
}
