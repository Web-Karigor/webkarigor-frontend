import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { AllProjectsPageResponse } from "@/types/all-projects-page";

export function useAllProjectsPageQuery() {
  return useQuery<AllProjectsPageResponse, Error>({
    queryKey: ["cms-page", "all-projects"],
    queryFn: () =>
      apiFetch<AllProjectsPageResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/pages/all-projects`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
