import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { TeamsResponse } from "@/types/teams";

export function useTeamsQuery() {
  return useQuery<TeamsResponse, Error>({
    queryKey: ["teams"],
    queryFn: () =>
      apiFetch<TeamsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/teams`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
