import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import type { FooterMenuResponse } from "@/types/footer-menus";

function useFooterMenuQuery(slug: string) {
  return useQuery<FooterMenuResponse, Error>({
    queryKey: ["post-type", slug],
    queryFn: () =>
      apiFetch<FooterMenuResponse>(
        `${typeof window !== "undefined" ? window.location.origin : ""}/api/post-types/${slug}`,
      ),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useSocialLinksQuery() {
  return useFooterMenuQuery("social-links");
}

export function useServicesMenuQuery() {
  return useFooterMenuQuery("services-menu");
}

export function useIndustriesMenuQuery() {
  return useFooterMenuQuery("industries-menu");
}

export function useImportantLinksQuery() {
  return useFooterMenuQuery("important-links");
}
