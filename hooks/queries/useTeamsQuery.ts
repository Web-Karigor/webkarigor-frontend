import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { TeamsResponse } from "@/types/teams";

export function useTeamsQuery() {
  return useQuery<TeamsResponse, Error>({
    queryKey: ["teams"],
    queryFn: async () => {
      const firstPage = await apiFetch<TeamsResponse>(
        "/post-types/teams?page=1",
      );
      const lastPage = firstPage.meta?.pagination?.last_page ?? 1;
      if (lastPage <= 1) return firstPage;

      const otherPages = await Promise.all(
        Array.from({ length: lastPage - 1 }, async (_, index) => {
          try {
            return await apiFetch<TeamsResponse>(
              `/post-types/teams?page=${index + 2}`,
            );
          } catch {
            return null;
          }
        }),
      );
      const posts = [
        ...(firstPage.data?.posts ?? []),
        ...otherPages.flatMap((page) => page?.data?.posts ?? []),
      ];

      return {
        ...firstPage,
        data: { ...firstPage.data, posts },
        meta: {
          ...firstPage.meta,
          pagination: {
            current_page: 1,
            per_page: posts.length,
            total: posts.length,
            last_page: 1,
            next_page_url: null,
            prev_page_url: null,
          },
        },
      };
    },
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
