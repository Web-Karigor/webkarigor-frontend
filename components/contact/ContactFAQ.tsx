"use client";

import { useMemo } from "react";
import ApiFAQ from "@/components/faq/ApiFAQ";
import { useContactPageQuery } from "@/hooks/queries/useContactPageQuery";
import { useFaqContactQuery } from "@/hooks/queries/useFaqContactQuery";
import {
  contactSectionItem,
  splitContactFaqTitle,
} from "@/lib/contact-page";

/** Badge chrome — not provided by pages/contact-us faq item. */
const BADGE = "Frequently Ask Questions";

export default function ContactFAQ({
  className = "bg-[#FFFEFB]",
}: {
  className?: string;
}) {
  const { data: pageData } = useContactPageQuery();
  const { data } = useFaqContactQuery();
  const heading = contactSectionItem(pageData?.data?.sections?.faq);

  const chrome = useMemo(() => {
    const title = heading?.title?.trim() ?? "";
    const { accent, title: headingTitle } = splitContactFaqTitle(title);
    const ctaText = heading?.subtitle?.trim() ?? "";
    const ctaLabel = heading?.cta_contact?.trim() ?? "";

    if (!accent || !headingTitle || !ctaText || !ctaLabel) return null;

    return {
      badge: BADGE,
      headingAccent: accent,
      headingTitle,
      ctaText,
      ctaLabel,
    };
  }, [heading]);

  if (!chrome) return null;

  return <ApiFAQ className={className} chrome={chrome} data={data} />;
}
