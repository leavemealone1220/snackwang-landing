import Image from "next/image";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "50,000원",
    period: "월 / VAT 별도",
    highlight: "소규모 팀 / 테스트 운영에 적합",
    features: ["간식 구독 시작용 기본 플랜", "월 1회 배송", "기본 간식 라인업 제공"],
    buttonLabel: "Starter로 시작하기",
    buttonColor: "bg-accent", // 주황
  },
  {
    id: "standard",
    name: "Standard",
    price: "150,000원",
    period: "월 / VAT 별도",
    highlight: "성장 중인 팀을 위한 베스트",
    features: ["팀 규모에 맞춘 간식 구성", "월 2회 배송", "테마 간식/시즌 한정 간식 포함"],
    buttonLabel: "Standard로 신청하기",
    buttonColor: "bg-accent-blue", // 파랑
  },
  {
    id: "premium",
    name: "Premium",
    price: "500,000원",
    period: "월 / VAT 별도",
    highlight: "복지 강화 / 방문 고객 대응용",
    features: ["프리미엄 간식 & 음료 구성", "월 4회 배송", "전용 담당 매니저 배정"],
    buttonLabel: "Premium 상담 요청",
    buttonColor: "bg-accent-green", // 초록
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#1d1d1d] pb-[180px] pt-[4rem] text-white sm:pb-[220px] md:pb-[300px] md:pt-[6rem] rounded-t-[48px] md:rounded-t-[60px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        <div className="flex flex-col items-center gap-6 md:gap-10">
          {/* 상단 타이틀 */}
          <div className="text-center">
            <p className="text-sm font-medium text-accent-blue md:text-base">
              요금소개
            </p>
            <h2 className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-white md:text-[28px]">
              우리 팀에 딱 맞게,{" "}
              <span className="font-extrabold">골라보세요!</span>
            </h2>
          </div>

          {/* 요금제 카드 */}
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row md:gap-6">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className="flex w-full max-w-[280px] flex-col items-center text-left sm:max-w-[300px] md:max-w-[320px]"
              >
                {/* Figma에서 추출한 카드 전체 이미지 그대로 사용 */}
                <div className="w-full">
                  <Image
                    src={`/images/pricing/pricing-card-${plan.id}.png`}
                    alt={`${plan.name} 플랜 카드`}
                    width={320}
                    height={420}
                    className="h-auto w-full"
                  />
                </div>

                {/* 화면에는 안 보이지만, 접근성용 텍스트 */}
                <p className="sr-only">
                  {plan.name} 플랜, 가격 {plan.price}, {plan.period}. {plan.highlight}.
                  {plan.features.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

