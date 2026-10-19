"use client";

import { useMemo } from "react";
import ApiFAQ from "@/components/faq/ApiFAQ";
import { useFaqPricingQuery } from "@/hooks/queries/useFaqPricingQuery";
import { usePricingPageQuery } from "@/hooks/queries/usePricingPageQuery";
import { mapPricingFaq } from "@/lib/pricing-page";

export default function PricingFAQ({
  className = "bg-[#FFFDF6]",
}: {
  className?: string;
}) {
  const { data } = useFaqPricingQuery();
  const pricingPage = usePricingPageQuery();
  const chrome = useMemo(() => mapPricingFaq(pricingPage.data), [pricingPage.data]);
  return <ApiFAQ className={className} chrome={chrome} data={data} />;
}
