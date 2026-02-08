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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "스낵왕",
      legalName: "(주)펠리즈",
      url: "https://snackwang.com",
      logo: "https://snackwang.com/images/hero/logo.svg",
      description:
        "기업 사내 간식을 배송부터 진열·관리까지 책임지는 구독 서비스",
      telephone: "1533-6557",
      address: {
        "@type": "PostalAddress",
        addressLocality: "부산시 기장군",
        addressRegion: "부산",
        addressCountry: "KR",
        streetAddress: "기장해안로98, A210호",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "스낵왕",
      url: "https://snackwang.com",
    },
    {
      "@type": "Service",
      name: "스낵왕 기업 간식 구독",
      provider: {
        "@type": "Organization",
        name: "스낵왕",
      },
      description:
        "기업 맞춤 간식 큐레이션, 정기 배송, 무인 편의점 설치, 케이터링까지 올인원 간식 복지 서비스",
      areaServed: {
        "@type": "Country",
        name: "KR",
      },
      serviceType: "기업 간식 구독 서비스",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
