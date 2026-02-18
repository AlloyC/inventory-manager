import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HighlightSection from "@/components/HighlightSection";
import PreFooter from "@/components/PreFooter";
import ProcessSection from "@/components/ProcessSection";
import Showcase from "@/components/Showcase";
import Testimonies from "@/components/Testimonies";
import Trust from "@/components/Trust";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Trust />
      <HighlightSection />
      <ProcessSection />
      <Showcase />
      <Testimonies />
      <PreFooter />
      <Footer />
    </div>
  );
}
