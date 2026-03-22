import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FreakFlowSection from "@/components/FreakFlowSection";
import ProductShowcase from "@/components/ProductShowcase";
import GuerillaDropSection from "@/components/GuerillaDropSection";
import TechDashboard from "@/components/TechDashboard";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14 pb-14 md:pb-0">
        <HeroSection />
        <div id="flow">
          <FreakFlowSection />
        </div>
        <div id="hardware">
          <ProductShowcase />
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
