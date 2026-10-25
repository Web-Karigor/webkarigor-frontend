import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { TechnologiesResponse } from "@/types/technologies";

export function useTechnologiesQuery() {
  return useQuery<TechnologiesResponse, Error>({
    queryKey: ["technologies"],
    queryFn: () => apiFetch<TechnologiesResponse>(`/post-types/technologies`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
