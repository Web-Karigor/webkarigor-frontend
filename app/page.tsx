import HeroSection from "@/components/home/HeroSection";
import HeroSlider from "@/components/home/HeroSlider";
import IndustryWins from "@/components/home/IndustryWins";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <HeroSlider />
      <Services />
      <IndustryWins />
    </div>
  );
}
