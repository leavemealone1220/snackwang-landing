import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용 문의하기",
  description:
    "스낵왕 서비스 이용에 대해 궁금한 점을 문의하세요. 서비스 구성, 가격, 배송, 설비 등 전문 매니저가 2영업일 이내 답변드립니다.",
  alternates: {
    canonical: "/apply/inquiry",
  },
};

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
