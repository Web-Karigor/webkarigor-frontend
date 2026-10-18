import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { findBlogBySlug } from "@/lib/blog-data";
import type { Blog, BlogPostsResponse } from "@/types/blog";

export function useBlogQuery(slug: string) {
  return useQuery<BlogPostsResponse, Error, Blog | null>({
    queryKey: ["blogs"],
    queryFn: () =>
      apiFetch<BlogPostsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/blog`,
      ),
    select: (res) => findBlogBySlug(res.data?.posts, slug) ?? null,
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
