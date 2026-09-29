import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HomepagePackagesResponse } from "@/types/homepage-package";

export function useHomepagePackagesQuery(enabled = true) {
  return useQuery<HomepagePackagesResponse, Error>({
    queryKey: ["homepage-packages"],
    queryFn: () =>
      apiFetch<HomepagePackagesResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/homepage-packages`,
      ),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
