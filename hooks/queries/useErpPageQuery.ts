import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ErpPageResponse } from "@/types/erp-page";

export function useErpPageQuery() {
  return useQuery<ErpPageResponse, Error>({
    queryKey: ["erp-page"],
    queryFn: () => apiFetch<ErpPageResponse>(`/pages/erp`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
