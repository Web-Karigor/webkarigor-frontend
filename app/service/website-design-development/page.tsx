import type { Metadata } from "next";
import FAQ from "@/components/services/website-design-development/FAQ";
import Services from "@/components/services/website-design-development/Services";
import Hero from "@/components/services/website-design-development/Hero";
import Integrations from "@/components/services/website-design-development/Integrations";
import Portfolio from "@/components/services/website-design-development/Portfolio";
import Pricing from "@/components/services/website-design-development/Pricing";
import Reviews from "@/components/services/website-design-development/Reviews";
import Team from "@/components/services/website-design-development/Team";
import WhyChoose from "@/components/services/website-design-development/WhyChoose";
import HomeConsultation from "@/components/home/HomeConsultation";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import { WEBSITE_DESIGN_DEVELOPMENT_METADATA } from "@/lib/website-design-development-data";
import "@/styles/service-pages-laptop.css";

export const metadata: Metadata = WEBSITE_DESIGN_DEVELOPMENT_METADATA;

export default function WebsiteDesignDevelopmentPage() {
    return (
        <div className="svc-laptop bg-[#FFFEFB]">
            <Hero />
            <Services />
            <WhyChoose />
            <Integrations />
            <Portfolio />
            <Reviews />
            <Team />
            <Pricing />
            <FAQ className="bg-white" ctaHref="#contact" />
            <ServiceMarquee />
            <HomeConsultation />
            <ServiceFooter />
        </div>
    );
}
