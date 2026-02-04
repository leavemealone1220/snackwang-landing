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
    <section className="bg-[#f6f5ee] py-section">
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
            <p className="mt-4 max-w-md text-sm text-black/70 md:text-base">
              버튼을 눌러 다양한 스낵왕 혜택 카드를 살펴보세요. 맨 앞 카드가
              현재 적용 중인 대표 혜택입니다.
            </p>

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

          {/* 오른쪽 카드 슬라이더 - Figma 기준 카드 시작이 약 724px 이라, 텍스트에서 ~110px 정도 떨어지게 마진 */}
          <div className="mt-8 flex flex-[1.9] items-stretch md:mt-0 md:pl-[110px]">
            <div className="flex w-full overflow-hidden">
              {ordered.map((feature, idx) => {
                const isActive = idx === 0;
                const scale = isActive
                    ? "md:scale-100 scale-100"
                    : "md:scale-90 scale-90";
                const opacity = isActive ? "opacity-100" : "opacity-40";
                const translateY = isActive
                  ? "md:translate-y-0"
                  : "md:translate-y-4";

                return (
                  <article
                    key={feature.id}
                    className={`mx-1 md:mx-2 flex transform flex-col items-center transition-all duration-500
                    w-[180px] flex-shrink-0 sm:w-[220px] md:w-[260px] lg:w-[300px]
                    ${scale}`}
                  >
                    {/* Figma 카드 이미지를 전체가 보이도록 그대로 출력 */}
                    <div
                      className={`w-full transform transition-all duration-500 ${opacity} ${translateY}`}
                    >
                      <Image
                        src={feature.imageSrc}
                        alt={feature.alt}
                        width={360}
                        height={480}
                        className="h-auto w-full"
                      />
                    </div>

                    {/* 화면에는 안 보이지만, 스크린리더용 텍스트 */}
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

