"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * FAQ Section
 * - Desktop (lg+): 1920px 고정 레이아웃 (Figma px 값 그대로) → hidden lg:block
 * - Mobile (~lg): 아코디언 형태 FAQ 리스트 → lg:hidden
 * 두 레이아웃을 별도 section으로 분리하여 SSR 레이아웃 깨짐 방지
 */

const FAQ_DATA = [
  {
    q: "설비는 무료로 제공되나요?",
    a: "편리하고 깨끗한 간식 공간을 가질 수 있도록 스낵왕에서는 컨설팅 후 딱 맞는 다양한 설비를 무료로 임대해드립니다.",
  },
  {
    q: "주문한 간식은 한꺼번에 배송되나요?",
    a: "첫 주문 시 스낵왕 자체 데이터를 통해 큐레이션 되며, 지속적으로 스낵왕 매니저가 선호, 비선호 간식을 모니터링하여 고객 피드백 반영과 함께 매달 다양한 큐레이션이 제공됩니다.",
  },
  {
    q: "먹지 않은 간식이나 간식이 마음에 들지 않으면 어쩌죠?",
    a: "스낵왕 방문 관리 서비스를 이용 시 비선호 간식은 선호 간식으로 대체 되거나 교환·환불을 해드립니다. 또한 교환·환불은 스낵왕에서는 무료로 진행됩니다.",
  },
  {
    q: "피드백 전달은 어떻게 하나요?",
    a: "전용 피드백 페이지를 공유해드리며 1:1 전담 매니저를 통해 24시간 지속적으로 피드백 전달이 가능합니다.",
  },
  {
    q: "결제는 어떻게 하나요?",
    a: "방문 관리 서비스: 해당하는 월에 제공되는 간식을 월말에 계산합니다. 정기 구독 서비스: 상담 후 구독 개월 수에 맞게 결제, 원하는 날짜에 배송 및 중도 취소가 가능합니다.",
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [scale, setScale] = useState(0.75);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* 뷰포트 너비에 맞춰 데스크톱 스케일 계산 */
  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(0.75, (window.innerWidth - 120) / 1920));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  /* 스크롤 기반 버블 애니메이션 (데스크톱용) */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh) {
        setVisibleCount(0);
        return;
      }
      const scrollPast = vh - rect.top;
      setVisibleCount(Math.min(11, Math.floor(scrollPast / 60)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 버블 등장 애니메이션 유틸 */
  const bubble = (idx: number) => {
    const isVisible = visibleCount > idx;
    const delay = idx * 80;
    return {
      className: `absolute ${isVisible ? "opacity-100" : "opacity-0"}`,
      style: {
        transform: isVisible ? "translateY(0)" : "translateY(-35px)",
        transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
      } as React.CSSProperties,
    };
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════ */}
      {/* 데스크톱 레이아웃 (lg+): 기존 1920px 스케일 */}
      {/* ══════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{
          height: `${2478 * scale}px`,
          marginBottom: "-250px",
          overflowX: "clip",
          overflowY: "visible",
        }}
      >
        {/* ── 전체 너비 파란 배경 ── */}
        <div
          className="absolute inset-0 bg-[#02ACEA]"
          style={{ borderRadius: `${Math.round(100 * scale)}px ${Math.round(100 * scale)}px 0 0` }}
        />

        {/* ── 전체 너비 노란 곡선 배경 ── */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: "61.2%",
            background: "#FFC845",
            borderRadius: "50% 50% 0 0 / 150px 150px 0 0",
          }}
        />

        {/* ── 스케일 래퍼: 오브제만 축소 ── */}
        <div
          style={{
            width: "1920px",
            height: "2478px",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            position: "absolute",
            left: "50%",
            marginLeft: "-960px",
          }}
        >
          {/* ── 수박: 위 섹션과 겹침 ── */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{ left: "314px", top: "-52px", width: "303px" }}
          >
            <Image
              src="/images/faq/faq-watermelon.png"
              alt=""
              width={378}
              height={387}
              style={{ width: "303px", height: "auto", transform: "rotate(-30deg)" }}
            />
          </div>

          {/* ── 1920px 고정 컨테이너 ── */}
          <div
            className="relative mx-auto"
            style={{ width: "1920px", height: "2478px" }}
          >
            {/* ═══════ 타이틀 ═══════ */}
            <p
              className="absolute text-center text-[#F8F8F9]/60 font-medium leading-[1.4]"
              style={{
                left: "50%",
                top: "180px",
                transform: "translateX(-50%)",
                width: "786px",
                fontSize: "24px",
                letterSpacing: "-0.48px",
              }}
            >
              Q&A
            </p>
            <p
              className="absolute text-center text-[#F8F8F9] leading-[1.4]"
              style={{
                left: "50%",
                top: "234px",
                transform: "translateX(-50%)",
                width: "911px",
                fontSize: "56px",
                letterSpacing: "-0.84px",
              }}
            >
              <span className="font-medium">한 입에 쏙! </span>
              <span className="font-extrabold">궁금증을 해결해드립니다.</span>
            </p>

            {/* ═══════ 음식 장식 (파란 영역) ═══════ */}

            {/* 도넛 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "272px", top: "645px", width: "300px" }}
            >
              <div style={{ transform: "rotate(-20deg)" }}>
                <Image src="/images/faq/faq-donut.png" alt="" width={799} height={751} style={{ width: "300px", height: "auto" }} />
              </div>
            </div>

            {/* 붕어빵 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "1308px", top: "651px", width: "250px" }}
            >
              <Image src="/images/faq/faq-fishbread.png" alt="" width={469} height={342} style={{ width: "250px", height: "auto" }} />
            </div>

            {/* 도시락 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "1219px", top: "1062px", width: "350px" }}
            >
              <div style={{ transform: "rotate(30deg)" }}>
                <Image src="/images/faq/faq-lunchbox.png" alt="" width={2095} height={2122} style={{ width: "350px", height: "auto" }} />
              </div>
            </div>

            {/* ═══════ 음식 장식 (노란 영역) ═══════ */}

            {/* 아이스크림 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "196px", top: "1521px", width: "299px" }}
            >
              <Image src="/images/faq/faq-icecream.png" alt="" width={559} height={1356} style={{ width: "299px", height: "auto" }} />
            </div>

            {/* 샐러드 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "-73px", top: "1748px", width: "399px" }}
            >
              <Image src="/images/faq/faq-salad.png" alt="" width={316} height={408} style={{ width: "399px", height: "auto" }} />
            </div>

            {/* 핫도그 */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "280px",
                top: "1784px",
                width: "500px",
                transform: "rotate(158.96deg) scaleY(-1)",
              }}
            >
              <Image src="/images/faq/faq-hotdog.png" alt="" width={775} height={793} style={{ width: "500px", height: "auto" }} />
            </div>

            {/* 감자튀김 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "1476px", top: "1536px", width: "349px" }}
            >
              <Image src="/images/faq/faq-fries.png" alt="" width={764} height={1080} style={{ width: "349px", height: "auto" }} />
            </div>

            {/* 햄버거 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "1093px", top: "1776px", width: "599px" }}
            >
              <Image src="/images/faq/faq-hamburger.png" alt="" width={814} height={801} style={{ width: "599px", height: "auto" }} />
            </div>

            {/* 쿠키 */}
            <div
              className="absolute pointer-events-none"
              style={{ left: "1626px", top: "1827px", width: "499px" }}
            >
              <Image src="/images/faq/faq-cookie.png" alt="" width={851} height={783} style={{ width: "499px", height: "auto" }} />
            </div>

            {/* ═══════ 폰 영역 ═══════ */}

            {/* 폰 스크린 배경 (흰색) */}
            <div
              className="absolute bg-white"
              style={{
                left: "570px",
                top: "537px",
                width: "781px",
                height: "1399px",
                borderRadius: "40px",
                zIndex: 2,
              }}
            />

            {/* 폰 하단 입력 바 배경 */}
            <div
              className="absolute bg-white"
              style={{
                left: "570px",
                top: "1796px",
                width: "781px",
                height: "144px",
                borderBottomLeftRadius: "40px",
                borderBottomRightRadius: "40px",
                zIndex: 8,
              }}
            />

            {/* 메시지 입력 필드 */}
            <div
              className="absolute flex items-center"
              style={{
                left: "690px",
                top: "1833px",
                width: "427px",
                height: "70px",
                background: "#EEEDE9",
                borderRadius: "30px",
                zIndex: 9,
              }}
            >
              <span
                className="text-[#ADADAD] font-medium"
                style={{ fontSize: "16px", letterSpacing: "-0.32px", marginLeft: "30px" }}
              >
                Type Message
              </span>
            </div>

            {/* 폰 프레임 (베젤) */}
            <Image
              src="/images/faq/faq-phone-frame.png"
              alt=""
              width={1562}
              height={3116}
              className="absolute pointer-events-none select-none"
              style={{ left: "570px", top: "382px", width: "781px", height: "auto", zIndex: 10 }}
              priority
            />

            {/* ═══════ 답변 로고 ═══════ */}
            {[678, 894, 1110, 1426, 1617].map((top, i) => (
              <div
                key={`logo-${i}`}
                className="absolute"
                style={{ left: "620px", top: `${top}px`, width: "42px", height: "42px", zIndex: 12 }}
              >
                <Image
                  src="/images/faq/faq-answer-logo.png"
                  alt=""
                  width={42}
                  height={42}
                  className="rounded-full"
                  style={{ width: "42px", height: "42px" }}
                />
              </div>
            ))}

            {/* ═══════ 질문 버블 (보라색) ═══════ */}

            {/* Q1 */}
            <div className={bubble(0).className} style={{ ...bubble(0).style, left: "1077px", top: "607px", zIndex: 15 }}>
              <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
                <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                  <span className="font-bold text-white">설비는 무료</span>로 제공되나요?
                </p>
              </div>
            </div>

            {/* Q2 */}
            <div className={bubble(2).className} style={{ ...bubble(2).style, left: "1012px", top: "823px", zIndex: 15 }}>
              <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
                <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                  주문한 간식은 <span className="font-bold text-white">한꺼번에 배송</span>되나요?
                </p>
              </div>
            </div>

            {/* Q3 */}
            <div className={bubble(4).className} style={{ ...bubble(4).style, left: "889px", top: "1039px", zIndex: 15 }}>
              <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
                <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                  먹지 않은 간식이나 간식이 <span className="font-bold text-white">마음에 들지 않으면</span> 어쩌죠?
                </p>
              </div>
            </div>

            {/* Q4 */}
            <div className={bubble(7).className} style={{ ...bubble(7).style, left: "1057px", top: "1355px", zIndex: 15 }}>
              <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
                <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                  <span className="font-bold text-white">피드백 전달</span>은 어떻게 하나요?
                </p>
              </div>
            </div>

            {/* Q5 */}
            <div className={bubble(9).className} style={{ ...bubble(9).style, left: "1107px", top: "1546px", zIndex: 15 }}>
              <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
                <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                  <span className="font-bold text-white">결제</span>는 어떻게 하나요?
                </p>
              </div>
            </div>

            {/* ═══════ 답변 버블 (흰색) ═══════ */}

            {/* A1 */}
            <div className={bubble(1).className} style={{ ...bubble(1).style, left: "677px", top: "678px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  편리하고 깨끗한 간식 공간을 가질 수 있도록<br />
                  스낵왕에서는 컨설팅 후 딱 맞는<br />
                  다양한 설비를 무료로 임대해드립니다.
                </p>
              </div>
            </div>

            {/* A2 */}
            <div className={bubble(3).className} style={{ ...bubble(3).style, left: "677px", top: "894px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  첫 주문 시 스낵왕 자체 데이터를 통해 큐레이션 되며,<br />
                  지속적으로 스낵왕 매니저가 선호, 비선호 간식을 모니터링하여<br />
                  고객 피드백 반영과 함께 매달 다양한 큐레이션이 제공됩니다.
                </p>
              </div>
            </div>

            {/* A3 */}
            <div className={bubble(5).className} style={{ ...bubble(5).style, left: "677px", top: "1110px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  스낵왕 방문 관리 서비스를 이용 시<br />
                  비선호 간식은 선호 간식으로 대체 되거나<br />
                  교환 · 환불을 해드립니다.
                </p>
              </div>
            </div>

            {/* A3 continued */}
            <div className={bubble(6).className} style={{ ...bubble(6).style, left: "677px", top: "1235px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  또한 교환 · 환불은 스낵왕에서는 무료로<br />
                  진행됩니다.
                </p>
              </div>
            </div>

            {/* A4 */}
            <div className={bubble(8).className} style={{ ...bubble(8).style, left: "677px", top: "1426px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  전용 피드백 페이지를 공유해드리며 1:1 전담 매니저를 통해<br />
                  24시간 지속적으로 피드백 전달이 가능합니다.
                </p>
              </div>
            </div>

            {/* A5 */}
            <div className={bubble(10).className} style={{ ...bubble(10).style, left: "677px", top: "1617px", zIndex: 15 }}>
              <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
                <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                  <span className="font-extrabold">방문 관리 서비스 :</span> 해당하는 월에 제공되는 간식을 월말에 계산<br />
                  <span className="font-extrabold">정기 구독 서비스 :</span> 상담 후 구독 개월 수에 맞게 결제,<br />
                  원하는 날짜에 배송 및 중도 취소가 가능합니다.
                </p>
              </div>
            </div>

            {/* ═══════ CTA 버튼 ═══════ */}
            <div className="absolute" style={{ left: "1137px", top: "1833px", zIndex: 15 }}>
              <button
                className="bg-[#151515] text-white border border-white font-bold hover:bg-[#333] transition-colors"
                style={{
                  height: "70px",
                  paddingLeft: "34px",
                  paddingRight: "34px",
                  fontSize: "18px",
                  letterSpacing: "-0.36px",
                  borderRadius: "100px",
                  lineHeight: "20px",
                }}
              >
                지금 문의하기
              </button>
            </div>
          </div>
        </div>{/* 스케일 래퍼 닫기 */}
      </section>{/* 데스크톱 section 닫기 */}

      {/* ══════════════════════════════════════════════════ */}
      {/* 모바일 레이아웃 (~lg): 아코디언 FAQ */}
      {/* ══════════════════════════════════════════════════ */}
      <section
        className="relative lg:hidden"
        style={{ marginBottom: "-100px" }}
      >
        {/* 파란 상단 영역 + 타이틀 */}
        <div className="bg-[#02ACEA] rounded-t-[40px] px-5 pt-14 pb-6">
          <p className="text-center text-white/60 font-medium text-[14px] tracking-[-0.28px]">
            Q&A
          </p>
          <p className="mt-3 text-center text-white text-[24px] leading-[1.3] tracking-[-0.48px]">
            <span className="font-medium">한 입에 쏙! </span>
            <span className="font-extrabold">궁금증을 해결해드립니다.</span>
          </p>
        </div>

        {/* 아코디언 카드 리스트 (파란 배경 위) */}
        <div className="bg-[#02ACEA] px-5 pb-10">
          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[20px] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  >
                    <span className="font-bold text-[#1d1d1d] text-[15px] leading-[1.4] tracking-[-0.3px]">
                      {item.q}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="#1d1d1d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-4">
                      <div className="h-px bg-[#eee] mb-3" />
                      <p className="text-[#424242] text-[14px] font-medium leading-[1.6] tracking-[-0.28px]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 노란 하단 영역 + CTA */}
        <div
          className="bg-[#FFC845] px-5 pt-10 pb-14 text-center"
          style={{ borderRadius: "40% 40% 0 0 / 30px 30px 0 0" }}
        >
          <button
            className="bg-[#151515] text-white font-bold text-[16px] tracking-[-0.32px] px-8 py-4 rounded-full border border-white hover:bg-[#333] transition-colors"
          >
            지금 문의하기
          </button>
        </div>
      </section>
    </>
  );
}
