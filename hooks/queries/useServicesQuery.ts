import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ServicesResponse } from "@/types/service";

export function useServicesQuery() {
  return useQuery<ServicesResponse, Error>({
    queryKey: ["services"],
    queryFn: () => apiFetch<ServicesResponse>(`/services`),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
