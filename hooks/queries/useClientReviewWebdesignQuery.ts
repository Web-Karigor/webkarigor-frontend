import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ClientReviewWebdesignResponse } from "@/types/client-review-webdesign";

export function useClientReviewWebdesignQuery() {
  return useQuery<ClientReviewWebdesignResponse, Error>({
    queryKey: ["client-review-webdesign"],
    queryFn: () =>
      apiFetch<ClientReviewWebdesignResponse>(
        `/post-types/client-review-webdesign`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
