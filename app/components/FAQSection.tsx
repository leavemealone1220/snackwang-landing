"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type BubbleItem = {
  type: "question" | "answer";
  text: string;
  topPct: number;
  hasLogo?: boolean;
  continued?: boolean;
};

const CHAT_ITEMS: BubbleItem[] = [
  { type: "question", text: "설비는 무료로 제공되나요?", topPct: 14.4 },
  {
    type: "answer",
    text: "편리하고 깨끗한 간식 공간을 가질 수 있도록\n스낵왕에서는 컨설팅 후 딱 맞는\n다양한 설비를 무료로 임대해드립니다.",
    topPct: 19.0,
    hasLogo: true,
  },
  { type: "question", text: "주문한 간식은 한꺼번에 배송되나요?", topPct: 28.3 },
  {
    type: "answer",
    text: "첫 주문 시 스낵왕 자체 데이터를 통해 큐레이션 되며,\n지속적으로 스낵왕 매니저가 선호, 비선호 간식을\n모니터링하여 고객 피드백 반영과 함께\n매달 다양한 큐레이션이 제공됩니다.",
    topPct: 32.9,
    hasLogo: true,
  },
  {
    type: "question",
    text: "먹지 않은 간식이나 간식이\n마음에 들지 않으면 어쩌죠?",
    topPct: 42.2,
  },
  {
    type: "answer",
    text: "스낵왕 방문 관리 서비스를 이용 시\n비선호 간식은 선호 간식으로 대체 되거나\n교환 · 환불을 해드립니다.",
    topPct: 46.7,
    hasLogo: true,
  },
  {
    type: "answer",
    text: "또한 교환 · 환불은 스낵왕에서는 무료로\n진행됩니다.",
    topPct: 54.7,
    continued: true,
  },
  { type: "question", text: "피드백 전달은 어떻게 하나요?", topPct: 62.5 },
  {
    type: "answer",
    text: "전용 피드백 페이지를 공유해드리며\n1:1 전담 매니저를 통해 24시간\n지속적으로 피드백 전달이 가능합니다.",
    topPct: 67.0,
    hasLogo: true,
  },
  { type: "question", text: "결제는 어떻게 하나요?", topPct: 74.7 },
  {
    type: "answer",
    text: "방문 관리 서비스 : 해당하는 월에 제공되는\n간식을 월말에 계산\n정기 구독 서비스 : 상담 후 구독 개월 수에\n맞게 결제, 원하는 날짜에 배송 및\n중도 취소가 가능합니다.",
    topPct: 79.3,
    hasLogo: true,
  },
];

