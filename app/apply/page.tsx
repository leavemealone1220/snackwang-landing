"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SERVICE_TYPES = [
  { id: "visit", label: "방문 관리", icon: "/images/apply/icon-visit.png", w: 40, h: 52 },
  { id: "delivery", label: "정기 택배", icon: "/images/apply/icon-delivery.png", w: 55, h: 55 },
  { id: "unmanned", label: "무인 편의점", icon: "/images/apply/icon-unmanned.png", w: 32, h: 50 },
  {
    id: "catering",
    label: "기업 행사",
    sublabel: "(케이터링)",
    icon: "/images/apply/icon-catering.png",
    w: 46,
    h: 70,
  },
];

const BUDGET_OPTIONS = [
  "50만원 미만",
  "50만원 ~ 100만원",
  "100만원 ~ 200만원",
  "200만원 ~ 500만원",
  "500만원 이상",
  "기타(별도 문의)",
];

const EMPLOYEE_OPTIONS = [
  "30명 이하",
  "30명 ~ 50명",
  "50명 ~ 100명",
  "100명 ~ 300명",
  "300명 이상",
  "기타(별도 문의)",
];

const SNACK_TYPES = [
  { id: "snack", label: "스낵 & 과자류", icon: "/images/apply/icon-snack.png", w: 52, h: 38 },
  { id: "drink", label: "음료 & 커피", icon: "/images/apply/icon-drink.png", w: 30, h: 60 },
  { id: "health", label: "건강 & 견과", icon: "/images/apply/icon-health.png", w: 38, h: 50 },
  { id: "fresh", label: "냉장 & 신선식품", icon: "/images/apply/icon-fresh.png", w: 55, h: 38 },
  { id: "ramen", label: "라면 & 간편식", icon: "/images/apply/icon-ramen.png", w: 38, h: 38 },
  { id: "suggest", label: "제안 요청", icon: "/images/apply/icon-suggest.png", w: 45, h: 38 },
];

