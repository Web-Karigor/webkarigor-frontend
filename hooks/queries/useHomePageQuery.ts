import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HomePageResponse } from "@/types/home-page";

export function useHomePageQuery(enabled = true) {
  return useQuery<HomePageResponse, Error>({
    queryKey: ["page", "home"],
    queryFn: () => apiFetch<HomePageResponse>(`/pages/home`),
    enabled,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
