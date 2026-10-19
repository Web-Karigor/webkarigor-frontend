import type { TechServicesPost } from "@/types/tech-services-home";

export type TechServicesVariant = "mobile" | "web" | "tab";

export type TechServicesCard = {
  id: number;
  src: string;
  alt: string;
  category: string;
  variant: TechServicesVariant;
};

function readVariant(post: TechServicesPost): TechServicesVariant {
  const raw = (post.fields?.variant ?? post.fields?.varient ?? "web")
    .trim()
    .toLowerCase();
  if (raw === "mobile" || raw === "tab") return raw;
  return "web";
}

export function mapTechServicesPosts(
  posts: TechServicesPost[] | undefined | null,
): TechServicesCard[] {
  if (!posts?.length) return [];

  return [...posts]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const media = post.fields?.src ?? post.fields?.image;
      const src = media?.url?.trim() ?? "";
      if (!src) return null;
      return {
        id: post.id,
        src,
        alt: media?.alt_text?.trim() || media?.name?.trim() || "",
        category: post.fields?.category?.trim() ?? "",
        variant: readVariant(post),
      };
    })
    .filter((item): item is TechServicesCard => item !== null);
}
