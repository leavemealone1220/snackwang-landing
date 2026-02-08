import Image from "next/image";

export function FinalCTASection() {
  return (
    <section className="bg-[#F6F5EE]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px] py-[80px] md:py-[120px] lg:py-[180px]">
        <div className="mx-auto max-w-[820px] text-center">
          {/* 헤드라인 – Bagel Fat One */}
          <div className="relative inline-block">
            {/* 1행: 출근 [넥타이] 견디게 하는 건 */}
            <div className="flex items-center justify-center flex-nowrap gap-x-1">
              <span className="font-display text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] text-[#151515] leading-[1.4] tracking-[-0.017em]">
                출근
              </span>
              <Image
                src="/images/cta/cta-necktie.png"
                alt=""
                width={34}
                height={90}
                className="inline-block w-[12px] sm:w-[16px] md:w-[24px] lg:w-[34px] h-auto mx-1"
              />
              <span className="font-display text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] text-[#151515] leading-[1.4] tracking-[-0.017em]">
                견디게 하는 건
              </span>
            </div>

            {/* 2행: 결국 [토스트][수박][붕어빵] 한 입 이었다. */}
            <div className="flex items-center justify-center flex-nowrap gap-x-1">
              <span className="font-display text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] text-[#151515] leading-[1.4] tracking-[-0.017em]">
                결국
              </span>
              <Image
                src="/images/cta/cta-toast.png"
                alt=""
                width={94}
                height={64}
                className="inline-block w-[34px] sm:w-[44px] md:w-[66px] lg:w-[94px] h-auto mx-0.5 sm:mx-1"
              />
              <Image
                src="/images/cta/cta-watermelon.png"
                alt=""
                width={378}
                height={387}
                className="inline-block w-[24px] sm:w-[30px] md:w-[44px] lg:w-[62px] h-auto mx-0.5 sm:mx-1"
              />
              <Image
                src="/images/cta/cta-fishbread.png"
                alt=""
                width={87}
                height={63}
                className="inline-block w-[30px] sm:w-[40px] md:w-[60px] lg:w-[87px] h-auto mx-0.5 sm:mx-1"
              />
              <span className="font-display text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] text-[#151515] leading-[1.4] tracking-[-0.017em]">
                한 입 이었다.
              </span>
            </div>
          </div>

          {/* 서브 텍스트 */}
          <p className="mt-5 md:mt-6 text-[#151515] text-[14px] md:text-[18px] lg:text-[24px] font-medium tracking-[-0.02em] leading-[1.4]">
            출근을 견디게 하는 작은 변화, 매달 새로워지는 한 입을 신청하세요!
          </p>

          {/* CTA 버튼 */}
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <button className="bg-[#7B79FF] text-[#F8F8F9] rounded-full px-[20px] py-[14px] md:px-[28px] md:py-[18px] text-[13px] md:text-[14px] lg:text-[16px] font-bold tracking-[-0.02em] hover:opacity-90 transition-opacity">
              샘플 큐레이션 보기
            </button>
            <button className="bg-[#FF6D39] text-[#F8F8F9] rounded-full px-[20px] py-[14px] md:px-[28px] md:py-[18px] text-[13px] md:text-[14px] lg:text-[16px] font-bold tracking-[-0.02em] hover:opacity-90 transition-opacity flex items-center gap-2">
              <Image
                src="/images/cta/cta-watermelon.png"
                alt=""
                width={378}
                height={387}
                className="w-[16px] md:w-[20px] lg:w-[23px] h-auto"
              />
              지금 신청하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
