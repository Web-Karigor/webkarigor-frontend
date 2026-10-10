import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { BlogsResponse } from "@/types/blog";

export function useBlogsQuery() {
  return useQuery<BlogsResponse, Error>({
    queryKey: ["blogs"],
    queryFn: () =>
      apiFetch<BlogsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/blogs`,
      ),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
