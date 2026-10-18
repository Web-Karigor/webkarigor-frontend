"use client";

import ApiFAQ from "@/components/faq/ApiFAQ";
import { useFaqContactQuery } from "@/hooks/queries/useFaqContactQuery";

const CHROME = {
  badge: "Frequently Ask Questions",
  headingAccent: "Questions",
  headingTitle: "Answered?",
  ctaText: "Still curious? We're happy to help",
  ctaLabel: "Let's talk",
} as const;

export default function ContactFAQ({
  className = "bg-[#FFFEFB]",
}: {
  className?: string;
}) {
  const { data } = useFaqContactQuery();
  return <ApiFAQ className={className} chrome={CHROME} data={data} />;
}
