import { Hero } from "./components/Hero";
import { ClientLogosSection } from "./components/ClientLogosSection";
import { FeatureSection } from "./components/FeatureSection";
import { PricingSection } from "./components/PricingSection";
import { ThemeSection } from "./components/ThemeSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <ClientLogosSection />
      <FeatureSection />
      <PricingSection />
      <ThemeSection />
    </main>
  );
}
