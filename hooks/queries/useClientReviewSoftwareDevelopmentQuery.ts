import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ClientReviewSoftwareDevelopmentResponse } from "@/types/client-review-software-development";

export function useClientReviewSoftwareDevelopmentQuery() {
  return useQuery<ClientReviewSoftwareDevelopmentResponse, Error>({
    queryKey: ["client-review-software-development"],
    queryFn: () =>
      apiFetch<ClientReviewSoftwareDevelopmentResponse>(
        `/post-types/client-review-software-development`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
