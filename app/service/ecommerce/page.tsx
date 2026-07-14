import type { Metadata } from "next";
import EcoFeatures from "@/components/services/ecommerce/EcoFeatures";
import EcoHero from "@/components/services/ecommerce/EcoHero";
import EcoPortfolio from "@/components/services/ecommerce/EcoPortfolio";
import EcoPricing from "@/components/services/ecommerce/EcoPricing";
import EcoReviews from "@/components/services/ecommerce/EcoReviews";
import EcoTeam from "@/components/services/ecommerce/EcoTeam";
import EcoTechStack from "@/components/services/ecommerce/EcoTechStack";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceMarquee from "@/components/services/ServiceMarquee";

export const metadata: Metadata = {
  title: "Ecommerce Services — Webkarigor",
  description:
    "Design and build conversion-focused ecommerce storefronts, mobile shopping apps, and scalable commerce platforms with Webkarigor.",
};

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
      <ServiceFAQ />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
