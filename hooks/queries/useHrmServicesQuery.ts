import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { HrmServicesResponse } from "@/types/hrm-services";

export function useHrmServicesQuery() {
  return useQuery<HrmServicesResponse, Error>({
    queryKey: ["hrm-services"],
    queryFn: () =>
      apiFetch<HrmServicesResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/hrm-services`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
