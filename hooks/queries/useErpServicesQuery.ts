import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ErpServicesResponse } from "@/types/erp-services";

export function useErpServicesQuery() {
  return useQuery<ErpServicesResponse, Error>({
    queryKey: ["erp-services"],
    queryFn: () => apiFetch<ErpServicesResponse>(`/post-types/erp-services`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
