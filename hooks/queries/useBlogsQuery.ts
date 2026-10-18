import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { BlogPostsResponse } from "@/types/blog";

export function useBlogsQuery() {
  return useQuery<BlogPostsResponse, Error>({
    queryKey: ["blogs"],
    queryFn: () =>
      apiFetch<BlogPostsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/blog`,
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