export default function ApplyPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string | null>(null);
  const [selectedSnacks, setSelectedSnacks] = useState<string[]>([]);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [form, setForm] = useState({
    company: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    inquiry: "",
  });

  const toggleService = (id: string) => {
    setSelectedService((prev) => (prev === id ? null : id));
  };

  const toggleSnack = (id: string) => {
    setSelectedSnacks((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedService) {
      alert("서비스 형태를 선택해주세요.");
      return;
    }
    if (!form.company || !form.name || !form.phone || !form.email) {
      alert("담당자 정보를 모두 입력해주세요.");
      return;
    }
    if (!selectedBudget) {
      alert("월 예산을 선택해주세요.");
      return;
    }
    if (!selectedEmployees) {
      alert("임직원 수를 선택해주세요.");
      return;
    }
    if (!agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "apply",
          service: selectedService,
          ...form,
          budget: selectedBudget,
          employees: selectedEmployees,
          snacks: selectedSnacks,
        }),
      });

      if (res.ok) {
        alert("서비스 신청이 완료되었습니다. 담당 매니저가 2영업일 이내에 연락드리겠습니다.");
      } else {
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5ee]">
      {/* 헤더 */}
      <header className="mx-auto flex h-[60px] md:h-[100px] max-w-[1920px] items-center justify-between px-4 md:px-[60px]">
        <div className="flex items-center gap-[20px] md:gap-[30px]">
          <Link href="/">
            <Image
              src="/images/hero/logo.svg"
              alt="snackwang"
              width={180}
              height={35}
              priority
              className="h-[28px] w-auto md:h-[35px]"
            />
          </Link>
          <nav className="hidden items-center gap-[40px] rounded-full bg-[#1d1d1d] px-[40px] h-[56px] text-[16px] font-medium leading-[18px] tracking-[-0.32px] text-[#f8f8f9] md:flex">
            <Link href="/#intro">서비스 소개</Link>
            <Link href="/#faq">F&Q</Link>
            <Link href="/#contact">문의하기</Link>
          </nav>
        </div>
        <div className="flex items-center gap-[10px] md:gap-[20px]">
          <a
            className="hidden items-center justify-center rounded-full bg-[#eeede9] text-[#02acea] font-bold md:inline-flex h-[56px] px-[28px] py-[20px] text-[16px] leading-[16px] tracking-[-0.32px]"
            href="/docs/스낵왕_서비스소개서.pdf"
            download
          >
            서비스 소개서 받기
          </a>
          <a
            className="inline-flex items-center justify-center gap-[4px] md:gap-[6px] rounded-full bg-[#02acea] text-[#f8f8f9] font-bold h-[40px] px-[14px] text-[13px] md:h-[56px] md:px-[28px] md:py-[20px] md:text-[16px] leading-[16px] tracking-[-0.32px]"
            href="https://app.snackwang.com"
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

      {/* 본문 */}
      <div className="mx-auto max-w-[1920px] px-4 md:px-[60px] pb-[60px] md:pb-[120px]">
        {/* 타이틀 */}
        <h1 className="mt-[80px] md:mt-[180px] text-center text-[28px] md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
          서비스 신청하기
        </h1>

        {/* 탭 */}
        <div className="mt-[30px] md:mt-[70px] flex items-center justify-center gap-[8px] md:gap-[20px]">
          <div className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#02acea] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-[#f8f8f9]">
            서비스 신청하기
          </div>
          <Link href="/apply/inquiry" className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#eeede9] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-[#1d1d1d]">
            이용 문의하기
          </Link>
          <Link href="/apply/partnership" className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#eeede9] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-[#1d1d1d]">
            제휴 문의하기
          </Link>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="mx-auto max-w-[1360px]">
          {/* 서비스 신청 안내 */}
          <h2 className="mt-[50px] md:mt-[100px] text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
            서비스 신청 안내
          </h2>
          <div className="relative mt-[16px] md:mt-[24px] w-full rounded-[20px] md:rounded-[40px] bg-[#eeede9] px-[20px] py-[24px] md:px-[70px] md:h-[224px] md:flex md:items-center">
            <div className="text-[14px] md:text-[20px] font-medium leading-[1.6] tracking-[-0.02em] text-[#1d1d1d]">
              <p>
                신청을 완료해 주시면 담당 매니저가 내용을 확인하여{" "}
                <span className="font-bold">2영업일 이내에 연락</span>을 드립니다.
              </p>
              <p>남겨주신 예산 범위에 맞춰 최적의 간식 큐레이션과 견적을 제안해 드리며,</p>
              <p>상세한 서비스 구성까지 꼼꼼히 상담해 드릴 예정입니다.</p>
            </div>
            {/* 장식 이미지들 - 데스크톱에서만 */}
            <div className="hidden lg:block">
              <div className="absolute rounded-full bg-[rgba(217,217,217,0.8)]" style={{ right: 100, top: 86, width: 190, height: 92 }} />
              <div className="absolute z-[2]" style={{ right: 240, top: 66, width: 100, height: 112 }}>
                <Image
                  src="/images/apply/info-decor-character.png"
                  alt=""
                  width={100}
                  height={112}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute z-[1]" style={{ right: 184, top: 36, width: 80, height: 80 }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="30" fill="#FF6D39"/>
                  <path d="M43.7988 39H55L29 62L36.2012 42H25L51 19L43.7988 39Z" fill="white"/>
                </svg>
              </div>
              <div className="absolute flex items-center justify-center gap-[10px] rounded-full bg-[#44ae5a] px-[12px]" style={{ right: 301, top: 140, width: 102, height: 48 }}>
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* 서비스 형태 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                서비스 형태
              </h2>
              <span className="text-[14px] md:text-[20px] font-medium tracking-[-0.02em] text-[#02acea]">
                필수
              </span>
            </div>
            <div className="mt-[16px] md:mt-[20px] grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[20px]">
              {SERVICE_TYPES.map((st) => {
                const isSelected = selectedService === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => toggleService(st.id)}
                    className={`flex h-[140px] md:h-[230px] flex-col items-center justify-center rounded-[20px] md:rounded-[40px] transition-colors ${
                      isSelected
                        ? "bg-[#02acea] text-white"
                        : "bg-white text-[#1d1d1d]"
                    }`}
                  >
                    <div className="flex h-[40px] md:h-[70px] items-center justify-center">
                      <Image
                        src={st.icon}
                        alt={st.label}
                        width={st.w}
                        height={st.h}
                        className="object-contain scale-[0.7] md:scale-100"
                        style={{ width: st.w, height: st.h }}
                      />
                    </div>
                    <p className="mt-[2px] text-[16px] md:text-[22px] font-bold leading-tight tracking-[-0.02em]">
                      {st.label}
                    </p>
                    {st.sublabel && (
                      <p className="text-[13px] md:text-[18px] font-medium leading-tight tracking-[-0.02em]">
                        {st.sublabel}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 담당자 정보 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                담당자 정보
              </h2>
              <span className="text-[14px] md:text-[20px] font-medium tracking-[-0.02em] text-[#02acea]">
                필수
              </span>
            </div>
            <div className="mt-[16px] md:mt-[20px] flex flex-col gap-[20px] md:gap-[40px]">
              {[
                { key: "company", label: "회사(단체)명", placeholder: "회사(단체)명을 입력해주세요." },
                { key: "address", label: "회사 주소", placeholder: "예) 서울시 강동구" },
                { key: "name", label: "이름", placeholder: "성함을 입력해주세요." },
                { key: "phone", label: "연락처", placeholder: "전화번호를 입력해주세요." },
                { key: "email", label: "이메일", placeholder: "이메일을 입력해주세요." },
              ].map((field) => (
                <div
                  key={field.key}
                  className="flex flex-col md:flex-row md:items-center border-b-[2px] border-[#1d1d1d]/10 pb-[6px]"
                >
                  <label className="shrink-0 text-[14px] md:text-[20px] md:w-[322px] font-bold leading-[2] md:leading-[48px] tracking-[-0.02em] text-black">
                    {field.label}
                  </label>
                  <input
                    type={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "text"}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="flex-1 bg-transparent text-[14px] md:text-[20px] font-medium leading-[2] md:leading-[48px] tracking-[-0.02em] text-[#1d1d1d] placeholder:text-[#979797] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 예산 정보 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                예산 정보
              </h2>
              <span className="text-[14px] md:text-[20px] font-medium tracking-[-0.02em] text-[#02acea]">
                필수
              </span>
            </div>

            {/* 월 예산 */}
            <p className="mt-[16px] md:mt-[20px] text-[14px] md:text-[20px] font-bold leading-tight tracking-[-0.02em] text-black">
              월 예산
            </p>
            <div className="mt-[12px] md:mt-[20px] grid max-w-[1015px] grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[20px]">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedBudget(opt)}
                  className={`flex h-[44px] md:h-[64px] items-center justify-center rounded-full text-[14px] md:text-[22px] font-bold tracking-[-0.02em] transition-colors ${
                    selectedBudget === opt
                      ? "bg-[#02acea] text-white"
                      : "bg-white text-[#1d1d1d]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* 임직원 수 */}
            <p className="mt-[24px] md:mt-[36px] text-[14px] md:text-[20px] font-bold leading-tight tracking-[-0.02em] text-black">
              임직원 수
            </p>
            <div className="mt-[12px] md:mt-[20px] grid max-w-[1015px] grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[20px]">
              {EMPLOYEE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedEmployees(opt)}
                  className={`flex h-[44px] md:h-[64px] items-center justify-center rounded-full text-[14px] md:text-[22px] font-bold tracking-[-0.02em] transition-colors ${
                    selectedEmployees === opt
                      ? "bg-[#02acea] text-white"
                      : "bg-white text-[#1d1d1d]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 간식 정보 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                간식 정보
              </h2>
              <span className="text-[13px] md:text-[20px] font-medium tracking-[-0.02em] text-[#979797]">
                *선호하는 구성을 선택해주세요.
              </span>
            </div>
            <div className="mt-[16px] md:mt-[20px] grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-[20px]">
              {SNACK_TYPES.map((st) => {
                const isSelected = selectedSnacks.includes(st.id);
                return (
                  <button
                    key={st.id}
                    onClick={() => toggleSnack(st.id)}
                    className={`flex h-[140px] md:h-[230px] flex-col items-center justify-center rounded-[20px] md:rounded-[40px] transition-colors ${
                      isSelected
                        ? "bg-[#02acea] text-white"
                        : "bg-white text-[#1d1d1d]"
                    }`}
                  >
                    <div className="flex h-[40px] md:h-[70px] items-center justify-center">
                      <Image
                        src={st.icon}
                        alt={st.label}
                        width={st.w}
                        height={st.h}
                        className="object-contain scale-[0.7] md:scale-100"
                        style={{ width: st.w, height: st.h }}
                      />
                    </div>
                    <p className="mt-[2px] text-[14px] md:text-[22px] font-bold leading-tight tracking-[-0.02em]">
                      {st.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="mt-[50px] md:mt-[100px]">
            <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
              문의 내용
            </h2>
            <textarea
              placeholder="추가 문의 내용을 작성해주세요."
              value={form.inquiry}
              onChange={(e) => setForm({ ...form, inquiry: e.target.value })}
              className="mt-[12px] md:mt-[20px] h-[160px] md:h-[224px] w-full resize-none rounded-[20px] md:rounded-[40px] bg-white px-[16px] py-[20px] md:px-[25px] md:py-[40px] text-[14px] md:text-[20px] font-medium leading-[1.4] tracking-[-0.02em] text-[#1d1d1d] placeholder:text-[#979797] outline-none"
            />
          </div>

          {/* 개인정보 수집 및 이용동의 */}
          <div className="mt-[50px] md:mt-[100px]">
            <h2 className="text-[18px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
              개인정보 수집 및 이용동의 (필수)
            </h2>
            <div className="mt-[12px] md:mt-[20px] rounded-[20px] md:rounded-[40px] bg-white px-[16px] py-[20px] md:px-[25px] md:py-[40px]">
              <p className="text-center text-[13px] md:text-[20px] font-medium tracking-[-0.02em] text-[#979797]">
                주식회사 펠리즈는 아래의 목적으로 개인 정보를 수집 및 이용하며, 회원의 개인 정보를
                안전하게 취급하는 데 최선을 다합니다.
              </p>
              <div className="mt-[12px] md:mt-[16px] text-[12px] md:text-[16px] font-medium leading-[1.5] tracking-[-0.02em] text-[#979797]">
                <p>1. 목적 : 스낵왕 서비스 도입 문의에 따른 정보 확인</p>
                <p>2. 항목 : 회사 및 단체명, 담당자명, 전화번호, e-mail 주소, 직급/직책</p>
                <p>
                  3. 보유기간 : 도입 문의 상담 서비스를 위해 신청 후 3개월간 보관후 파기합니다.
                </p>
              </div>
              <div className="mt-[12px] md:mt-[16px] text-[12px] md:text-[16px] font-medium leading-[1.5] tracking-[-0.02em] text-[#979797]">
                <p>위 정보 수집에 대한 동의를 거부할 권리가 있으며,</p>
                <p>동의를 거부하실 경우 문의 처리 및 결과 회신이 제한됩니다.</p>
                <p>요구하지 않은 개인정보는 입력하지 않도록 주의해주세요.</p>
              </div>
            </div>
            <label className="mt-[16px] md:mt-[20px] flex cursor-pointer items-center gap-[10px] md:gap-[12px]">
              <div
                className={`flex h-[24px] w-[24px] md:h-[32px] md:w-[32px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors ${
                  agreePrivacy
                    ? "border-[#02acea] bg-[#02acea]"
                    : "border-[#deddd7] bg-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setAgreePrivacy(!agreePrivacy);
                }}
              >
                {agreePrivacy && (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path
                      d="M1 7L6.5 12.5L17 1"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-[14px] md:text-[20px] font-medium tracking-[-0.02em] text-[#1d1d1d]">
                개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>
          </div>

          {/* 신청하기 버튼 */}
          <div className="mt-[40px] md:mt-[60px] flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex h-[48px] md:h-[56px] w-[140px] md:w-[172px] items-center justify-center rounded-full bg-[#02acea] text-[16px] md:text-[18px] font-bold tracking-[-0.02em] text-[#f8f8f9] transition hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? "전송 중..." : "신청하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
