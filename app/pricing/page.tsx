import type { Metadata } from "next";
import PricingHero from "@/components/pricing/PricingHero";
import PricingPlans from "@/components/pricing/PricingPlans";
import PricingCustomBanner from "@/components/pricing/PricingCustomBanner";
import PricingPackage from "@/components/pricing/PricingPackage";
import PricingBuiltFor from "@/components/pricing/PricingBuiltFor";
import PricingFeaturedWork from "@/components/pricing/PricingFeaturedWork";
import FAQ from "@/components/home/FAQ";
import TrustedFounders from "@/components/home/TrustedFounders";
import HomeConsultation from "@/components/home/HomeConsultation";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Pricing — Webkarigor",
  description:
    "Transparent monthly pricing for product design and development. Seed, Growth, and Expert plans with no long-term contracts.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#FFFDF6]">
      <PricingHero />
      <PricingPlans />
      <PricingCustomBanner />
      <PricingPackage />
      <TrustedFounders />
      <PricingBuiltFor />
      <PricingFeaturedWork />
      <FAQ />
      <div id="contact">
        <HomeConsultation />
      </div>
      <Footer />
    </div>
  );
}
