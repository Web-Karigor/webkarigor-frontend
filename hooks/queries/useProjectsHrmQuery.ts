import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ProjectsHrmResponse } from "@/types/projects-hrm";

export function useProjectsHrmQuery() {
  return useQuery<ProjectsHrmResponse, Error>({
    queryKey: ["projects-hrm"],
    queryFn: () =>
      apiFetch<ProjectsHrmResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/projects-hrm`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
