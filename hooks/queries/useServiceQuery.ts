import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ServiceDetailResponse } from "@/types/service";

export function useServiceQuery(slug: string) {
  return useQuery<ServiceDetailResponse, Error>({
    queryKey: ["service", slug],
    queryFn: () =>
      apiFetch<ServiceDetailResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/service/${slug}`,
      ),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
