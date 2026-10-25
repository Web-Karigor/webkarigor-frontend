import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { retryTransientQueryError } from "@/lib/query-retry";
import type { HomepagePackagesResponse } from "@/types/homepage-package";

export function useHomepagePackagesQuery(enabled = true) {
  return useQuery<HomepagePackagesResponse, Error>({
    queryKey: ["homepage-packages"],
    queryFn: () => apiFetch<HomepagePackagesResponse>(`/homepage-packages`),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: retryTransientQueryError,
  });
}
