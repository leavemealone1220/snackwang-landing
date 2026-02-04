# 스낵왕 랜딩 페이지

Next.js + Tailwind CSS + Vercel 로 만드는 스낵왕 랜딩 페이지입니다.

## 사용 스택

- **Next.js** (React 기반 프레임워크)
- **Tailwind CSS** (유틸리티 CSS)
- **Vercel** (배포)

## 로컬에서 실행하기

1. 터미널을 열고 프로젝트 폴더로 이동합니다.
   ```bash
   cd "c:\Users\shin_\Desktop\snackawnag_landing_ver2.0 test"
   ```
2. 패키지 설치
   ```bash
   npm install
   ```
3. 개발 서버 실행
   ```bash
   npm run dev
   ```
4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

## 배포 (Vercel)

1. [vercel.com](https://vercel.com) 에서 GitHub 연동 또는 프로젝트 폴더 업로드
2. 루트 디렉터리 그대로 사용, Build Command: `npm run build`, Output: Next.js 기본값
3. 배포 후 이미지는 프로젝트 안 `public/` 또는 `assets/` 에 두고 상대 경로로 사용하면 그대로 동작합니다.

## 프로젝트 진행

- **공통 디자인**: 색상·폰트는 Figma Variables 기준으로 `tailwind.config.ts` 와 `app/globals.css` 에 설정됨
- **섹션 순서**: 헤더 → 히어로 → 제품 카테고리 → 실시간 현황 → 앱 다운로드 → 맞춤 상자 → 고객 후기 → 이용 방법 → 채팅/지원 → 혜택 → 푸터
- **다음 작업**: 각 섹션을 Figma에서 선택 후 코드 생성하여 추가
