'use client';

import Image from "next/image";
import { useState } from "react";

type FeatureSlide = {
  id: string;
  /** Figma 카드 전체를 export 한 이미지 경로 */
  imageSrc: string;
  /** 접근성용 텍스트 요약 */
  alt: string;
};

// Figma 카드 디자인을 그대로 이미지로 넣기 위한 슬라이드 정의
// (이미지는 public/images/features/feature-0X.png 로 export 해 두면 됩니다)
const FEATURE_SLIDES: FeatureSlide[] = [
  {
    id: "curation",
    imageSrc: "/images/features/feature-01.png",
    alt: "무료 배달 + 35% 할인 적용된 큐레이션 플랜",
  },
  {
    id: "delivery",
    imageSrc: "/images/features/Feature-02.png",
    alt: "배송 · 진열 · 관리 · 반품 100% 무료 혜택",
  },
  {
    id: "equipment",
    imageSrc: "/images/features/Feature-03.png",
    alt: "무상으로 진행되는 설비 임대",
  },
  {
    id: "new-snacks",
    imageSrc: "/images/features/Feature-04.png",
    alt: "매달 20% 이상 추가되는 새로운 간식",
  },
];

export function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FEATURE_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? FEATURE_SLIDES.length - 1 : prev - 1
    );
  };

  // activeIndex 기준으로 정렬된 카드 순서
  const ordered = FEATURE_SLIDES.map(
    (_, i) => FEATURE_SLIDES[(activeIndex + i) % FEATURE_SLIDES.length]
  );

  return (
    <section className="bg-[#f6f5ee] pt-[150px] pb-[200px]">
      {/* 1920px Figma 캔버스를 기준으로 좌우 여백/위치를 맞추기 위한 래퍼 */}
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-0">
          {/* 왼쪽 텍스트 & 버튼 - Figma 기준 left 280px, width 377px 근사치 */}
          <div className="flex flex-[0_0_auto] flex-col justify-center md:pl-[260px] md:pr-0 md:max-w-[520px]">
            <p className="text-sm font-medium text-blue md:text-base">
            체험해보세요!
            </p>
            <h2 className="mt-2 text-[28px] font-extrabold leading-snug tracking-[-0.02em] text-black md:text-[40px]">
              스낵왕이 알아서
              <br />
              한 입 드릴게요!
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:bg-black/5 md:h-14 md:w-14"
                aria-label="이전 혜택 보기"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black text-white shadow-sm transition hover:bg-black/80 md:h-14 md:w-14"
                aria-label="다음 혜택 보기"
              >
                ›
              </button>
            </div>
          </div>

          {/* 오른쪽 카드 슬라이더 (Figma: 활성 360px, 비활성 276px, gap 30px) */}
          <div className="mt-8 flex flex-1 items-start md:mt-0 md:pl-[110px]">
            <div className="flex w-full items-start gap-[15px] overflow-hidden md:gap-[30px]">
              {ordered.map((feature, idx) => {
                const isActive = idx === 0;

                return (
                  <article
                    key={feature.id}
                    className={`flex-shrink-0 overflow-hidden rounded-[20px] md:rounded-[40px] transition-all duration-500 ${
                      isActive
                        ? "w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] opacity-100"
                        : "w-[150px] sm:w-[190px] md:w-[240px] lg:w-[276px] opacity-40"
                    }`}
                  >
                    <Image
                      src={feature.imageSrc}
                      alt={feature.alt}
                      width={360}
                      height={550}
                      className="h-auto w-full"
                    />
                    <p className="sr-only">{feature.alt}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

