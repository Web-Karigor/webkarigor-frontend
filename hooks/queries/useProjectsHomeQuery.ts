import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ProjectsHomeResponse } from "@/types/projects-home";

export function useProjectsHomeQuery() {
  return useQuery<ProjectsHomeResponse, Error>({
    queryKey: ["projects-home"],
    queryFn: () => apiFetch<ProjectsHomeResponse>(`/post-types/projects-home`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
