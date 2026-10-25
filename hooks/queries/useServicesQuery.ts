import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { retryTransientQueryError } from "@/lib/query-retry";
import type { ServicesResponse } from "@/types/service";

export function useServicesQuery() {
  return useQuery<ServicesResponse, Error>({
    queryKey: ["services"],
    queryFn: () => apiFetch<ServicesResponse>(`/post-types/services-menu`),
    staleTime: 1000 * 60 * 60,
    retry: retryTransientQueryError,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
