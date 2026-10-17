"use client";

import { useMemo } from "react";
import ServiceProjectsCarousel from "@/components/services/ServiceProjectsCarousel";
import { useProjectSoftwareDevelopementQuery } from "@/hooks/queries/useProjectSoftwareDevelopementQuery";

export default function Portfolio() {
  const { data } = useProjectSoftwareDevelopementQuery();
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

  return (
    <ServiceProjectsCarousel
      title="Our Projects"
      cards={cards}
      maxWidthClassName="max-w-[1800px]"
      paddingClassName="px-[clamp(16px,3.5vw,50px)]"
      bleedVarName="--mp-bleed"
    />
  );
}
