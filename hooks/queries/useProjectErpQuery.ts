import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ProjectErpResponse } from "@/types/project-erp";

export function useProjectErpQuery() {
  return useQuery<ProjectErpResponse, Error>({
    queryKey: ["project-erp"],
    queryFn: () =>
      apiFetch<ProjectErpResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/project-erp`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
