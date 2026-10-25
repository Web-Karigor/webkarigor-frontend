import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ProjectsResponse } from "@/types/projects";

export function useProjectsQuery() {
  return useQuery<ProjectsResponse, Error>({
    queryKey: ["projects"],
    queryFn: () => apiFetch<ProjectsResponse>(`/post-types/projects`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
