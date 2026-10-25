import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqErpResponse } from "@/types/faq-erp";

export function useFaqErpQuery() {
  return useQuery<FaqErpResponse, Error>({
    queryKey: ["faq-erp"],
    queryFn: () => apiFetch<FaqErpResponse>(`/post-types/faq-erp`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
