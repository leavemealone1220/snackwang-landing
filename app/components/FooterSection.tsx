import Image from "next/image";

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#9E9E9E" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="#9E9E9E" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="#9E9E9E" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="#9E9E9E" strokeWidth="1.5" fill="none" />
      <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="#9E9E9E" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="bg-[#151515]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-[60px] py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
          {/* 좌측: 회사 정보 */}
          <div className="flex-1">
            {/* 로고 + 버튼 */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-white text-[28px] md:text-[36px] font-extrabold tracking-[-0.02em]">
                feliz
              </span>
              <div className="flex gap-2">
                <a href="/apply/partnership" className="bg-[#323232] text-white rounded-full px-[16px] py-[8px] md:px-[20px] md:py-[10px] text-[12px] md:text-[14px] font-bold tracking-[-0.02em] hover:bg-[#444] transition-colors">
                  제휴 신청하기
                </a>
                <a href="/apply/partnership" className="bg-[#006185] text-white rounded-full px-[16px] py-[8px] md:px-[20px] md:py-[10px] text-[12px] md:text-[14px] font-bold tracking-[-0.02em] hover:opacity-90 transition-opacity">
                  입점 신청하기
                </a>
              </div>
            </div>

            {/* 회사 정보 */}
            <div className="mt-6 md:mt-8 space-y-1">
              <div className="flex flex-wrap gap-x-4 text-[#9E9E9E] text-[12px] md:text-[14px] tracking-[-0.02em] leading-[1.3]">
                <span>상호명 : (주)펠리즈</span>
                <span>대표자 : 이준하</span>
              </div>
              <p className="text-[#9E9E9E] text-[12px] md:text-[14px] tracking-[-0.02em] leading-[1.3]">
                사업자 등록 번호 : 232-86-01857
              </p>
              <p className="text-[#9E9E9E] text-[12px] md:text-[14px] tracking-[-0.02em] leading-[1.4]">
                본사 : 부산시 기장군 기장해안로98, A210호
                <br />
                수도권 : 경기도 하남시 신우실로 100, 327~328
              </p>
            </div>

            {/* 저작권 */}
            <p className="mt-4 text-[#545454] text-[12px] md:text-[14px] tracking-[-0.02em]">
              ⓒ Copyright 2021 Feliz Inc. All right reserved.
            </p>

            {/* 소셜 아이콘 */}
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity">
                <IconInstagram />
              </a>
              <a href="#" aria-label="YouTube" className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity">
                <IconYouTube />
              </a>
              <a href="#" aria-label="Facebook" className="w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity">
                <IconFacebook />
              </a>
            </div>
          </div>

          {/* 중앙: 고객센터 + 서비스 안내 */}
          <div className="flex gap-[40px] md:gap-[60px]">
            {/* 고객센터 */}
            <div>
              <h4 className="text-white text-[16px] md:text-[18px] font-semibold tracking-[-0.02em]">
                고객센터
              </h4>
              <div className="mt-4 md:mt-5 space-y-2">
                <p className="text-[#9E9E9E] text-[14px] md:text-[16px] font-bold tracking-[-0.02em]">
                  1533-6557
                </p>
                <p className="text-[#9E9E9E] text-[12px] md:text-[14px] tracking-[-0.02em] leading-[1.3]">
                  운영시간 :
                  <br />
                  10:00 ~ 19:00 (주말, 공휴일 휴무)
                </p>
              </div>
            </div>

            {/* 서비스 안내 */}
            <div>
              <h4 className="text-white text-[16px] md:text-[18px] font-semibold tracking-[-0.02em]">
                서비스 안내
              </h4>
              <div className="mt-4 md:mt-5 space-y-2">
                <a href="#" className="block text-[#9E9E9E] text-[14px] md:text-[16px] tracking-[-0.02em] hover:text-white transition-colors">
                  스낵왕
                </a>
                <a href="#" className="block text-[#9E9E9E] text-[14px] md:text-[16px] tracking-[-0.02em] hover:text-white transition-colors">
                  스낵왕 스토어
                </a>
                <a href="#" className="block text-[#9E9E9E] text-[14px] md:text-[16px] tracking-[-0.02em] hover:text-white transition-colors">
                  공간 관리
                </a>
              </div>
            </div>
          </div>

          {/* 우측: 입점 문의 카드 */}
          <div className="w-full lg:w-[560px] flex-shrink-0">
            <div className="bg-[#222222] rounded-[30px] md:rounded-[40px] p-[24px] md:p-[30px]">
              {/* 타이틀 */}
              <div className="flex items-center gap-2">
                <Image
                  src="/images/cta/cta-fishbread.png"
                  alt=""
                  width={87}
                  height={63}
                  className="w-[22px] md:w-[30px] h-auto"
                />
                <h4 className="text-white text-[18px] md:text-[24px] font-bold tracking-[-0.02em]">
                  간식 입점 문의하기
                </h4>
              </div>
              <p className="mt-2 md:mt-3 text-[#9E9E9E] text-[12px] md:text-[14px] tracking-[-0.02em] leading-[1.4]">
                사내 간식을 판매하고 싶으신가요?
                <br />
                브랜드 간식 입점을 원하신다면 지금 바로 문의해보세요.
              </p>

              {/* 이메일 입력 */}
              <div className="mt-4 md:mt-5 flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-[#323232] text-[#F8F8F9] placeholder-[#4D4D4D] rounded-[12px] px-[12px] md:px-[15px] py-[14px] md:py-[17px] text-[16px] md:text-[24px] tracking-[-0.017em] outline-none focus:ring-1 focus:ring-[#FF6D39]"
                />
                <button
                  aria-label="보내기"
                  className="w-[48px] md:w-[60px] h-[48px] md:h-[60px] bg-[#FF6D39] rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <svg width="16" height="30" viewBox="0 0 16 30" fill="none" className="w-[12px] md:w-[16px] h-auto">
                    <path d="M2 2L14 15L2 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
