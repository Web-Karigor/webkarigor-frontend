import type { Metadata } from "next";
import TechServices from "@/components/home/TechServices";
import Team from "@/components/home/Team";
import ServiceClients from "@/components/services/ServiceClients";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServicePricing from "@/components/services/ServicePricing";
import ServiceTechGrid from "@/components/services/ServiceTechGrid";
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import ServiceWhyChoose from "@/components/services/ServiceWhyChoose";
import servicesContent from "@/data/services-content.json";

export const metadata: Metadata = {
  title: servicesContent.metadata.title,
  description: servicesContent.metadata.description,
};

export default function ServicePage() {
  return (
    <div className="bg-[#fffdf6]">
      <ServiceHero />
      <ServiceMarquee />
      <ServiceClients />
      <ServiceOfferings />
      <TechServices />
      <ServiceTechGrid />
      <ServiceWhyChoose />
      <Team />
      <ServiceTestimonials />
      <ServicePricing />
      <ServiceFAQ />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
