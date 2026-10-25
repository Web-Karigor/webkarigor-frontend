import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ContactPageResponse } from "@/types/contact-page";

export function useContactPageQuery() {
  return useQuery<ContactPageResponse, Error>({
    queryKey: ["contact-page"],
    queryFn: () => apiFetch<ContactPageResponse>(`/pages/contact-us`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
