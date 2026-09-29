"use client";

import Offerings from "@/components/home/Offerings";
import servicesContent from "@/data/services-content.json";

const { eyebrow, title, description } = servicesContent.offerings;

export default function CrmOfferings() {
  return (
    <Offerings eyebrow={eyebrow} title={title} description={description} />
  );
}
