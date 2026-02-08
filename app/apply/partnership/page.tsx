"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const INQUIRY_TYPES = [
  "상품 제휴 문의",
  "브랜드 / 마케팅 협업",
  "입점 / 납품 제안",
  "프로모션 제안",
  "콘텐츠 / 이벤트 협업",
  "기타(제휴 문의)",
];

export default function PartnershipPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [form, setForm] = useState({
    company: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    inquiry: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalSize = [...files, ...newFiles].reduce((sum, f) => sum + f.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        alert("첨부파일 총 용량은 10MB 이하로 제한됩니다.");
        return;
      }
      setFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      alert("문의 유형을 선택해주세요.");
      return;
    }
    if (!form.company || !form.name || !form.phone || !form.email) {
      alert("담당자 정보를 모두 입력해주세요.");
      return;
    }
    if (!agreePrivacy) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("formType", "partnership");
      formData.append("type", selectedType);
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("제휴 문의가 완료되었습니다. 담당 매니저가 2영업일 이내에 연락드리겠습니다.");
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
          제휴 문의하기
        </h1>

        {/* 탭 */}
        <div className="mt-[30px] md:mt-[70px] flex items-center justify-center gap-[8px] md:gap-[20px]">
          <Link href="/apply" className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#eeede9] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-[#1d1d1d]">
            서비스 신청하기
          </Link>
          <Link href="/apply/inquiry" className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#eeede9] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-[#1d1d1d]">
            이용 문의하기
          </Link>
          <div className="flex h-[44px] md:h-[64px] flex-1 md:flex-none md:w-[220px] items-center justify-center rounded-full bg-[#02acea] text-[14px] md:text-[22px] font-bold leading-[16px] tracking-[-0.02em] text-white">
            제휴 문의하기
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="mx-auto max-w-[1360px]">
          {/* 제휴 문의 안내 */}
          <h2 className="mt-[50px] md:mt-[100px] text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
            제휴 문의 안내
          </h2>
          <div className="relative mt-[16px] md:mt-[24px] w-full rounded-[20px] md:rounded-[40px] bg-[#eeede9] px-[20px] py-[24px] md:px-[70px] md:h-[224px] md:flex md:items-center">
            <div className="text-[14px] md:text-[20px] font-medium leading-[1.6] tracking-[-0.02em] text-[#1d1d1d]">
              <p>스낵왕과 함께할 파트너 제안을 기다리고 있습니다.</p>
              <p>
                제휴 문의를 남겨주시면 담당 매니저가 내용을 검토한 후{" "}
                <span className="font-bold">2영업일 이내에 연락</span>을 드립니다.
              </p>
              <p>제안 내용에 따라 추가 자료 요청이 있을 수 있습니다.</p>
            </div>
            {/* 장식 이미지들 - 데스크톱에서만 */}
            <div className="hidden lg:block">
              <div className="absolute rounded-full bg-[rgba(217,217,217,0.8)]" style={{ right: 100, top: 86, width: 190, height: 92 }} />
              <div className="absolute z-[2]" style={{ right: 220, top: 52, width: 124, height: 126 }}>
                <div className="flex h-full w-full items-center justify-center" style={{ transform: "rotate(15deg)" }}>
                  <Image
                    src="/images/apply/partner-decor-character.png"
                    alt=""
                    width={100}
                    height={103}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute z-[1]" style={{ right: 184, top: 36, width: 80, height: 80 }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="30" fill="#44ae5a"/>
                  <g transform="translate(19 19)">
                    <path d="M15.0621 2.5345C15.3843 1.66389 16.6157 1.66389 16.9379 2.53451L20.1619 11.2473C20.2632 11.521 20.479 11.7368 20.7527 11.8381L29.4655 15.0621C30.3361 15.3843 30.3361 16.6157 29.4655 16.9379L20.7527 20.1619C20.479 20.2632 20.2632 20.479 20.1619 20.7527L16.9379 29.4655C16.6157 30.3361 15.3843 30.3361 15.0621 29.4655L11.8381 20.7527C11.7368 20.479 11.521 20.2632 11.2473 20.1619L2.5345 16.9379C1.66389 16.6157 1.66389 15.3843 2.53451 15.0621L11.2473 11.8381C11.521 11.7368 11.7368 11.521 11.8381 11.2473L15.0621 2.5345Z" fill="white"/>
                    <path d="M31.0621 24.5345C31.3843 23.6639 32.6157 23.6639 32.9379 24.5345L34.5413 28.8679C34.6426 29.1416 34.8584 29.3574 35.1321 29.4587L39.4655 31.0621C40.3361 31.3843 40.3361 32.6157 39.4655 32.9379L35.1321 34.5413C34.8584 34.6426 34.6426 34.8584 34.5413 35.1321L32.9379 39.4655C32.6157 40.3361 31.3843 40.3361 31.0621 39.4655L29.4587 35.1321C29.3574 34.8584 29.1416 34.6426 28.8679 34.5413L24.5345 32.9379C23.6639 32.6157 23.6639 31.3843 24.5345 31.0621L28.8679 29.4587C29.1416 29.3574 29.3574 29.1416 29.4587 28.8679L31.0621 24.5345Z" fill="white"/>
                  </g>
                </svg>
              </div>
              <div className="absolute flex items-center justify-center gap-[10px] rounded-full bg-[#f8c641] px-[12px]" style={{ right: 301, top: 140, width: 102, height: 48 }}>
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
                <div className="h-[10px] w-[10px] rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* 문의 유형 선택 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                문의 유형 선택
              </h2>
              <span className="text-[14px] md:text-[20px] font-medium tracking-[-0.02em] text-[#02acea]">
                필수
              </span>
            </div>
            <div className="mt-[16px] md:mt-[20px] grid grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[20px]">
              {INQUIRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType((prev) => (prev === type ? null : type))}
                  className={`flex h-[44px] md:h-[64px] items-center justify-center rounded-full text-[13px] md:text-[22px] font-bold tracking-[-0.02em] transition-colors ${
                    selectedType === type
                      ? "bg-[#02acea] text-white"
                      : "bg-white text-[#1d1d1d]"
                  }`}
                >
                  {type}
                </button>
              ))}
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

          {/* 문의 내용 */}
          <div className="mt-[50px] md:mt-[100px]">
            <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
              문의 내용
            </h2>
            <textarea
              placeholder="문의 내용을 작성해주세요."
              value={form.inquiry}
              onChange={(e) => setForm({ ...form, inquiry: e.target.value })}
              className="mt-[12px] md:mt-[20px] h-[160px] md:h-[224px] w-full resize-none rounded-[20px] md:rounded-[40px] bg-white px-[16px] py-[20px] md:px-[25px] md:py-[40px] text-[14px] md:text-[20px] font-medium leading-[1.4] tracking-[-0.02em] text-[#1d1d1d] placeholder:text-[#979797] outline-none"
            />
          </div>

          {/* 파일 첨부 */}
          <div className="mt-[50px] md:mt-[100px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              <h2 className="text-[22px] md:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#1d1d1d]">
                파일 첨부
              </h2>
              <span className="text-[13px] md:text-[20px] font-medium tracking-[-0.02em] text-[#979797]">
                *선택 (최대 10MB)
              </span>
            </div>
            <p className="mt-[8px] text-[13px] md:text-[16px] font-medium tracking-[-0.02em] text-[#979797]">
              회사소개서, 제안서, 상품 카탈로그 등을 첨부해주세요.
            </p>
            <div className="mt-[16px] md:mt-[20px]">
              <label className="inline-flex cursor-pointer items-center gap-[8px] rounded-full bg-white px-[18px] py-[10px] md:px-[24px] md:py-[14px] text-[14px] md:text-[18px] font-bold tracking-[-0.02em] text-[#1d1d1d] hover:bg-[#eeede9] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
                파일 선택
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-[12px] md:mt-[16px] flex flex-col gap-[8px] md:gap-[10px]">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-[10px] md:gap-[12px] rounded-[12px] md:rounded-[16px] bg-white px-[14px] py-[10px] md:px-[20px] md:py-[14px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#02acea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="flex-1 text-[13px] md:text-[16px] font-medium tracking-[-0.02em] text-[#1d1d1d] truncate">
                      {file.name}
                    </span>
                    <span className="text-[12px] md:text-[14px] text-[#979797] shrink-0">
                      {(file.size / 1024 / 1024).toFixed(1)}MB
                    </span>
                    <button
                      onClick={() => removeFile(i)}
                      className="shrink-0 text-[#979797] hover:text-[#ff4444] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                <p>3. 보유기간 : 도입 문의 상담 서비스를 위해 신청 후 3개월간 보관후 파기합니다.</p>
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

          {/* 제안하기 버튼 */}
          <div className="mt-[40px] md:mt-[60px] flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex h-[48px] md:h-[56px] w-[140px] md:w-[172px] items-center justify-center rounded-full bg-[#02acea] text-[16px] md:text-[18px] font-bold tracking-[-0.02em] text-[#f8f8f9] transition hover:brightness-110 disabled:opacity-50"
            >
              {isSubmitting ? "전송 중..." : "제안하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
