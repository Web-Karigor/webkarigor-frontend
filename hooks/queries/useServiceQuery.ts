import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { retryTransientQueryError } from "@/lib/query-retry";
import type { ServiceDetailResponse } from "@/types/service";

export function useServiceQuery(slug: string) {
  return useQuery<ServiceDetailResponse, Error>({
    queryKey: ["service", slug],
    queryFn: () => apiFetch<ServiceDetailResponse>(`/service/${slug}`),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: retryTransientQueryError,
  });
}
