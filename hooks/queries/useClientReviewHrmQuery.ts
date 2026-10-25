import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ClientReviewHrmResponse } from "@/types/client-review-hrm";

export function useClientReviewHrmQuery() {
  return useQuery<ClientReviewHrmResponse, Error>({
    queryKey: ["client-review-hrm"],
    queryFn: () =>
      apiFetch<ClientReviewHrmResponse>(`/post-types/client-review-hrm`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
