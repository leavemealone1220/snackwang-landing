import type { Config } from "tailwindcss";

/**
 * Figma Variables에서 가져온 스낵왕 디자인 토큰
 * - 색상: get_variable_defs 기준
 * - 폰트: Noto Sans KR(기본) + Bagel Fat One(헤드라인)
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma 변수명 → 용도
        // 퍼플 계열 (메인 브랜드)
        purple: "#7b79ff",           // 퍼플 - 메인
        "purple-light": "#a4a3ff",  // 퍼플 연하게
        "purple-soft": "#afa9f6",   // 매대 컬러
        "purple-deep": "#7a6ff0",   // 도면 배경
        // 포인트 컬러
        orange: "#ff6d39",          // snackwang_orange
        blue: "#02acea",            // snack_point_blue / snackwang_blue
        yellow: "#f8c641",          // snack_point_yellow
        green: "#44ae5a",            // snack_point_green
        pink: "#ffa6c9",            // snack_point_pink_line
        // 기본/배경
        black: "#1d1d1d",           // 블랙
        "line-subtle": "#e8eaf6",   // 도면 라인 수정 (연한 보라 계열)
        // 시맨틱 별칭 (코드에서 쓰기 쉽게)
        primary: "#7b79ff",
        "primary-light": "#a4a3ff",
        accent: "#ff6d39",
        "accent-blue": "#02acea",
        "accent-yellow": "#f8c641",
        "accent-green": "#44ae5a",
        "accent-pink": "#ffa6c9",
      },
      fontFamily: {
        // Figma 기준 기본 폰트: Pretendard (globals.css에서 CDN 로드)
        sans: ["Pretendard", "system-ui", "sans-serif"],
        // Hero 헤드라인 폰트 (Figma: Bagel Fat One)
        display: ["var(--font-display)", "Pretendard", "system-ui", "sans-serif"],
      },
      spacing: {
        // 섹션 간격 등 자주 쓰는 값 (필요 시 Figma 수치로 추가)
        "section": "5rem",   // 80px
        "section-lg": "6rem", // 96px
      },
    },
  },
  plugins: [],
};

export default config;
