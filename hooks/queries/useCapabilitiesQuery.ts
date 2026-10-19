import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { CapabilitiesResponse } from "@/types/capabilities";

export function useCapabilitiesQuery() {
  return useQuery<CapabilitiesResponse, Error>({
    queryKey: ["post-type", "capabilities"],
    queryFn: () =>
      apiFetch<CapabilitiesResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/capabilities`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
