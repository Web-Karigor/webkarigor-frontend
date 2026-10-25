import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HomePageResponse } from "@/types/home-page";

export function useHomePageQuery() {
  return useQuery<HomePageResponse, Error>({
    queryKey: ["home-page"],
    queryFn: () => apiFetch<HomePageResponse>(`/pages/home`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
