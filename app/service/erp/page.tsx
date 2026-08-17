import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";
import ErpFeatures from "@/components/services/erp/ErpFeatures";
import ErpHero from "@/components/services/erp/ErpHero";
import ErpIntegrations from "@/components/services/erp/ErpIntegrations";
import ErpPortfolio from "@/components/services/erp/ErpPortfolio";
import ErpPricing from "@/components/services/erp/ErpPricing";
import ErpReviews from "@/components/services/erp/ErpReviews";
import ErpTeam from "@/components/services/erp/ErpTeam";
import HomeConsultation from "@/components/home/HomeConsultation";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import { ERP_METADATA } from "@/lib/erp-data";
import "@/styles/service-pages-laptop.css";

export const metadata: Metadata = ERP_METADATA;

export default function ErpServicePage() {
  return (
    <div className="svc-laptop bg-[#FFFEFB]">
      <ErpHero />
      <ErpFeatures />
      <ErpIntegrations />
      <ErpPortfolio />
      <ErpReviews />
      <ErpTeam />
      <ErpPricing />
      <FAQ className="bg-white" ctaHref="#contact" />
      <ServiceMarquee />
      <HomeConsultation />
      <ServiceFooter />
    </div>
  );
}
