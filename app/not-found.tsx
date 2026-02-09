import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f5ee]">
      <h1 className="text-[48px] font-bold text-gray-900 mb-4">404</h1>
      <p className="text-[18px] text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-full bg-[#7b79ff] px-8 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
