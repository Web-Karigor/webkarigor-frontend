import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { CrmPageResponse } from "@/types/crm-page";

export function useCrmPageQuery() {
  return useQuery<CrmPageResponse, Error>({
    queryKey: ["crm-page"],
    queryFn: () => apiFetch<CrmPageResponse>("/pages/crm"),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
