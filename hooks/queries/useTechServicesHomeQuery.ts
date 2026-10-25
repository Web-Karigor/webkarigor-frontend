import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { TechServicesHomeResponse } from "@/types/tech-services-home";

export function useTechServicesHomeQuery() {
  return useQuery<TechServicesHomeResponse, Error>({
    queryKey: ["tech-services-home"],
    queryFn: () =>
      apiFetch<TechServicesHomeResponse>(`/post-types/tech-services-home`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
