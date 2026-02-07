import { Hero } from "./components/Hero";
import { ClientLogosSection } from "./components/ClientLogosSection";
import { FeatureSection } from "./components/FeatureSection";
import { PricingSection } from "./components/PricingSection";
import { CustomizationSection } from "./components/CustomizationSection";
import { ThemeSection } from "./components/ThemeSection";
import { ProcessSection } from "./components/ProcessSection";
import { FAQSection } from "./components/FAQSection";
import { StatsSection } from "./components/StatsSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { FooterSection } from "./components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <ClientLogosSection />
      <FeatureSection />
      <PricingSection />
      <CustomizationSection />
      <ThemeSection />
      <ProcessSection />
      <div className="bg-[#f6f5ee] pt-[80px]">
        <FAQSection />
      </div>
      <StatsSection />
      <FinalCTASection />
      <FooterSection />
    </main>
  );
}
