import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { SpecializedServicesResponse } from "@/types/specialized-services";

export function useSpecializedServicesQuery() {
  return useQuery<SpecializedServicesResponse, Error>({
    queryKey: ["specialized-services"],
    queryFn: () =>
      apiFetch<SpecializedServicesResponse>(`/post-types/specialized-services`),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
