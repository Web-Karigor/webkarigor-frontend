import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqHomeResponse } from "@/types/faq-home";

export function useFaqHomeQuery() {
  return useQuery<FaqHomeResponse, Error>({
    queryKey: ["faq-home"],
    queryFn: () =>
      apiFetch<FaqHomeResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/faq-home`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
