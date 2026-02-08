import { Metadata } from "next";

export const metadata: Metadata = {
  title: "제휴 문의하기",
  description:
    "스낵왕과 제휴를 원하시나요? 브랜드 간식 입점, 마케팅 협업, 프로모션 제안 등 다양한 제휴 문의를 받고 있습니다.",
  alternates: {
    canonical: "/apply/partnership",
  },
};

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
