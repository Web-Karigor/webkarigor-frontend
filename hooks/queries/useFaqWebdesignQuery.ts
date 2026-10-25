import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqWebdesignResponse } from "@/types/faq-webdesign";

export function useFaqWebdesignQuery() {
  return useQuery<FaqWebdesignResponse, Error>({
    queryKey: ["faq-webdesign"],
    queryFn: () => apiFetch<FaqWebdesignResponse>(`/post-types/faq-webdesign`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
