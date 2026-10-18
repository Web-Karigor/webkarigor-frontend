"use client";

import ServiceCollageTeam from "@/components/services/ServiceCollageTeam";
import { useErpPageQuery } from "@/hooks/queries/useErpPageQuery";
import { erpSectionItem, mapErpTeamPhotos } from "@/lib/erp-page";

export default function ErpTeam() {
  const { data } = useErpPageQuery();
  const item = erpSectionItem(data?.data?.sections?.team);

  const leftTitle = item?.title_left_top?.trim() ?? "";
  const rightTitle = item?.tittle_right_down?.trim() ?? "";
  const photos = mapErpTeamPhotos(item?.images);

  if (!leftTitle || !rightTitle || !photos) return null;

  return (
    <ServiceCollageTeam
      leftTitle={leftTitle}
      rightTitle={rightTitle}
      photos={photos}
      rightWidth={560}
    />
  );
}
