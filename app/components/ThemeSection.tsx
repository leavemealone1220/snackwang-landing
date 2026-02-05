'use client';

import Image from "next/image";
import { useState } from "react";

type ThemeSlide = {
  id: string;
  src: string;
  alt: string;
};

const THEME_SLIDES: ThemeSlide[] = [
  {
    id: "monthly",
    src: "/images/theme/theme-monthly.png",
    alt: "매달 바뀌는 테마간식",
  },
  {
    id: "company",
    src: "/images/theme/theme-company.png",
    alt: "회사별 맞춤 간식",
  },
  {
    id: "productivity",
    src: "/images/theme/theme-productivity.png",
    alt: "업무 효율 UP 간식",
  },
];

export function ThemeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    setDragDeltaX(0);
    setDragStartX(null);
    setIsDragging(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragStartX(event.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    if (!isDragging || dragStartX === null) return;
    const delta = event.clientX - dragStartX;
    setDragDeltaX(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging || dragStartX === null) {
      setIsDragging(false);
      setDragDeltaX(0);
      return;
    }

    const threshold = 40; // 얼마나 드래그해야 슬라이드가 넘어갈지(px)
    if (dragDeltaX <= -threshold) {
      // 왼쪽으로 드래그: 다음 카드로, 마지막이면 첫 번째로 루프
      setActiveIndex((prev) =>
        prev < THEME_SLIDES.length - 1 ? prev + 1 : 0,
      );
    } else if (dragDeltaX >= threshold) {
      // 오른쪽으로 드래그: 이전 카드로, 첫 번째면 마지막으로 루프
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : THEME_SLIDES.length - 1,
      );
    }

    setIsDragging(false);
    setDragStartX(null);
    setDragDeltaX(0);
  };

  return (
    <section className="bg-[#eeede9] py-section">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px]">
        {/* 상단 타이틀 */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-[28px] font-extrabold leading-snug tracking-[-0.02em] text-black md:text-[36px] md:leading-[1.2]">
            이번 달은 🍡 🍔 🍕 테마로 선별했습니다!
          </h2>
          <p className="mt-3 text-sm text-black/70 md:text-[18px]">
            매달 바뀌는 테마, 매번 달라지는 간식 1:1 전담 매니저가 만들어 드립니다!
          </p>
        </div>

        {/* 4개 카드 레이아웃을 Figma처럼 고정 배치 */}
        <div className="mt-8 flex justify-center">
          <div className="grid max-w-[1400px] grid-cols-1 gap-[20px] md:grid-cols-[minmax(0,395px)_minmax(0,715px)]">
            {/* 왼쪽: 메인 카드 (395 x 496) */}
            <article className="w-full max-w-[395px]">
              <Image
                src="/images/theme/theme-main.png"
                alt="24시간 대응 1:1 매니저"
                width={395}
                height={496}
                className="h-auto w-full"
              />
              <p className="sr-only">
                24시간 대응 1:1 매니저. 고객사별 1:1 전담 매니저 배정, 24시간 즉시 대응.
              </p>
            </article>

            {/* 오른쪽: 위 1장(슬라이더) + 아래 2장 - 전체 높이를 메인 카드(496px)와 맞추기 */}
            <div className="flex h-[496px] flex-col justify-between">
              {/* 위: 가로 카드 슬라이더 (715 x 180) */}
              <div className="relative w-full max-w-[715px] overflow-hidden rounded-[40px]">
                <div
                  className={`flex select-none cursor-grab transition-transform duration-300 ${
                    isDragging ? "cursor-grabbing" : ""
                  }`}
                  style={{
                    transform: `translateX(calc(-${activeIndex * 100}% + ${dragDeltaX}px))`,
                    touchAction: "pan-y",
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  {THEME_SLIDES.map((slide) => (
                    <article key={slide.id} className="w-full flex-shrink-0">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={715}
                        height={180}
                        className="h-auto w-full"
                      />
                      <p className="sr-only">{slide.alt}</p>
                    </article>
                  ))}
                </div>

                {/* 하단 인디케이터 버튼 - left 55px, 점 크기 9px, 간격 8px */}
                <div className="absolute left-[55px] top-[134px] flex items-center gap-[8px]">
                  {THEME_SLIDES.map((slide, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => handleIndicatorClick(index)}
                        className={`h-[9px] w-[9px] rounded-full transition-colors ${
                          isActive ? "bg-[#02acea]" : "bg-[#d2d2d2]"
                        }`}
                        aria-label={`${slide.alt} 보기`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 아래: 카드 2개 (400 x 296, 295 x 296) */}
              <div className="flex flex-col gap-[20px] md:flex-row">
                <article className="w-full max-w-[400px]">
                  <Image
                    src="/images/theme/theme-delivery.png"
                    alt="배송의 한계를 넘어"
                    width={400}
                    height={296}
                    className="h-auto w-full"
                  />
                  <p className="sr-only">배송의 한계를 넘어. 당일 · 익일 · 야간 배송.</p>
                </article>

                <article className="w-full max-w-[295px]">
                  <Image
                    src="/images/theme/theme-customizing.png"
                    alt="커스터마이징"
                    width={295}
                    height={296}
                    className="h-auto w-full"
                  />
                  <p className="sr-only">커스터마이징. 다양한 집기류 및 설비 제공.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
