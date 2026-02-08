import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white min-h-[600px] md:min-h-[1080px]">
      {/* 배경(이미지 자리) + 딤 오버레이 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/Hero-Image.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="mx-auto flex min-h-[inherit] w-full max-w-[1920px] flex-col px-4 md:px-[60px]">
        {/* 상단 헤더 (반응형: container + flex) */}
        <header className="flex items-center justify-between py-6">
          {/* 좌측: 로고 + 네비게이션 (Figma: gap 30px) */}
          <div className="flex items-center gap-[30px]">
            <Image
              src="/images/hero/logo.svg"
              alt="snackwang"
              width={180}
              height={35}
              priority
              className="h-[28px] w-auto md:h-[35px]"
            />

            <nav className="hidden items-center gap-[40px] rounded-full bg-[#1d1d1d] px-[40px] h-[56px] text-[16px] font-medium leading-[18px] tracking-[-0.32px] text-[#f8f8f9] md:flex">
              <a href="#intro">서비스 소개</a>
              <a href="#faq">F&amp;Q</a>
              <a href="#contact">문의하기</a>
            </nav>
          </div>

          {/* 우측: 버튼 그룹 (Figma: gap 30px) */}
          <div className="flex items-center gap-[10px] md:gap-[30px]">
            <a
              className="hidden items-center justify-center rounded-full bg-[#f8f8f9] text-[#02acea] font-bold transition hover:bg-white md:inline-flex h-[56px] px-[28px] py-[20px] text-[16px] leading-[16px] tracking-[-0.32px]"
              href="/docs/스낵왕_서비스소개서.pdf"
              download
            >
              서비스 소개서 받기
            </a>
            <a
              className="inline-flex items-center justify-center gap-[4px] md:gap-[6px] rounded-full bg-[#02acea] text-[#f8f8f9] font-bold transition hover:brightness-110 h-[44px] px-[16px] py-[12px] text-[13px] leading-[16px] tracking-[-0.32px] md:h-[56px] md:px-[28px] md:py-[20px] md:text-[16px]"
              href="#b2b"
            >
              <Image
                src="/images/hero/hero-icon-b2b@2x.png"
                alt=""
                width={25}
                height={18}
                className="h-[14px] w-auto md:h-[18px]"
              />
              기업 간식 관리
            </a>
          </div>
        </header>

        {/* 히어로 본문 (반응형) */}
        <div className="flex flex-1 flex-col items-center justify-center pb-20 pt-10 text-center md:pb-28">
          <h1 className="font-display text-[32px] leading-[1.15] tracking-[-0.02em] sm:text-[52px] md:text-[72px] md:leading-[1.1] lg:text-[80px]">
            <span className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              출근
              <Image
                src="/images/hero/hero-tie@2x.png"
                alt=""
                width={34}
                height={90}
                className="h-[36px] w-auto sm:h-[44px] md:h-[72px]"
              />
              견디게 하는 건
            </span>
            <span className="mt-3 block md:mt-4">
              결국{" "}
              <span className="inline-flex items-end gap-2 sm:gap-3 align-middle">
                <Image
                  src="/images/hero/hero-icon-toast@2x.png"
                  alt=""
                  width={94}
                  height={64}
                  className="h-[22px] w-auto sm:h-[34px] md:h-[54px]"
                />
                <Image
                  src="/images/hero/hero-icon-watermelon@2x.png"
                  alt=""
                  width={62}
                  height={63}
                  className="h-[22px] w-auto sm:h-[34px] md:h-[54px]"
                />
                <Image
                  src="/images/hero/hero-icon-snack@2x.png"
                  alt=""
                  width={87}
                  height={63}
                  className="h-[22px] w-auto sm:h-[34px] md:h-[54px]"
                />
              </span>{" "}
              한 입 이었다.
            </span>
          </h1>

          <p className="mt-6 max-w-[42rem] whitespace-pre-wrap text-base font-medium leading-relaxed text-white/85 sm:text-lg md:mt-8 md:text-[24px] md:leading-[1.4] md:tracking-[-0.48px]">
            {"출근을 견디게 하는 작은 변화\n월 35만원으로 매달 새로워지는 간식 큐레이션!"}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row md:mt-12">
            <a
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-7 text-sm font-bold text-white shadow-sm transition hover:brightness-110 md:h-[56px] md:w-[172px] md:px-[28px] md:py-[20px] md:text-[16px] md:leading-[16px] md:tracking-[-0.32px]"
              href="#sample"
            >
              샘플 큐레이션 보기
            </a>
            <a
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-bold text-white shadow-sm transition hover:brightness-110 whitespace-nowrap md:h-[56px] md:w-[171px] md:px-[28px] md:py-[20px] md:text-[16px] md:leading-[16px] md:tracking-[-0.32px]"
              href="/apply"
            >
              <Image
                src="/images/hero/hero-icon-apply@2x.png"
                alt=""
                width={24}
                height={24}
                className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]"
              />
              지금 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

