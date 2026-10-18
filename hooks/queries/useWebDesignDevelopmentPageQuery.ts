import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { WebDesignDevelopmentPageResponse } from "@/types/web-design-development-page";

export function useWebDesignDevelopmentPageQuery() {
  return useQuery<WebDesignDevelopmentPageResponse, Error>({
    queryKey: ["web-design-development-page"],
    queryFn: () =>
      apiFetch<WebDesignDevelopmentPageResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/pages/web-design-development`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