export function FAQSection() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh) {
        setVisibleCount(0);
        return;
      }
      const scrollPast = vh - rect.top;
      setVisibleCount(Math.min(CHAT_ITEMS.length, Math.floor(scrollPast / 55)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative">
      {/* 수박 – 위 섹션에 걸침 */}
      <div className="absolute z-20 pointer-events-none left-[16%] top-0 w-[80px] md:w-[110px] lg:w-[140px] -translate-y-1/2">
        <Image src="/images/faq/faq-watermelon.png" alt="" width={303} height={304} className="w-full h-auto" />
      </div>

      {/* 파란 배경 */}
      <div className="bg-[#02ACEA] rounded-t-[60px] md:rounded-t-[100px] relative overflow-hidden">
        {/* 노란 배경 패턴 – 하단 50% */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden"
          style={{ maxHeight: "50%" }}
        >
          <Image
            src="/images/faq/faq-bg-pattern.png.png"
            alt=""
            width={1920}
            height={1326}
            className="w-full h-auto"
          />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 px-4 md:px-[60px] pt-[70px] md:pt-[100px] lg:pt-[120px] pb-[60px] md:pb-[100px] lg:pb-[140px]">
          {/* 타이틀 */}
          <div className="text-center mb-[30px] md:mb-[40px] lg:mb-[50px]">
            <p className="text-[#F8F8F9]/60 text-[14px] md:text-[18px] lg:text-[24px] font-medium tracking-[-0.02em] leading-[1.4] mb-2 md:mb-3">
              Q&A
            </p>
            <h2 className="text-[#F8F8F9] text-[24px] md:text-[36px] lg:text-[56px] font-extrabold tracking-[-0.015em] leading-[1.4]">
              한 입에 쏙! 궁금증을 해결해드립니다.
            </h2>
          </div>

          {/* 폰 + 장식 영역 */}
          <div className="relative max-w-[1400px] mx-auto">
            {/* 도넛 */}
            <div className="absolute pointer-events-none hidden lg:block z-0 left-0 top-[18%] w-[140px] xl:w-[190px]">
              <Image src="/images/faq/faq-donut.png" alt="" width={378} height={368} className="w-full h-auto" />
            </div>
            {/* 붕어빵 */}
            <div className="absolute pointer-events-none hidden lg:block z-0 right-[6%] top-[14%] w-[90px] xl:w-[125px]">
              <Image src="/images/faq/faq-fishbread.png" alt="" width={250} height={182} className="w-full h-auto" />
            </div>
            {/* 도시락 */}
            <div className="absolute pointer-events-none hidden lg:block z-0 right-[1%] top-[40%] w-[170px] xl:w-[240px]">
              <Image src="/images/faq/faq-lunchbox.png" alt="" width={478} height={478} className="w-full h-auto" />
            </div>

            {/* 폰 – Figma 비율(40.7%) 유지하도록 xl에서 650px */}
            <div className="relative mx-auto w-full max-w-[320px] md:max-w-[400px] lg:max-w-[520px] xl:max-w-[650px] z-10">
              <div ref={phoneRef} className="relative">
                {/* 폰 프레임 */}
                <Image
                  src="/images/faq/faq-phone-frame.png"
                  alt=""
                  width={1562}
                  height={3116}
                  className="w-full h-auto relative z-10 pointer-events-none select-none"
                  priority
                />

                {/* 채팅 버블 */}
                {CHAT_ITEMS.map((item, i) => {
                  const isVisible = i < visibleCount;

                  if (item.type === "question") {
                    return (
                      <div
                        key={i}
                        className={`absolute z-20 transition-all duration-500 ease-out ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                        }`}
                        style={{ top: `${item.topPct}%`, right: "6.4%" }}
                      >
                        <div className="bg-[#7B79FF] rounded-[10px] rounded-tr-none md:rounded-[14px] md:rounded-tr-none lg:rounded-[18px] lg:rounded-tr-none xl:rounded-[22px] xl:rounded-tr-none px-[6px] py-[4px] md:px-[9px] md:py-[6px] lg:px-[12px] lg:py-[8px] xl:px-[16px] xl:py-[12px]">
                          <p className="text-[#C6C5FF] text-[7px] md:text-[9px] lg:text-[11px] xl:text-[15px] font-medium leading-[1.2] tracking-[-0.02em] whitespace-pre-line">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className={`absolute z-20 transition-all duration-500 ease-out ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                      }`}
                      style={{ top: `${item.topPct}%`, left: "6.4%" }}
                    >
                      <div className="flex items-start gap-[2px] md:gap-[3px] lg:gap-[4px] xl:gap-[8px]">
                        {item.hasLogo ? (
                          <Image
                            src="/images/faq/faq-answer-logo.png"
                            alt=""
                            width={42}
                            height={42}
                            className="w-[12px] h-[12px] md:w-[16px] md:h-[16px] lg:w-[22px] lg:h-[22px] xl:w-[34px] xl:h-[34px] rounded-full flex-shrink-0"
                          />
                        ) : (
                          <div className="w-[12px] md:w-[16px] lg:w-[22px] xl:w-[34px] flex-shrink-0" />
                        )}
                        <div
                          className={`bg-white text-[#424242] px-[5px] py-[4px] md:px-[8px] md:py-[6px] lg:px-[11px] lg:py-[8px] xl:px-[16px] xl:py-[14px] max-w-[75%] ${
                            item.continued
                              ? "rounded-[10px] md:rounded-[14px] lg:rounded-[18px] xl:rounded-[22px]"
                              : "rounded-[10px] rounded-tl-none md:rounded-[14px] md:rounded-tl-none lg:rounded-[18px] lg:rounded-tl-none xl:rounded-[22px] xl:rounded-tl-none"
                          }`}
                        >
                          <p className="text-[7px] md:text-[9px] lg:text-[11px] xl:text-[15px] font-medium leading-[1.4] tracking-[-0.02em] whitespace-pre-line">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* CTA – 폰 우측 하단 */}
                <div className="absolute z-20 bottom-[3%] -right-[6px] md:-right-[12px] lg:-right-[16px] xl:-right-[24px]">
                  <button className="bg-[#151515] text-white border border-white rounded-full px-[10px] py-[6px] md:px-[16px] md:py-[9px] lg:px-[22px] lg:py-[12px] xl:px-[30px] xl:py-[18px] text-[8px] md:text-[11px] lg:text-[14px] xl:text-[17px] font-bold tracking-[-0.02em] hover:bg-[#333] transition-colors whitespace-nowrap">
                    지금 문의하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
