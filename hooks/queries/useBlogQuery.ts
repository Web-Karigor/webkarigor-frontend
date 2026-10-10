import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { BlogDetailResponse } from "@/types/blog";

export function useBlogQuery(slug: string) {
  return useQuery<BlogDetailResponse, Error>({
    queryKey: ["blog", slug],
    queryFn: () =>
      apiFetch<BlogDetailResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/blogs/${encodeURIComponent(slug)}`,
      ),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
