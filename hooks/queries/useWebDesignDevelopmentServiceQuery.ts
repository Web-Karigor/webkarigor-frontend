import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { WebDesignServiceResponse } from "@/types/web-design-development-service";

export function useWebDesignDevelopmentServiceQuery() {
  return useQuery<WebDesignServiceResponse, Error>({
    queryKey: ["web-design-development-service"],
    queryFn: () =>
      apiFetch<WebDesignServiceResponse>(
        `/post-types/web-design-development-service`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
