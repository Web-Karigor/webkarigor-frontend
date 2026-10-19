import ecommerceContent from "@/data/ecommerce-content.json";
import erpContent from "@/data/erp-content.json";
import hrmContent from "@/data/hrm-content.json";
import softwareContent from "@/data/software-development-content.json";
import websiteContent from "@/data/website-design-development-content.json";

export type ServicePricingHeading = {
  badge: string;
  headingAccent: string;
  headingTitle: string;
  description: string;
};

function withSpace(text: string) {
  const trimmed = text.trim();
  return trimmed ? `${trimmed} ` : "";
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  return {
    headingAccent: withSpace(words[0] ?? ""),
    headingTitle: words.slice(1).join(" "),
  };
}

function fromEyebrow(block: {
  eyebrow?: string;
  title?: string;
  description?: string;
}): ServicePricingHeading {
  const split = splitTitle(block.title ?? "");
  return {
    badge: block.eyebrow?.trim() ?? "",
    headingAccent: split.headingAccent,
    headingTitle: split.headingTitle,
    description: block.description?.trim() ?? "",
  };
}

/** Headings the pricing post types do not send. */
export const SERVICE_PRICING_HEADINGS: Record<string, ServicePricingHeading> = {
  erp: fromEyebrow(erpContent.pricing),
  hrm: fromEyebrow(hrmContent.pricing),
  "software-development": fromEyebrow(softwareContent.pricing),
  "website-design-development": {
    badge: websiteContent.pricing.badge.trim(),
    headingAccent: withSpace(websiteContent.pricing.headingAccent),
    headingTitle: websiteContent.pricing.headingTitle.trim(),
    description: websiteContent.pricing.description.trim(),
  },
  ecommerce: fromEyebrow(ecommerceContent.pricing),
};
