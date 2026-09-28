import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiFetch'
import { useMutation } from "@tanstack/react-query";


/* ------------ Settings ------------ */
export function useSettingsQuery() {
  type Settings = any;
  return useQuery<Settings, Error>({
    queryKey: ["settings"],
    queryFn: () => apiFetch<Settings>("/api/v2/business-settings"),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}