import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { AboutPageResponse } from "@/types/about-page";

export function useAboutPageQuery(enabled = true) {
  return useQuery<AboutPageResponse, Error>({
    queryKey: ["cms-page", "abouts-us"],
    queryFn: () =>
      apiFetch<AboutPageResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/pages/abouts-us`,
      ),
    enabled,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
