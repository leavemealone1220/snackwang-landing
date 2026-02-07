"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * FAQ Section – 1920px 고정 레이아웃 (Figma px 값 그대로)
 *
 * Figma 기준점: Blue BG 좌상단 (절대 y=7369) = (0, 0)
 * 원본 노드: 1:10692 / 파일키: aEsmYRndNsOoXzftZLkHzB
 * Blue BG: 1920 x 2478, rounded-t 100px
 */

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [scale, setScale] = useState(1);

  /* 뷰포트 너비에 맞춰 1920px 레이아웃 축소 (양쪽 60px 여백 반영) */
  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(0.75, (window.innerWidth - 120) / 1920));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
    <section
      ref={sectionRef}
      className="relative"
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
        {/* Figma: left 314, top -52 (Blue BG 위로 삐져나옴), 303×304 */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: "314px",
            top: "-52px",
            width: "303px",
          }}
        >
          <Image
            src="/images/faq/faq-watermelon.png"
            alt=""
            width={378}
            height={387}
            style={{ width: "303px", height: "auto", transform: "rotate(-30deg)" }}
          />
        </div>

        {/* ── 1920px 고정 컨테이너 (배경 없음, 콘텐츠만) ── */}
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

          {/* 도넛 – Figma: left 272, top 645 (481+164), 300×282, rotate -20deg */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "272px", top: "645px", width: "300px" }}
          >
            <div style={{ transform: "rotate(-20deg)" }}>
              <Image src="/images/faq/faq-donut.png" alt="" width={799} height={751} style={{ width: "300px", height: "auto" }} />
            </div>
          </div>

          {/* 붕어빵 – Figma: left 1308, top 651, 250×182 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "1308px", top: "651px", width: "250px" }}
          >
            <Image src="/images/faq/faq-fishbread.png" alt="" width={469} height={342} style={{ width: "250px", height: "auto" }} />
          </div>

          {/* 도시락 – Figma: left 1219, top 1062 (898+164), 350×350, rotate 30deg */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "1219px", top: "1062px", width: "350px" }}
          >
            <div style={{ transform: "rotate(30deg)" }}>
              <Image src="/images/faq/faq-lunchbox.png" alt="" width={2095} height={2122} style={{ width: "350px", height: "auto" }} />
            </div>
          </div>

          {/* ═══════ 음식 장식 (노란 영역) ═══════ */}

          {/* 아이스크림 – Figma: left 196, top 1521, 299×725 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "196px", top: "1521px", width: "299px" }}
          >
            <Image src="/images/faq/faq-icecream.png" alt="" width={559} height={1356} style={{ width: "299px", height: "auto" }} />
          </div>

          {/* 샐러드 – Figma: left -73, top 1748, 399×507 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "-73px", top: "1748px", width: "399px" }}
          >
            <Image src="/images/faq/faq-salad.png" alt="" width={316} height={408} style={{ width: "399px", height: "auto" }} />
          </div>

          {/* 핫도그 – Figma: top 1784, rotate 158.96deg scaleY(-1) */}
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

          {/* 감자튀김 – Figma: left 1476, top 1536, 349×493 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "1476px", top: "1536px", width: "349px" }}
          >
            <Image src="/images/faq/faq-fries.png" alt="" width={764} height={1080} style={{ width: "349px", height: "auto" }} />
          </div>

          {/* 햄버거 – Figma: left 1093, top 1776, 599×589 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "1093px", top: "1776px", width: "599px" }}
          >
            <Image src="/images/faq/faq-hamburger.png" alt="" width={814} height={801} style={{ width: "599px", height: "auto" }} />
          </div>

          {/* 쿠키 – Figma: left 1626, top 1827, 499×459 */}
          <div
            className="absolute pointer-events-none"
            style={{ left: "1626px", top: "1827px", width: "499px" }}
          >
            <Image src="/images/faq/faq-cookie.png" alt="" width={851} height={783} style={{ width: "499px", height: "auto" }} />
          </div>

          {/* ═══════ 폰 영역 ═══════ */}

          {/* 폰 스크린 배경 (흰색) – Figma: left 570, top 537, 781×1399 */}
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

          {/* 폰 하단 입력 바 배경 – Figma: left 570, top 1796, 781×144 */}
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

          {/* 메시지 입력 필드 – Figma: left 690, top 1833, 427×70, bg #EEEDE9 */}
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

          {/* 폰 프레임 (베젤) – Figma: left 570, top 382, 781×1558 */}
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
          {/* Figma: left 620, size 42×42, tops: 678/894/1110/1426/1617 */}
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

          {/* ═══════ 질문 버블 (보라색, #7B79FF) ═══════ */}

          {/* Q1: 설비는 무료로 제공되나요? – left 1077, top 607 */}
          <div className={bubble(0).className} style={{ ...bubble(0).style, left: "1077px", top: "607px", zIndex: 15 }}>
            <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
              <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                <span className="font-bold text-white">설비는 무료</span>로 제공되나요?
              </p>
            </div>
          </div>

          {/* Q2: 주문한 간식은 한꺼번에 배송되나요? – left 1012, top 823 */}
          <div className={bubble(2).className} style={{ ...bubble(2).style, left: "1012px", top: "823px", zIndex: 15 }}>
            <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
              <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                주문한 간식은 <span className="font-bold text-white">한꺼번에 배송</span>되나요?
              </p>
            </div>
          </div>

          {/* Q3: 먹지 않은 간식이나... – left 889, top 1039 */}
          <div className={bubble(4).className} style={{ ...bubble(4).style, left: "889px", top: "1039px", zIndex: 15 }}>
            <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
              <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                먹지 않은 간식이나 간식이 <span className="font-bold text-white">마음에 들지 않으면</span> 어쩌죠?
              </p>
            </div>
          </div>

          {/* Q4: 피드백 전달은... – left 1057, top 1355 */}
          <div className={bubble(7).className} style={{ ...bubble(7).style, left: "1057px", top: "1355px", zIndex: 15 }}>
            <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
              <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                <span className="font-bold text-white">피드백 전달</span>은 어떻게 하나요?
              </p>
            </div>
          </div>

          {/* Q5: 결제는... – left 1107, top 1546 */}
          <div className={bubble(9).className} style={{ ...bubble(9).style, left: "1107px", top: "1546px", zIndex: 15 }}>
            <div className="bg-[#7B79FF] rounded-[25px] rounded-tr-none px-[20px] py-[15px]">
              <p className="text-[#C6C5FF] text-[18px] font-medium leading-normal tracking-[-0.36px]">
                <span className="font-bold text-white">결제</span>는 어떻게 하나요?
              </p>
            </div>
          </div>

          {/* ═══════ 답변 버블 (흰색) ═══════ */}

          {/* A1 – left 677, top 678 */}
          <div className={bubble(1).className} style={{ ...bubble(1).style, left: "677px", top: "678px", zIndex: 15 }}>
            <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
              <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                편리하고 깨끗한 간식 공간을 가질 수 있도록<br />
                스낵왕에서는 컨설팅 후 딱 맞는<br />
                다양한 설비를 무료로 임대해드립니다.
              </p>
            </div>
          </div>

          {/* A2 – left 677, top 894 */}
          <div className={bubble(3).className} style={{ ...bubble(3).style, left: "677px", top: "894px", zIndex: 15 }}>
            <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
              <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                첫 주문 시 스낵왕 자체 데이터를 통해 큐레이션 되며,<br />
                지속적으로 스낵왕 매니저가 선호, 비선호 간식을 모니터링하여<br />
                고객 피드백 반영과 함께 매달 다양한 큐레이션이 제공됩니다.
              </p>
            </div>
          </div>

          {/* A3 – left 677, top 1110 */}
          <div className={bubble(5).className} style={{ ...bubble(5).style, left: "677px", top: "1110px", zIndex: 15 }}>
            <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
              <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                스낵왕 방문 관리 서비스를 이용 시<br />
                비선호 간식은 선호 간식으로 대체 되거나<br />
                교환 · 환불을 해드립니다.
              </p>
            </div>
          </div>

          {/* A4 (continued, 모든 모서리 둥글게) – left 677, top 1235 */}
          <div className={bubble(6).className} style={{ ...bubble(6).style, left: "677px", top: "1235px", zIndex: 15 }}>
            <div className="bg-white rounded-[25px] p-[20px]">
              <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                또한 교환 · 환불은 스낵왕에서는 무료로<br />
                진행됩니다.
              </p>
            </div>
          </div>

          {/* A5 – left 677, top 1426 */}
          <div className={bubble(8).className} style={{ ...bubble(8).style, left: "677px", top: "1426px", zIndex: 15 }}>
            <div className="bg-white rounded-[25px] rounded-tl-none p-[20px]">
              <p className="text-[#424242] text-[18px] font-medium leading-[1.4] tracking-[-0.36px] whitespace-nowrap">
                전용 피드백 페이지를 공유해드리며 1:1 전담 매니저를 통해<br />
                24시간 지속적으로 피드백 전달이 가능합니다.
              </p>
            </div>
          </div>

          {/* A6 – left 677, top 1617 */}
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
          {/* Figma: left 1137, top 1833, h 70 */}
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
    </section>
  );
}
