import { Hero } from "./components/Hero";
import { ClientLogosSection } from "./components/ClientLogosSection";
import { FeatureSection } from "./components/FeatureSection";
import { PricingSection } from "./components/PricingSection";
import { CustomizationSection } from "./components/CustomizationSection";
import { ThemeSectionV2 } from "./components/ThemeSectionV2";
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
      <ThemeSectionV2 />
      <ProcessSection />
      <div className="bg-[#f6f5ee] pt-[40px] md:pt-[60px] lg:pt-[80px]">
        <FAQSection />
      </div>
      <StatsSection />
      <FinalCTASection />
      <FooterSection />
    </main>
  );
}
