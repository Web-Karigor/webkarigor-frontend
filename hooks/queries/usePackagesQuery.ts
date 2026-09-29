import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HomepagePackagesResponse } from "@/types/homepage-package";

export function usePackagesQuery(enabled = true) {
  return useQuery<HomepagePackagesResponse, Error>({
    queryKey: ["packages"],
    queryFn: () =>
      apiFetch<HomepagePackagesResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/packages`,
      ),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
