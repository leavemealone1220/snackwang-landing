import Image from "next/image";

export function CustomizationSection() {
  return (
    <section className="relative -mt-[6rem] bg-[#7b79ff] py-section text-white rounded-t-[48px] md:-mt-[8rem] md:rounded-t-[60px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px]">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* 상단 타이틀 */}
          <div className="text-center">
            <p className="text-sm font-medium text-accent-yellow md:text-base">
              🤩 이제 맞는 상자 커스터마이징
            </p>
            <h2 className="mt-2 text-[28px] font-extrabold leading-snug tracking-[-0.02em] text-white md:text-[40px]">
              땅! 맞는 설비 커스터마이징
            </h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              오늘도 수백 개 사무실에, 스낵왕이 한 입의 힘을 전하고 있습니다.
            </p>
          </div>

          {/* 평수별 선택 버튼 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 md:px-6 md:py-3 md:text-base"
            >
              전용 44.4㎡ (15평형)
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 md:px-6 md:py-3 md:text-base"
            >
              전용 62.2㎡ (25평형)
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 md:px-6 md:py-3 md:text-base"
            >
              전용 103.3㎡ (60평형)
            </button>
          </div>

          {/* 평면도 일러스트 (이미지 자리) */}
          <div className="mt-4 flex w-full max-w-4xl items-center justify-center md:mt-6">
            <div className="relative aspect-[10/7] w-full">
              <Image
                src="/images/customization/floorplan.png"
                alt="사무실 평면도 커스터마이징 예시"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 하단 CTA */}
          <a
            href="#customize"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-black/80 md:mt-8 md:px-10 md:py-5 md:text-base"
          >
            <span aria-hidden>👁</span>
            우리 사무실에 배치해보기
          </a>
        </div>
      </div>
    </section>
  );
}
