import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";
import EcoFeatures from "@/components/services/ecommerce/EcoFeatures";
import EcoHero from "@/components/services/ecommerce/EcoHero";
import EcoPortfolio from "@/components/services/ecommerce/EcoPortfolio";
import EcoPricing from "@/components/services/ecommerce/EcoPricing";
import EcoReviews from "@/components/services/ecommerce/EcoReviews";
import EcoTeam from "@/components/services/ecommerce/EcoTeam";
import EcoTechStack from "@/components/services/ecommerce/EcoTechStack";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import { ECO_METADATA } from "@/lib/ecommerce-data";

export const metadata: Metadata = ECO_METADATA;

export default function EcommerceServicePage() {
  return (
    <div className="bg-[#FFFEFB]">
      <EcoHero />
      <EcoFeatures />
      <EcoTechStack />
      <EcoPortfolio />
      <EcoReviews />
      <EcoTeam />
      <EcoPricing />
      <FAQ className="bg-white" />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
