"use client";

import Image from "next/image";

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
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px] py-[80px] md:py-[120px] lg:py-[180px]">
        <div className="mx-auto max-w-[1132px] flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
          {/* 좌측 텍스트 */}
          <div className="flex-shrink-0 lg:w-[400px]">
            <span className="text-[#02ACEA] text-[14px] md:text-[16px] lg:text-[18px] font-bold tracking-[-0.02em]">
              고민중이세요?
            </span>
            <h2 className="mt-3 md:mt-4 text-[#F8F8F9] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.4] tracking-[-0.015em]">
              이건 정말
              <br />
              고민할 필요 없는 한 입
            </h2>
            <p className="mt-4 md:mt-5 text-[#F8F8F9] text-[16px] md:text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] leading-[1.4]">
              스낵왕에서 맛있는 행복이 담긴 한 입을 시작하세요!
            </p>
          </div>

          {/* 우측 카드 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 flex-1">
            {STATS_CARDS.map((card, i) => (
              <div
                key={i}
                className="relative rounded-[20px] md:rounded-[25px] p-[20px] md:p-[25px] lg:p-[30px] flex flex-col justify-between min-h-[200px] md:min-h-[280px] lg:min-h-[350px]"
                style={{ backgroundColor: card.bg }}
              >
                <div>
                  <h3 className="text-white text-[22px] md:text-[26px] lg:text-[32px] font-extrabold leading-[1.4] tracking-[-0.015em]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-white text-[14px] md:text-[18px] lg:text-[24px] font-medium leading-[1.4] tracking-[-0.02em] whitespace-pre-line">
                    {card.desc}
                  </p>
                </div>
                <div className="self-end mt-4">
                  <Image
                    src={card.icon}
                    alt=""
                    width={card.iconW}
                    height={card.iconH}
                    className="w-[40px] md:w-[55px] lg:w-[70px] h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
