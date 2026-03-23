import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FreakFlowSection from "@/components/FreakFlowSection";
import ProductShowcase from "@/components/ProductShowcase";
import ReviewSection from "@/components/ReviewSection";
import CourtanaIntegration from "@/components/CourtanaIntegration";
import GuerillaDropSection from "@/components/GuerillaDropSection";
import TechDashboard from "@/components/TechDashboard";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14 pb-14 md:pb-0">
        <HeroSection />
        <div id="hardware">
          <ProductShowcase />
        </div>
        <div id="reviews">
          <ReviewSection />
        </div>
        <div id="flow">
          <FreakFlowSection />
        </div>
        <div id="ecosystem">
          <CourtanaIntegration />
        </div>
        <div id="drops">
          <GuerillaDropSection />
        </div>
        <div id="data">
          <TechDashboard />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
