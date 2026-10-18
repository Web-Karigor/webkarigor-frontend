"use client";

import Offerings from "@/components/home/Offerings";
import { useCrmPageQuery } from "@/hooks/queries/useCrmPageQuery";
import { crmSectionItem, extractCrmText } from "@/lib/crm-page";

export default function CrmOfferings() {
  const { data } = useCrmPageQuery();
  const item = crmSectionItem(data?.data?.sections?.industries);

  const eyebrow = item?.title?.trim() ?? "";
  const title = item?.subtitle?.trim() ?? "";
  const description = extractCrmText(item?.content ?? "");

  if (!eyebrow || !title || !description) return null;

  return (
    <Offerings eyebrow={eyebrow} title={title} description={description} />
  );
}
