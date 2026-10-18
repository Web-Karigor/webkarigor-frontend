"use client";

import ServiceCollageTeam from "@/components/services/ServiceCollageTeam";
import { useSoftwareDevelopmentPageQuery } from "@/hooks/queries/useSoftwareDevelopmentPageQuery";
import {
  mapSdTeamPhotos,
  sdSectionItem,
} from "@/lib/software-development-page";

export default function Team() {
  const { data } = useSoftwareDevelopmentPageQuery();
  const item = sdSectionItem(data?.data?.sections?.team);

  const leftTitle = item?.title_left_top?.trim() ?? "";
  const rightTitle = item?.tittle_right_down?.trim() ?? "";
  const photos = mapSdTeamPhotos(item?.images);

  if (!leftTitle || !rightTitle || !photos) return null;

  return (
    <ServiceCollageTeam
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      photos={photos}
      leftWidth={780}
      rightWidth={720}
    />
  );
}
