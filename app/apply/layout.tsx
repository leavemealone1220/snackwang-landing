import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 신청하기",
  description:
    "스낵왕 기업 간식 구독 서비스를 신청하세요. 방문 관리, 정기 택배, 무인 편의점, 케이터링 등 맞춤 간식 서비스를 제공합니다.",
  alternates: {
    canonical: "/apply",
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
