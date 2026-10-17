"use client";

import { useMemo } from "react";
import ServiceProjectsCarousel from "@/components/services/ServiceProjectsCarousel";
import { useProjectErpQuery } from "@/hooks/queries/useProjectErpQuery";

export default function ErpPortfolio() {
  const { data } = useProjectErpQuery();
  const cards = useMemo(
    () =>
      [...(data?.data?.posts ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((post) => ({
          id: post.fields?.id?.trim() || String(post.id),
          title: post.fields?.title?.trim() ?? "",
          image: post.fields?.image?.url ?? "",
        }))
        .filter((item) => item.image && item.title),
    [data],
  );

  return <ServiceProjectsCarousel title="Our Projects" cards={cards} />;
}
