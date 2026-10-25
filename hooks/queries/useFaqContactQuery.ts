import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqPostsResponse } from "@/types/faq-posts";

export function useFaqContactQuery() {
  return useQuery<FaqPostsResponse, Error>({
    queryKey: ["faq-contact"],
    queryFn: () => apiFetch<FaqPostsResponse>(`/post-types/faq-contact`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
