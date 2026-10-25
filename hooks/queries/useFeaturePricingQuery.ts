import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FeaturePricingResponse } from "@/types/feature-pricing";

export function useFeaturePricingQuery() {
  return useQuery<FeaturePricingResponse, Error>({
    queryKey: ["post-type", "feature-pricing"],
    queryFn: () =>
      apiFetch<FeaturePricingResponse>(`/post-types/feature-pricing`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
