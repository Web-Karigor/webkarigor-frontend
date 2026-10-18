"use client";

import ServiceCollageTeam from "@/components/services/ServiceCollageTeam";
import { useCrmPageQuery } from "@/hooks/queries/useCrmPageQuery";
import { crmSectionItem, mapCrmTeamPhotos } from "@/lib/crm-page";

export default function TeamSection() {
  const { data } = useCrmPageQuery();
  const item = crmSectionItem(data?.data?.sections?.team);

  const leftTitle = item?.title_left_top?.trim() ?? "";
  const rightTitle = item?.tittle_right_down?.trim() ?? "";
  const photos = mapCrmTeamPhotos(item?.images);

  if (!leftTitle || !rightTitle || !photos) return null;

  return (
    <ServiceCollageTeam
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      photos={photos}
      leftWidth={480}
      rightWidth={520}
    />
  );
}
