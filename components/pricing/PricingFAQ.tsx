"use client";

import ApiFAQ from "@/components/faq/ApiFAQ";
import { useFaqPricingQuery } from "@/hooks/queries/useFaqPricingQuery";

const CHROME = {
  badge: "Frequently Ask Questions",
  headingAccent: "Questions",
  headingTitle: "Answered?",
  ctaText: "Still curious? We're happy to help",
  ctaLabel: "Let's talk",
} as const;

export default function PricingFAQ({
  className = "bg-[#FFFDF6]",
}: {
  className?: string;
}) {
  const { data } = useFaqPricingQuery();
  return <ApiFAQ className={className} chrome={CHROME} data={data} />;
}
