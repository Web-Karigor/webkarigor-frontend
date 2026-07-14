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

export const metadata: Metadata = {
  title: "ERP Services — Webkarigor",
  description:
    "Custom ERP solutions for inventory, finance, HR, and operations — built by Webkarigor to streamline your business.",
};

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
