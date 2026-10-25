import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { PricingPageResponse } from "@/types/pricing-page";

export function usePricingPageQuery(enabled = true) {
  return useQuery<PricingPageResponse, Error>({
    queryKey: ["cms-page", "pricing"],
    queryFn: () => apiFetch<PricingPageResponse>(`/pages/pricing`),
    enabled,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
