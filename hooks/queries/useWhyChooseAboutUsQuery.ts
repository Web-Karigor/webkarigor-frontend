import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { WhyChooseAboutUsResponse } from "@/types/why-choose-about-us";

export function useWhyChooseAboutUsQuery() {
  return useQuery<WhyChooseAboutUsResponse, Error>({
    queryKey: ["post-type", "why-choose-about-us"],
    queryFn: () =>
      apiFetch<WhyChooseAboutUsResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/why-choose-about-us`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
