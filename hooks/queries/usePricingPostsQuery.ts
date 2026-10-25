import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { PricingPostsResponse } from "@/types/pricing-posts";

export function usePricingPostsQuery(slug = "pricing", enabled = true) {
  return useQuery<PricingPostsResponse, Error>({
    queryKey: ["post-type", slug],
    queryFn: () => apiFetch<PricingPostsResponse>(`/post-types/${slug}`),
    enabled: enabled && Boolean(slug),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
