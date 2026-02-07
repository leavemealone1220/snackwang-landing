"use client";

import Image from "next/image";

/**
 * Stats Section – Figma 픽셀 기준 재구현
 * 노드: 1:2360 / 파일키: aEsmYRndNsOoXzftZLkHzB
 * 섹션: 1920 x 1038, bg #313131, rounded-top
 * 콘텐츠 영역: max-w 1132px, 좌우 394px 여백 (1920 기준)
 */

const STATS_CARDS = [
  {
    bg: "#02ACEA",
    title: "또 한번",
    desc: "98% 확률의\n재계약 성사율",
    icon: "/images/stats/stats-icon-01.png",
    iconW: 69,
    iconH: 59,
  },
  {
    bg: "#F8C641",
    title: "높은 만족도",
    desc: "전체 고객사 만족도 95%",
    icon: "/images/stats/stats-icon-02.png",
    iconW: 69,
    iconH: 64,
  },
  {
    bg: "#44AE61",
    title: "5000+",
    desc: "다양한 카테고리 및\n상품 수",
    icon: "/images/stats/stats-icon-03.png",
    iconW: 90,
    iconH: 66,
  },
  {
    bg: "#7D79FF",
    title: "낮에도 밤에도",
    desc: "원하는 시간에 맞추는\n간식 배송",
    icon: "/images/stats/stats-icon-04.png",
    iconW: 110,
    iconH: 68,
  },
];

export function StatsSection() {
  return (
    <section className="relative z-[2] rounded-t-[48px] md:rounded-t-[60px] bg-[#313131] overflow-hidden">
      <div className="mx-auto w-full max-w-[1132px] px-4 md:px-[30px] lg:px-0 pt-[120px] md:pt-[150px] lg:pt-[180px] pb-[100px] md:pb-[130px] lg:pb-[160px]">
        {/* 텍스트 영역 (Figma: 세로 스택, 카드 위에 배치) */}
        <div>
          <span
            className="text-[#02ACEA] font-bold tracking-[-0.36px]"
            style={{ fontSize: "18px" }}
          >
            고민중이세요?
          </span>
          <h2
            className="mt-[40px] text-[#F8F8F9] leading-[1.4] tracking-[-0.72px]"
            style={{ fontSize: "48px" }}
          >
            <span className="font-normal">이건 정말</span>
            <br />
            <span className="font-extrabold">고민할 필요 없는 한 입</span>
          </h2>
          <p
            className="mt-[30px] text-[#F8F8F9] font-medium leading-[1.4] tracking-[-0.48px]"
            style={{ fontSize: "24px" }}
          >
            스낵왕에서 맛있는 행복이 담긴 한 입을 시작하세요!
          </p>
        </div>

        {/* 카드 그리드 (Figma: 268×350, gap 20, 항상 4열) */}
        <div className="mt-[70px] grid grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {STATS_CARDS.map((card, i) => (
            <div
              key={i}
              className="relative rounded-[25px] p-[30px] flex flex-col justify-between"
              style={{ backgroundColor: card.bg, minHeight: "350px" }}
            >
              <div>
                <h3
                  className="text-white font-extrabold leading-[1.4] tracking-[-0.48px]"
                  style={{ fontSize: "32px" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-[10px] text-white font-medium leading-[1.4] tracking-[-0.48px] whitespace-pre-line"
                  style={{ fontSize: "24px" }}
                >
                  {card.desc}
                </p>
              </div>
              <div className="self-end mt-4">
                <Image
                  src={card.icon}
                  alt=""
                  width={card.iconW}
                  height={card.iconH}
                  style={{ width: `${card.iconW}px`, height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
