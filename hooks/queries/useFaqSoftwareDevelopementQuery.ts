import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FaqSoftwareDevelopementResponse } from "@/types/faq-software-developement";

export function useFaqSoftwareDevelopementQuery() {
  return useQuery<FaqSoftwareDevelopementResponse, Error>({
    queryKey: ["faq-software-developement"],
    queryFn: () =>
      apiFetch<FaqSoftwareDevelopementResponse>(
        `/post-types/faq-software-developement`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
