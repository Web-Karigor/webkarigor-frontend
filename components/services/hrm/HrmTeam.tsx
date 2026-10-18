"use client";

import ServiceCollageTeam from "@/components/services/ServiceCollageTeam";
import { useHrmPageQuery } from "@/hooks/queries/useHrmPageQuery";
import { hrmSectionItem, mapHrmTeamPhotos } from "@/lib/hrm-page";

export default function HrmTeam() {
  const { data } = useHrmPageQuery();
  const item = hrmSectionItem(data?.data?.sections?.team);

  const leftTitle = item?.title_left_top?.trim() ?? "";
  const rightTitle = item?.tittle_right_down?.trim() ?? "";
  const photos = mapHrmTeamPhotos(item?.images);

  if (!leftTitle || !rightTitle || !photos) return null;

  return (
    <ServiceCollageTeam
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      photos={photos}
      rightWidth={880}
    />
  );
}
