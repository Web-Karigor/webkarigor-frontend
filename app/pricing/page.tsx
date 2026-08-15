import type { Metadata } from "next";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCustomBanner from "@/components/pricing/PricingCustomBanner";
import PricingPackage from "@/components/pricing/PricingPackage";
import PricingBuiltFor from "@/components/pricing/PricingBuiltFor";
import PricingFeaturedWork from "@/components/pricing/PricingFeaturedWork";
import ProjectHoverCursor from "@/components/projects/ProjectHoverCursor";
import FAQ from "@/components/home/FAQ";
import PricingSection from "@/components/home/PricingSection";
import TrustedFounders from "@/components/home/TrustedFounders";
import HomeConsultation from "@/components/home/HomeConsultation";
import Footer from "@/components/home/Footer";
import { PRICING_METADATA } from "@/lib/pricing-data";
import "@/styles/site-pages-laptop.css";

export const metadata: Metadata = {
  title: PRICING_METADATA.title,
  description: PRICING_METADATA.description,
};

export default function PricingPage() {
  return (
    <div className="site-laptop bg-[#FFFDF6]">
      <ProjectHoverCursor />
      <PricingHero />
      <PricingSection ctaHref="#contact" />
      <PricingCustomBanner />
      <PricingPackage />
      <TrustedFounders />
      <PricingBuiltFor />
      <PricingFeaturedWork />
      <FAQ />
      <HomeConsultation />
      <Footer />
    </div>
  );
}
