import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { PricingPostsResponse } from "@/types/pricing-posts";

export function usePricingHomeQuery(enabled = true) {
  return useQuery<PricingPostsResponse, Error>({
    queryKey: ["post-type", "pricing-home"],
    queryFn: () =>
      apiFetch<PricingPostsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/pricing-home`,
      ),
    enabled,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
