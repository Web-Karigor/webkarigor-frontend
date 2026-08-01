import type { Metadata } from "next";
import ErpFAQ from "@/components/services/erp/ErpFAQ";
import ErpFeatures from "@/components/services/erp/ErpFeatures";
import ErpHero from "@/components/services/erp/ErpHero";
import ErpIntegrations from "@/components/services/erp/ErpIntegrations";
import ErpPortfolio from "@/components/services/erp/ErpPortfolio";
import ErpPricing from "@/components/services/erp/ErpPricing";
import ErpReviews from "@/components/services/erp/ErpReviews";
import ErpTeam from "@/components/services/erp/ErpTeam";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import { ERP_METADATA } from "@/lib/erp-data";

export const metadata: Metadata = ERP_METADATA;

export default function ErpServicePage() {
  return (
    <div className="bg-[#FFFEFB]">
      <ErpHero />
      <ErpFeatures />
      <ErpIntegrations />
      <ErpPortfolio />
      <ErpReviews />
      <ErpTeam />
      <ErpPricing />
      <ErpFAQ />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
