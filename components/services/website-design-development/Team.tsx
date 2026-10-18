"use client";

import ServiceCollageTeam from "@/components/services/ServiceCollageTeam";
import { useWebDesignDevelopmentPageQuery } from "@/hooks/queries/useWebDesignDevelopmentPageQuery";
import {
  mapWddTeamPhotos,
  wddSectionItem,
} from "@/lib/web-design-development-page";

export default function Team() {
  const { data } = useWebDesignDevelopmentPageQuery();
  const item = wddSectionItem(data?.data?.sections?.team);

  const leftTitle = item?.title_left_top?.trim() ?? "";
  const rightTitle = item?.tittle_right_down?.trim() ?? "";
  const photos = mapWddTeamPhotos(item?.images);

  if (!leftTitle || !rightTitle || !photos) return null;

  return (
    <ServiceCollageTeam
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      photos={photos}
    />
  );
}
