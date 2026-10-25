import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqPostsResponse } from "@/types/faq-posts";

export function useFaqPricingQuery() {
  return useQuery<FaqPostsResponse, Error>({
    queryKey: ["faq-pricing"],
    queryFn: () => apiFetch<FaqPostsResponse>(`/post-types/faq-pricing`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
