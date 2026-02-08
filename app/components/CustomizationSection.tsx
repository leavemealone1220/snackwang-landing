"use client";

import Image from "next/image";
import { useState } from "react";

const PLAN_TIERS = [
  {
    id: "30",
    label: "30만원대",
    sublabel: "소규모 (20명)",
    image: "/images/customization/floorplan.png",
  },
  {
    id: "100",
    label: "100만원대",
    sublabel: "중규모 (50명 이상)",
    image: "/images/customization/floorplan.png",
  },
  {
    id: "1000",
    label: "1,000만원 이상",
    sublabel: "대규모 (100명 이상)",
    image: "/images/customization/floorplan.png",
  },
  {
    id: "premium",
    label: "프리미엄",
    sublabel: "맞춤 설계",
    image: "/images/customization/floorplan.png",
  },
];

export function CustomizationSection() {
  const [activeTier, setActiveTier] = useState("30");

  const currentTier = PLAN_TIERS.find((t) => t.id === activeTier) || PLAN_TIERS[0];

  return (
    <section className="relative -mt-[6rem] bg-[#7b79ff] pt-[60px] pb-[60px] md:pt-[150px] md:pb-[200px] text-white rounded-t-[48px] md:-mt-[8rem] md:rounded-t-[60px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px]">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* 상단 타이틀 */}
          <div className="text-center">
            <p className="text-sm font-medium text-[#02acea] md:text-base">
              설비 커스터마이징
            </p>
            <h2 className="mt-2 text-[28px] font-extrabold leading-snug tracking-[-0.02em] text-white md:text-[40px]">
              딱! 맞는 설비 커스터마이징
            </h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              오늘도 수백 개 사무실에, 스낵왕이 한 입의 힘을 전하고 있습니다.
            </p>
          </div>

          {/* 가격대별 선택 버튼 */}
          <div className="grid grid-cols-2 gap-2 md:flex md:items-center md:justify-center md:gap-3">
            {PLAN_TIERS.map((tier) => {
              const isActive = activeTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTier(tier.id)}
                  className={`rounded-full border-2 px-5 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 md:px-6 md:py-3 md:text-base ${
                    isActive
                      ? "border-white bg-white text-[#7b79ff]"
                      : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>

          {/* 선택된 가격대 설명 */}
          <p className="text-base font-medium text-white/70 transition-all duration-300">
            {currentTier.sublabel}
          </p>

          {/* 평면도 이미지 (페이드 전환) */}
          <div className="mt-4 flex w-full max-w-4xl items-center justify-center md:mt-6">
            <div className="relative aspect-[10/7] w-full">
              {PLAN_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{ opacity: activeTier === tier.id ? 1 : 0 }}
                >
                  <Image
                    src={tier.image}
                    alt={`${tier.label} 사무실 평면도 예시`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 하단 CTA */}
          <a
            href="#customize"
            className="inline-flex items-center justify-center gap-[10px] rounded-full bg-[#151515] px-[34px] py-[20px] text-[18px] font-bold leading-[20px] tracking-[-0.36px] text-white transition hover:bg-black/80"
          >
            <Image
              src="/images/customization/cta-icon.png"
              alt=""
              width={28}
              height={17}
              className="h-[17px] w-[28px]"
            />
            우리 사무실에 배치해보기
          </a>
        </div>
      </div>
    </section>
  );
}
