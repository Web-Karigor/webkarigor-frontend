import HeroSection from "@/components/home/HeroSection";
import Services from "@/components/home/Services";
import Technologies from "@/components/home/Technologies";
import Team from "@/components/home/Team";
import PricingSection from "@/components/home/PricingSection";
import FAQ from "@/components/home/FAQ";
import HeroSlider from "@/components/home/HeroSlider";
import ConnectedFeatures from "@/components/home/ConnectedFeatures";
import VideoSection from "@/components/home/VideoSection";
import IndustryWins from "@/components/home/IndustryWins";
import HomeBanner from "@/components/home/HomeBanner";
import BuildScaleSection from "@/components/home/BuildScaleSection";
import TrustedFounders from "@/components/home/TrustedFounders";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <HeroSlider />
      <Services />
      {/* <ConnectedFeatures /> */}
      <VideoSection />
      <Technologies />
      <IndustryWins />
      <TrustedFounders /> 
      <Team />
      <PricingSection />
      <HomeBanner />
      <FAQ />
      <BuildScaleSection />
    </div>
  );
}


 