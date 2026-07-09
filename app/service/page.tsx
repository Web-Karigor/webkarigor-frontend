import type { Metadata } from "next";
import ServiceClients from "@/components/services/ServiceClients";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServicePricing from "@/components/services/ServicePricing";
import ServiceShowcase from "@/components/services/ServiceShowcase";
import ServiceTeamMosaic from "@/components/services/ServiceTeamMosaic";
import ServiceTechGrid from "@/components/services/ServiceTechGrid";
import ServiceTestimonials from "@/components/services/ServiceTestimonials";
import ServiceWhyChoose from "@/components/services/ServiceWhyChoose";

export const metadata: Metadata = {
  title: "Services — Webkarigor",
  description:
    "Web design, SEO, digital marketing, mobile apps, branding, and full-stack development tailored to your business goals.",
};

export default function ServicePage() {
  return (
    <div className="bg-[#fffdf6]">
      <ServiceHero />
      <ServiceMarquee />
      <ServiceClients />
      <ServiceOfferings />
      <ServiceShowcase />
      <ServiceTechGrid />
      <ServiceWhyChoose />
      <ServiceTeamMosaic />
      <ServiceTestimonials />
      <ServicePricing />
      <ServiceFAQ />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
