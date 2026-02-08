"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Theme Section V2 – Figma 픽셀 기준 재구현
 * 노드: 1:250 / 파일키: aEsmYRndNsOoXzftZLkHzB
 * 배경: #EEEDE9, 1920 x 1081
 * 좌측 메인카드(395×496) + 우측 슬라이더(715×180, 3장) + 하단 2장
 */

const SLIDER_CARDS = [
  {
    title: "매달 바뀌는 테마간식",
    tags: ["#단백질 간식", "#프로틴 충전"],
  },
  {
    title: "회사별 맞춤 간식",
    tags: ["#직원 만족", "#자동 간식 관리", "운영비 절감"],
  },
  {
    title: "업무 효율 UP 간식",
    tags: ["#집중력 충전 간식", "#한끼 대신 간식"],
  },
];

export function ThemeSectionV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX === null) return;
    e.preventDefault();
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (!isDragging || dragStartX === null) {
      setIsDragging(false);
      setDragDeltaX(0);
      return;
    }
    const threshold = 40;
    if (dragDeltaX <= -threshold) {
      setActiveIndex((prev) =>
        prev < SLIDER_CARDS.length - 1 ? prev + 1 : 0
      );
    } else if (dragDeltaX >= threshold) {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : SLIDER_CARDS.length - 1
      );
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragDeltaX(0);
  };

  return (
    <section className="bg-[#EEEDE9] overflow-hidden">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px] pt-[120px] md:pt-[180px] pb-[100px] md:pb-[160px]">
        {/* 헤드라인 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span
              className="font-extrabold text-[#1d1d1d] leading-[1.2] tracking-[-0.72px]"
              style={{ fontSize: "48px" }}
            >
              이번 달은
            </span>
            <div className="flex items-center gap-1 mx-2">
              <Image
                src="/images/theme-v2/headline-01.png"
                alt=""
                width={60}
                height={55}
                className="w-[50px] md:w-[60px] h-auto"
              />
              <Image
                src="/images/theme-v2/headline-02.png"
                alt=""
                width={60}
                height={50}
                className="w-[50px] md:w-[60px] h-auto"
              />
              <Image
                src="/images/theme-v2/headline-03.png"
                alt=""
                width={50}
                height={58}
                className="w-[42px] md:w-[50px] h-auto"
              />
            </div>
            <span
              className="font-extrabold text-[#1d1d1d] leading-[1.2] tracking-[-0.72px]"
              style={{ fontSize: "48px" }}
            >
              테마로 선별했습니다!
            </span>
          </div>
          <p
            className="mt-[20px] text-[#1d1d1d] font-medium leading-[1.4] tracking-[-0.48px]"
            style={{ fontSize: "24px" }}
          >
            매달 바뀌는 테마, 매번 달라지는 간식 1:1 전담 매니저가 만들어
            드립니다!
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="mt-[80px] mx-auto max-w-[1132px]">
          <div className="flex flex-col lg:flex-row gap-[20px]">
            {/* 좌측 메인 카드 */}
            <div
              className="bg-white rounded-[40px] flex flex-col items-center justify-center flex-shrink-0"
              style={{
                width: "395px",
                minHeight: "496px",
                boxShadow: "0px 8px 14px 0px rgba(0,0,0,0.1)",
              }}
            >
              <div className="bg-[#f2f2f2] rounded-[20px] w-[200px] h-[200px] flex items-center justify-center">
                <Image
                  src="/images/theme-v2/main-icon.png"
                  alt=""
                  width={115}
                  height={129}
                  className="w-[115px] h-auto"
                />
              </div>
              <h3
                className="mt-[40px] text-[#1d1d1d] font-bold leading-[1.3] tracking-[-0.48px] text-center"
                style={{ fontSize: "32px" }}
              >
                24시간 대응
                <br />
                1:1 매니저
              </h3>
              <p
                className="mt-[20px] text-[#1d1d1d] font-medium leading-[1.4] tracking-[-0.36px] text-center"
                style={{ fontSize: "18px" }}
              >
                고객사별 1:1 전담 매니저 배정
                <br />
                24시간 즉시 대응
              </p>
            </div>

            {/* 우측 영역 */}
            <div className="flex flex-col gap-[20px] flex-1 min-w-0">
              {/* 슬라이더 카드 */}
              <div
                className={`relative bg-white rounded-[40px] overflow-hidden ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  height: "180px",
                  boxShadow: "0px 8px 14px 0px rgba(0,0,0,0.1)",
                  touchAction: "pan-y",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {/* 슬라이드 트랙 */}
                <div
                  className={`flex h-full ${
                    !isDragging ? "transition-transform duration-300 ease-out" : ""
                  }`}
                  style={{
                    transform: `translateX(calc(-${activeIndex * 100}% + ${dragDeltaX}px))`,
                  }}
                >
                  {SLIDER_CARDS.map((card, i) => (
                    <div
                      key={i}
                      className="w-full flex-shrink-0 h-full flex items-center px-[40px] relative"
                    >
                      {/* 텍스트 영역 */}
                      <div className="flex-1">
                        <h3
                          className="text-[#1d1d1d] font-bold leading-[1.4] tracking-[-0.48px]"
                          style={{ fontSize: "32px" }}
                        >
                          {card.title}
                        </h3>
                        <div className="mt-[16px] flex flex-wrap gap-[12px]">
                          {card.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="bg-[#f2f2f2] text-[rgba(29,29,29,0.6)] font-medium text-[16px] leading-[1.4] tracking-[-0.32px] px-[10px] py-[3px] rounded-[7px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* 이미지 영역 */}
                      <div className="flex-shrink-0 ml-[20px] relative">
                        {i === 0 && (
                          <div className="relative w-[200px] h-[144px]">
                            {/* 작은 붕어빵 */}
                            <Image
                              src="/images/theme-v2/slider-01-fishbread.png"
                              alt=""
                              width={60}
                              height={46}
                              className="absolute left-0 bottom-[10px] w-[60px] h-auto"
                            />
                            {/* 파란 원 + 큰 붕어빵 */}
                            <div className="absolute right-0 top-0 w-[144px] h-[144px] rounded-full bg-[#02ACEA] flex items-center justify-center overflow-hidden">
                              <Image
                                src="/images/theme-v2/slider-01-fishbread-big.png"
                                alt=""
                                width={100}
                                height={100}
                                className="w-[100px] h-auto"
                              />
                            </div>
                          </div>
                        )}
                        {i === 1 && (
                          <Image
                            src="/images/theme-v2/slider-02-img.png"
                            alt=""
                            width={86}
                            height={113}
                            className="h-auto"
                            style={{ width: "86px" }}
                          />
                        )}
                        {i === 2 && (
                          <div className="relative">
                            <Image
                              src="/images/theme-v2/slider-03-img.png"
                              alt=""
                              width={111}
                              height={140}
                              className="h-auto"
                              style={{ width: "111px" }}
                            />
                            <Image
                              src="/images/theme-v2/slider-03-bubble.png"
                              alt=""
                              width={58}
                              height={60}
                              className="absolute -right-[40px] top-[10px] w-[58px] h-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 인디케이터 (카드 내부 좌측 하단) */}
                <div className="absolute bottom-[16px] left-[40px] flex gap-[8px]">
                  {SLIDER_CARDS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "bg-[#02ACEA] w-[20px] h-[9px]"
                          : "bg-[#D9D9D9] w-[9px] h-[9px]"
                      }`}
                      aria-label={`슬라이드 ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* 하단 2개 카드 */}
              <div className="flex gap-[20px]">
                {/* 배송의 한계를 넘어 */}
                <div
                  className="bg-white rounded-[40px] flex flex-col items-center justify-center flex-1"
                  style={{ minHeight: "296px" }}
                >
                  <div className="relative w-[200px] h-[120px] mb-[10px]">
                    {/* 반원 배경: 왼쪽 파랑(낮) + 오른쪽 검정(밤) */}
                    <div
                      className="w-[200px] h-[200px] rounded-full overflow-hidden absolute top-0 left-0"
                      style={{ clipPath: "inset(0 0 50% 0)" }}
                    >
                      <div className="flex w-full h-full">
                        <div className="w-1/2 h-full bg-[#02ACEA] relative">
                          {/* 태양 */}
                          <div className="absolute top-[30px] right-[20px] w-[20px] h-[20px] rounded-full bg-[#FFD700]" />
                        </div>
                        <div className="w-1/2 h-full bg-[#1d1d1d] relative">
                          {/* 달 */}
                          <div className="absolute top-[30px] left-[20px] w-[20px] h-[20px] rounded-full bg-white" />
                          <div className="absolute top-[25px] left-[22px] w-[16px] h-[16px] rounded-full bg-[#1d1d1d]" />
                        </div>
                      </div>
                    </div>
                    {/* 토스트/샌드위치 */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[30px]">
                      <Image
                        src="/images/theme-v2/delivery-toast.png"
                        alt=""
                        width={69}
                        height={62}
                        className="w-[69px] h-auto"
                      />
                    </div>
                  </div>
                  <h3
                    className="mt-[20px] text-[#1d1d1d] font-bold leading-[1.4] tracking-[-0.48px] text-center"
                    style={{ fontSize: "32px" }}
                  >
                    배송의 한계를 넘어
                  </h3>
                  <p
                    className="mt-[8px] text-[#1d1d1d] font-medium leading-[1.4] tracking-[-0.36px] text-center"
                    style={{ fontSize: "18px" }}
                  >
                    당일 · 익일 · 야간 배송
                  </p>
                </div>

                {/* 커스터마이징 */}
                <div
                  className="bg-white rounded-[40px] flex flex-col items-center justify-center"
                  style={{ width: "295px", minHeight: "296px", flexShrink: 0 }}
                >
                  <Image
                    src="/images/theme-v2/customizing-img.png"
                    alt=""
                    width={149}
                    height={86}
                    className="w-[149px] h-auto"
                  />
                  <h3
                    className="mt-[40px] text-[#1d1d1d] font-bold leading-[1.4] tracking-[-0.48px] text-center"
                    style={{ fontSize: "32px" }}
                  >
                    커스터마이징
                  </h3>
                  <p
                    className="mt-[8px] text-[#1d1d1d] font-medium leading-[1.4] tracking-[-0.36px] text-center"
                    style={{ fontSize: "18px" }}
                  >
                    다양한 집기류 및 설비 제공
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
