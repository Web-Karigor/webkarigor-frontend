import type { ProjectsHomePost } from "@/types/projects-home";

export type ProjectsHomeImage = {
  id: number;
  src: string;
  alt: string;
};

export function mapPostsToHomeSliderImages(
  posts: ProjectsHomePost[] | undefined | null,
): ProjectsHomeImage[] {
  if (!posts?.length) return [];

  return [...posts]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const src = post.fields?.image?.url?.trim() ?? "";
      if (!src) return null;
      return {
        id: post.id,
        src,
        alt: post.fields?.image?.alt_text?.trim() || post.fields?.image?.name?.trim() || "",
      };
    })
    .filter((item): item is ProjectsHomeImage => item !== null);
}
