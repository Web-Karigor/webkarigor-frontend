import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { SoftwareDevelopmentPageResponse } from "@/types/software-development-page";

export function useSoftwareDevelopmentPageQuery() {
  return useQuery<SoftwareDevelopmentPageResponse, Error>({
    queryKey: ["software-development-page"],
    queryFn: () =>
      apiFetch<SoftwareDevelopmentPageResponse>(`/pages/software-development`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
