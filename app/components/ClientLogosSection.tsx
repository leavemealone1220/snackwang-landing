import Image from "next/image";

export function ClientLogosSection() {
  return (
    <section className="bg-[#f6f5ee] py-[40px] md:py-section">
      {/* 1920px 기준으로 좌우 여백 없이 스트립 전체가 보이도록 확장 */}
      <div className="mx-auto w-full max-w-[1920px] px-0">
        {/* 상단 카피 */}
        <div className="text-center">
          <p className="text-sm font-medium text-blue md:text-base">
            우리의 고객사
          </p>
          <h2 className="mt-2 text-[24px] font-medium tracking-[-0.02em] text-black md:text-[32px]">
            그 한 입을 먼저{" "}
            <span className="font-extrabold">선택한 기업들입니다.</span>
          </h2>
          <p className="mt-3 text-sm font-bold text-black/70 md:text-base">
            오늘도 수백 개 사무실에, 스낵왕이 한 입의 힘을 전하고 있습니다.
          </p>
        </div>

        {/* 로고 스트립 - 무한 좌측 스크롤 */}
        <div className="mt-8 overflow-hidden md:mt-10">
          <div className="logos-marquee flex">
            {/* 동일한 스트립 이미지를 두 번 이어붙여 끊김 없이 루프 */}
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center">
                <Image
                  src="/images/client_logos/client-strip-1.png"
                  alt="스낵왕 고객사 로고 스트립"
                  width={4021}
                  height={264}
                  className="h-[100px] w-full sm:h-[130px] md:h-[182px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

