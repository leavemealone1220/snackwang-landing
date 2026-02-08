"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";

type ProcessStep = {
  id: string;
  tabLabel: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  { id: "01", tabLabel: "상담 신청" },
  { id: "02", tabLabel: "방문 진열" },
  { id: "03", tabLabel: "배송&관리" },
  { id: "04", tabLabel: "월간 리포트" },
];

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragging = useRef(false);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStartX.current = event.clientX;
    setIsDragging(true);
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = event.clientX - dragStartX.current;
    setDragDeltaX(delta);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    const threshold = 40;
    if (dragDeltaX <= -threshold) {
      setActiveIndex((prev) =>
        prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0
      );
    } else if (dragDeltaX >= threshold) {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1
      );
    }

    setIsDragging(false);
    setDragDeltaX(0);
  }, [dragDeltaX]);

  return (
    <section className="bg-[#f6f5ee] pt-[80px] pb-[80px] md:pt-[120px] md:pb-[120px] lg:pt-[150px] lg:pb-[150px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px]">
        {/* 상단 타이틀 */}
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-1.5 text-[12px] font-semibold tracking-[-0.02em] text-[#f5a524] md:text-[13px]">
            스낵왕 설치하기
          </span>
          <h2 className="mt-3 text-[24px] font-bold leading-snug tracking-[-0.03em] text-black md:mt-4 md:text-[32px] lg:text-[40px]">
            쉽고 빠른 <span className="font-extrabold">스낵왕 설치 방법</span>
          </h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mx-auto mt-6 flex max-w-[600px] items-center justify-center gap-2 text-[13px] font-medium sm:gap-3 md:mt-8 md:gap-6 md:text-[15px]">
          {PROCESS_STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-3 md:gap-6">
                {index > 0 && (
                  <span className="text-[11px] text-black/30 md:text-[14px]">{">"}</span>
                )}
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative pb-2 transition-colors ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-black/50 hover:text-black/70"
                  }`}
                >
                  {step.tabLabel}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#4ade80] md:h-[3px]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* 구분선 */}
        <div className="mx-auto mt-0 h-[1px] max-w-[600px] bg-black/10" />

        {/* 카드 슬라이더 */}
        <div className="relative mx-auto mt-6 max-w-[1400px] overflow-hidden lg:overflow-visible md:mt-10">
          <div
            className={`flex select-none items-center justify-center ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* 이전 카드 (왼쪽, 살짝 보임) */}
            <div
              className="relative mr-[-60px] hidden w-[520px] flex-shrink-0 transition-all duration-300 ease-out lg:block"
              style={{
                opacity: 0.4,
                filter: "blur(1px)",
                transform: `translateX(${dragDeltaX * 0.5}px)`,
              }}
            >
              <div className="overflow-hidden rounded-[32px]">
                <Image
                  src={`/images/process/Process-${String((activeIndex - 1 + 4) % 4 + 1).padStart(2, "0")}.png`}
                  alt="이전 단계"
                  width={1582}
                  height={796}
                  className="h-auto w-full"
                />
              </div>
            </div>

            {/* 현재 카드 (가운데, 크게) */}
            <div
              className={`relative z-10 w-full max-w-[560px] flex-shrink-0 md:max-w-[680px] lg:max-w-[560px] ${
                !isDragging ? "transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" : ""
              }`}
              style={{
                transform: `translateX(${dragDeltaX}px)`,
              }}
            >
              <div className="overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:rounded-[32px]">
                <Image
                  src={`/images/process/Process-${String(activeIndex + 1).padStart(2, "0")}.png`}
                  alt={PROCESS_STEPS[activeIndex].tabLabel}
                  width={1582}
                  height={796}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>

            {/* 다음 카드 (오른쪽, 살짝 보임) */}
            <div
              className="relative ml-[-60px] hidden w-[520px] flex-shrink-0 transition-all duration-300 ease-out lg:block"
              style={{
                opacity: 0.4,
                filter: "blur(1px)",
                transform: `translateX(${dragDeltaX * 0.5}px)`,
              }}
            >
              <div className="overflow-hidden rounded-[32px]">
                <Image
                  src={`/images/process/Process-${String((activeIndex + 1) % 4 + 1).padStart(2, "0")}.png`}
                  alt="다음 단계"
                  width={1582}
                  height={796}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
