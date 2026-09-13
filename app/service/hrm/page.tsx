import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";
import HomeConsultation from "@/components/home/HomeConsultation";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";
// import { MANPOWER_METADATA } from "@/lib/manpower-data";
import "@/styles/service-pages-laptop.css";
import HrmHero from "@/components/services/hrm/HrmHero";
import HrmFeatures from "@/components/services/hrm/HrmFeatures";
import HrmIntegrations from "@/components/services/hrm/HrmIntegrations";
import HrmPortfolio from "@/components/services/hrm/HrmPortfolio";
import HrmReviews from "@/components/services/hrm/HrmReviews";
import HrmTeam from "@/components/services/hrm/HrmTeam";
import HrmPricing from "@/components/services/hrm/HrmPricing";
import { HRM_METADATA } from "@/lib/hrm-data";

export const metadata: Metadata = HRM_METADATA;

export default function HrmServicePage() {
  return (
    <div className="svc-laptop bg-[#FFFEFB]">
      <HrmHero />
      <HrmFeatures />
      <HrmIntegrations />
      <HrmPortfolio />
      <HrmReviews />
      <HrmTeam />
      <HrmPricing />
      <FAQ className="bg-white" ctaHref="#contact" />
      <ServiceMarquee />
      <HomeConsultation />
      <ServiceFooter />
    </div>
  );
}
