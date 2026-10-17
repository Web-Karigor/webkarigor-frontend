"use client";

import ServiceProjectsCarousel from "@/components/services/ServiceProjectsCarousel";
import { WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS } from "@/lib/website-design-development-data";

export default function Portfolio() {
  return (
    <ServiceProjectsCarousel
      title="Our Projects"
      cards={WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      }))}
    />
  );
}
