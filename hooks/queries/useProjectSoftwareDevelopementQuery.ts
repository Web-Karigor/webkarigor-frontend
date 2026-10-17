import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ProjectSoftwareDevelopementResponse } from "@/types/project-software-developement";

export function useProjectSoftwareDevelopementQuery() {
  return useQuery<ProjectSoftwareDevelopementResponse, Error>({
    queryKey: ["project-software-developement"],
    queryFn: () =>
      apiFetch<ProjectSoftwareDevelopementResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/project-software-developement`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
