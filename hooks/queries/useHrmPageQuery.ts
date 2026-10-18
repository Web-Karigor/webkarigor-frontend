import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HrmPageResponse } from "@/types/hrm-page";

export function useHrmPageQuery() {
  return useQuery<HrmPageResponse, Error>({
    queryKey: ["hrm-page"],
    queryFn: () =>
      apiFetch<HrmPageResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/pages/hrm`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
