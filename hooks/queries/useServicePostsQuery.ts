import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ServicePostsResponse } from "@/types/service-posts";

export function useServicePostsQuery() {
  return useQuery<ServicePostsResponse, Error>({
    queryKey: ["service-posts"],
    queryFn: () => apiFetch<ServicePostsResponse>(`/post-types/service`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
