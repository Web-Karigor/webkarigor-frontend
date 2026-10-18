import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { ContactUsSuccessStoriesResponse } from "@/types/contact-us-success-stories";

export function useContactUsSuccessStoriesQuery() {
  return useQuery<ContactUsSuccessStoriesResponse, Error>({
    queryKey: ["contact-us-success-stories"],
    queryFn: () =>
      apiFetch<ContactUsSuccessStoriesResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/contact-us-success-stories`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
