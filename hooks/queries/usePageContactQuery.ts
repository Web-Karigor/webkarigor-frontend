"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { apiFetch } from "@/lib/apiFetch";
import { homeSectionItem } from "@/lib/home-page";
import { pageSlugFromPath } from "@/lib/page-contact";
import type { ContactUsItem, HomeSection } from "@/types/home-page";

type PageContactResponse = {
  success: boolean;
  data?: {
    slug?: string;
    sections?: {
      contact_us?: HomeSection<ContactUsItem>;
    };
  };
};

function fetchPage(slug: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return apiFetch<PageContactResponse>(`${origin}/api/pages/${slug}`);
}

/** Contact block for the current page, with the home page block as fallback. */
export function usePageContactQuery() {
  const pathname = usePathname();
  const slug = pageSlugFromPath(pathname);
  const isHome = slug === "home";

  const page = useQuery<PageContactResponse, Error>({
    queryKey: ["page-contact", slug],
    queryFn: () => fetchPage(slug),
    enabled: !isHome,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const home = useQuery<PageContactResponse, Error>({
    queryKey: ["page-contact", "home"],
    queryFn: () => fetchPage("home"),
    enabled: isHome || page.isFetched,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const contact =
    homeSectionItem(isHome ? home.data?.data?.sections?.contact_us : page.data?.data?.sections?.contact_us) ??
    homeSectionItem(home.data?.data?.sections?.contact_us);

  return { contact, slug };
}
