import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqHrmResponse } from "@/types/faq-hrm";

export function useFaqHrmQuery() {
  return useQuery<FaqHrmResponse, Error>({
    queryKey: ["faq-hrm"],
    queryFn: () =>
      apiFetch<FaqHrmResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/faq-hrm`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
