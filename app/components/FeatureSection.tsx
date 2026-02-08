'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

type FeatureSlide = {
  id: string;
  imageSrc: string;
  alt: string;
};

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
  const total = FEATURE_SLIDES.length;

  // 반응형 카드 크기
  const [sizes, setSizes] = useState({ active: 360, inactive: 276, gap: 30, height: 550 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSizes({ active: 360, inactive: 276, gap: 30, height: 550 });
      else if (w >= 768) setSizes({ active: 320, inactive: 240, gap: 30, height: 490 });
      else if (w >= 640) setSizes({ active: 260, inactive: 190, gap: 15, height: 400 });
      else setSizes({ active: 200, inactive: 150, gap: 15, height: 310 });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // 각 카드의 x 위치 계산 (activeIndex 기준 상대 위치)
  const getCardX = (idx: number) => {
    const relPos = ((idx - activeIndex) % total + total) % total;
    let x = 0;
    for (let p = 0; p < relPos; p++) {
      x += (p === 0 ? sizes.active : sizes.inactive) + sizes.gap;
    }
    return x;
  };

  return (
    <section className="bg-[#f6f5ee] pt-[40px] pb-[40px] md:pt-[150px] md:pb-[200px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-0">
          {/* 왼쪽 텍스트 & 버튼 */}
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

          {/* 오른쪽 카드 슬라이더 */}
          <div className="mt-8 flex-1 overflow-hidden md:mt-0 md:pl-[110px]">
            <div className="relative" style={{ height: sizes.height }}>
              {FEATURE_SLIDES.map((feature, idx) => {
                const relPos = ((idx - activeIndex) % total + total) % total;
                const isActive = relPos === 0;
                const x = getCardX(idx);

                return (
                  <article
                    key={feature.id}
                    className="absolute top-0 left-0 overflow-hidden rounded-[20px] md:rounded-[40px]"
                    style={{
                      transform: `translateX(${x}px)`,
                      width: isActive ? sizes.active : sizes.inactive,
                      opacity: isActive ? 1 : 0.4,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
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
