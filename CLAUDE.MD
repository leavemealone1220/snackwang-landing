# 스낵왕 랜딩 페이지 – CLAUDE 작업 가이드

이 파일은 **Claude(클로드) 코드 어시스턴트**가 이 프로젝트에 참여할 때 따라야 할 정리본이다.  
지금까지 GPT와 작업해 온 내용, 디자인 기준, 코드 스타일, 주의사항을 최대한 상세히 정리했다.

---

## 1. 프로젝트 개요

- **프로젝트명**: 스낵왕 랜딩 페이지
- **목적**
  - Figma에 있는 `Snack King` 랜딩 디자인을 **픽셀 퍼펙트에 가깝게** 웹으로 구현
  - 이후 게시판, 쇼핑몰(간식 판매), 결제/DB 연동 등 확장을 염두에 둠
- **기술 스택**
  - **Next.js 14.2.18 (App Router, TypeScript)**
  - **React 18**
  - **Tailwind CSS 3.4.x**
  - 배포: Vercel (아직 실제 배포는 안 했으나 이를 전제로 구조 설계)

### 폴더 구조(중요 부분)

- `app/layout.tsx` – 루트 레이아웃, 글로벌 폰트/메타데이터
- `app/page.tsx` – 메인 랜딩 페이지
  - 현재 섹션 순서:
    - `Hero`
    - `ClientLogosSection`
    - `FeatureSection`
    - `PricingSection`
    - `CustomizationSection`
    - `ThemeSection`
    - `ProcessSection`
- `app/components/*`
  - `Hero.tsx`
  - `ClientLogosSection.tsx`
  - `FeatureSection.tsx`
  - `PricingSection.tsx`
  - `CustomizationSection.tsx`
  - `ThemeSection.tsx`
  - `ProcessSection.tsx`
- `app/globals.css` – Tailwind + Pretendard, 공통 유틸리티
- `tailwind.config.ts` – Figma 색상/폰트 확장
- `public/images/**` – Figma에서 export한 모든 이미지 저장 위치

---

## 2. 공통 디자인 & 코드 규칙

### 2.1 Figma 기준

- 사용자는 **정확한 Figma 재현**을 매우 중요하게 생각한다.
  - “비율·감”보다는 **px 단위**를 우선한다.
  - Hero, Theme, Process 등은 실제로 Figma MCP(`get_design_context`, `get_screenshot`)를 사용해 **좌표/사이즈**를 참고해왔다.
- 가능하면:
  - 데스크톱(1920px) 기준으로 먼저 **정답 레이아웃**을 만들고,
  - 그 뒤에 반응형(`sm`, `md`, `lg`)을 추가하는 방향으로 작업.

### 2.2 Tailwind 스타일 공통

- 컨테이너:
  - 섹션 대부분이
    - `max-w-[1920px]`
    - `px-4 md:px-[60px]`
    - `mx-auto`
  - 상하 여백은 `py-section`(Tailwind theme `spacing.section`) 사용.
- 색상:
  - `tailwind.config.ts`와 `globals.css`에 Figma 색상 매핑되어 있음.
  - 주요 색 예:
    - `primary` / `purple` – #7b79ff
    - `accent` (주황), `accent-blue`, `accent-yellow`, `accent-green`, `accent-pink`
  - 디자인 시 임의 hex보다는 **이미 정의된 색 이름 사용** 권장.
- 폰트:
  - 기본 본문: Pretendard (CDN, `globals.css`에서 import)
  - 디스플레이: `Bagel_Fat_One` (`layout.tsx`에서 `--font-display`로 바인딩, Hero 타이틀 등에 사용)

### 2.3 이미지 사용 규칙

- 모든 이미지 경로는 `public/images/...` 기준.
- 섹션별 경로 예:
  - Hero: `public/images/hero/*`
  - Client logos: `public/images/client_logos/client-strip-1.png`
  - Feature cards: `public/images/features/feature-01.png` 등
  - Pricing: `public/images/pricing/pricing-card-*.png`
  - Customization: `public/images/customization/floorplan.png`
  - Theme: `public/images/theme/theme-*.png`
  - Process: `public/images/process/process-01.png` ~ `process-04.png` (현재는 자리는 잡아두고, 실제 이미지는 사용자가 추출 예정)
- `next/image` 사용 시 원본 해상도보다 **크게 늘리지 않기** (자글자글해지는 문제를 이미 겪었다).
  - 가급적 `width/height`를 원본 px 그대로 넣고,
  - CSS에서는 `w-full h-auto` 로 축소만 일어나게.

---

## 3. 섹션별 구현 요약 & 주의사항

### 3.1 Hero (`Hero.tsx`)

- 큰 배경 이미지 + 어두운 오버레이 + 상단 내비 + 메인 카피 + CTA 두 개.
- 레이아웃:
  - 배경: `Image fill + object-cover object-center` + `bg-black/65` 오버레이
  - 컨테이너: `max-w-[1920px] px-4 md:px-[60px] mx-auto`
  - 상단 헤더:
    - 좌측: 로고 이미지
    - 중앙: 메뉴(데스크톱에서만 보이는 pill형 nav)
    - 우측: 버튼 2개
      - `서비스 소개서 받기` (md 이상에서만 보임)
      - `기업 간식 관리` CTA
- 메인 카피:
  - Bagel Fat One 폰트 + 장식 이미지(넥타이, 토스트, 수박, 스낵 아이콘 등)
- 문제/해결:
  - 버튼 줄바꿈, 배경 크기, 상단 여백 등은 이미 여러 번 수정해서 현재 상태가 Figma에 거의 근접.
  - 이 섹션은 **구조를 크게 바꾸지 말 것**. 세부 padding/폰트 사이즈만 필요시 조정.

### 3.2 Client Logos (`ClientLogosSection.tsx`)

- 배경색: `#f6f5ee`
- 로고 스트립:
  - `client-strip-1.png` (아주 긴 가로 PNG)를 두 번 반복하여 좌측으로 무한 마퀴.
  - CSS 애니메이션: `logos-marquee` (`globals.css`의 keyframes 사용, 60초 linear infinite).
- 주의:
  - 원본 이미지 width/height는 **4021 x 264**, `next/image`에도 동일하게 넣고 CSS height만 줄이는 방식으로 선명도 확보.
  - 좌우 여백 없이 전체 폭에 꽉 차게 보이도록 컨테이너 `px-0` 처리.

### 3.3 Feature Section (`FeatureSection.tsx`)

- 4장의 피처 카드 슬라이더.
- 동작:
  - 현재 **자동 슬라이드 없음** (사용자 요청으로 제거).
  - 좌측 텍스트 영역 + 우측 카드 영역.
  - 카드들은 **정면 카드가 가장 크게, 좌우 카드는 작고 반투명**한 느낌.
- 구현:
  - `useState(activeIndex)`
  - `ordered = FEATURE_SLIDES`를 rotate 하여 항상 0번이 active로 보이게 함.
  - 전체 카드 이미지는 Figma에서 추출한 PNG 그대로 사용 (`/images/features/feature-0x.png`).
- 주의:
  - 카드 비율과 크기, 간격은 이미 사용자와 수십 번 튜닝한 상태. **레이아웃 재구성은 가능한 피하고**, 카드 수나 텍스트만 건드릴 것.

### 3.4 Pricing (`PricingSection.tsx`)

- 검은 배경 위에 3개의 가격 카드 이미지.
- 특징:
  - 섹션 상단 좌/우 모서리는 `rounded-t-[48px] md:rounded-t-[60px]` 로 둥글게.
  - 위 Client Logos / Feature와 레이어가 겹쳐 보이는 느낌을 위해 padding & margin 조정되어 있음.
- 카드 내용:
  - 실제 텍스트는 `sr-only`로만 존재, 시각적으로는 **Figma 카드 이미지 전체**를 사용.

### 3.5 Customization (`CustomizationSection.tsx`)

- 보라색 배경(`bg-[#7b79ff]`) + 상단 타이틀 + 옵션 버튼들 + 중앙 평면도 이미지.
- 레이아웃:
  - 상단 라운드: `rounded-t-[48px] md:rounded-t-[60px]`
  - 바로 위 Pricing 섹션과 **겹쳐 보이도록** `-mt-[6rem] md:-mt-[8rem]` 사용.
- 평면도:
  - `/images/customization/floorplan.png`
  - `Image fill + object-contain`.

### 3.6 Theme Section (`ThemeSection.tsx`)

이 섹션은 특히 **많이 꼬였다가 겨우 정리된 부분**이므로, 구조 변경에 주의해야 한다.

- 구조:
  - 좌측: 메인 테마 카드 1장 (`theme-main.png`, 폭 395, 높이 496)
  - 우측: 상단 가로 슬라이더 (3장, 두 번째/세 번째 테마), 하단 2장 카드(`theme-delivery`, `theme-customizing`)
  - 전체 카드는 `max-w-[1400px]` 내에서 가운데 정렬.
- 가로 슬라이더:
  - 카드 폭: `715 x 180` 기준.
  - 우리는 Theme 섹션에서 **드래그 슬라이더 + 점 인디케이터**를 이미 구현했다.
    - `activeIndex`로 제어
    - 드래그 시 `dragStartX`, `dragDeltaX`, `isDragging` 상태 사용
    - threshold 약 40px
    - 끝까지 가면 다시 처음/마지막으로 **루프**하도록 구현.
- 인디케이터(점 3개):
  - Figma 좌표를 기준으로 **px 단위로 보정**해서 맞춰 둔 상태.
  - `left-[55px] top-[134px]`, `gap-[8px]`, 점 크기 `h-[9px] w-[9px]`
  - 이미지 내 점들은 Figma에서 제거했고, 코드로 만든 점만 사용한다.
- 주의:
  - 인디케이터 위치/크기는 이미 수십 번 미세 조정한 결과이므로 웬만하면 건드리지 말 것.
  - 슬라이더 드래그 로직 수정 시, Theme 섹션의 패턴을 참고하되 **Process 섹션과 일관성**을 유지.

### 3.7 Process Section (`ProcessSection.tsx`)

현재 가장 최근에 작업한 섹션으로, **Figma 스크린샷과 최대한 일치**하도록 재구성했다.

- 상단:
  - 태그: `스낵왕 설치하기`
  - 제목: `쉽고 빠른 스낵왕 설치 방법`
- 탭/진행 바:
  - 탭 4개: `상담 신청`, `방문 진열`, `배송&관리`, `월간 리포트`
  - 가운데 정렬, 탭 사이에 `>` 구분자.
  - 하단 라인 위에 파란 바가 `activeIndex` 에 따라 `translateX`로 이동 (`w-1/4` + `translateX(activeIndex * 100%)`).
- 카드:
  - 하나의 큰 카드가 중앙에 보이는 구조 (폭 약 1120, 라운드 40px, 그림자).
  - `PROCESS_STEPS` 배열을 슬라이더처럼 좌우로 이어 붙이고, `activeIndex`로 `translateX(-activeIndex * 100%)`.
  - 왼쪽: 배지(01~04 + 라벨), 타이틀, 설명
  - 오른쪽: `/images/process/process-0x.png` 이미지 박스 (연한 배경 + `object-cover`).
- 주의:
  - 이 섹션도 Theme처럼 **인터랙티브 슬라이더**이므로, 상태/레이아웃 복잡.
  - 탭 클릭 → 슬라이더 이동, 슬라이더 자체 드래그는 아직 구현되지 않음(필요 시 Theme 슬라이더 방식 참고).
  - 현재 `public/images/process` 폴더에 실제 이미지가 없어서 404 경고가 찍힐 수 있음.  
    - 이는 서버 크래시 원인은 아니며, 나중에 이미지 추가하면 해결.

---

## 4. 런타임/빌드 관련 주의사항

### 4.1 `"use client"` 실수

- 최근에 `ProcessSection.tsx` 상단을 **백틱**으로 잘못 쓴 적이 있었음:

  ```ts
  `use client`;
  ```

- 이 때문에 Next.js가 해당 컴포넌트를 Server Component로 인식해서,
  `useState` 사용 시 다음 에러가 발생:

  > You're importing a component that needs useState. It only works in a Client Component...

- 현재는 `"use client";` 로 수정되어 있음.  
  **새로 만드는 상호작용 섹션에서 Client Component가 필요하다면 항상 맨 위에 `"use client";` 를 정확히 작성할 것.**

### 4.2 이미지 404

- `process-01.png` ~ `process-04.png` 등 아직 없는 이미지를 참조하면 Next Dev 서버 로그에 404 + “isn't a valid image” 경고가 찍힌다.
- 이건 랜더링 시 Next가 image optimizer용 엔드포인트를 호출했다가 HTML 404를 돌려받아 생기는 경고일 뿐, **서버를 죽이지는 않는다.**
- 실제 배포 전에는 반드시 `public/images/...` 에 해당 파일들을 채워 넣는 것이 좋다.

---

## 5. Git / 작업 방식

- 이미 GitHub 리포지터리 연결 완료:
  - `origin`: `https://github.com/leavemealone1220/snackwang-landing.git`
  - 기본 브랜치: `main`
- 사용자는 데스크톱/노트북 등 여러 환경에서 작업할 수 있으므로:
  - 변경 시 **자주 commit & push** 하는 편이 좋다.
  - 새 기능/큰 수정은 가능하면 브랜치를 분리해서 작업하는 것이 이상적이나,  
    현재는 `main` 직푸시도 허용된 상태.

---

## 6. 사용자 선호 & 커뮤니케이션 규칙

- **언어**: 설명/코드는 한국어로 작성. (Tailwind/JSX 클래스명 등은 영어)
- **설명 스타일**:
  - 사용자는 “코딩 초보자”라고 했지만, 이제 꽤 많은 내용을 따라와서 **중급 정도의 설명**을 선호.
  - 원할 땐 디테일한 설계/비교(예: Next 14 vs Next 15, mjs vs ts config 차이 등)도 요청함.
- **픽셀 퍼펙트 집착 포인트**
  - 카드 간 간격, 인디케이터 위치, 카드 밑선 정렬, 레이어 겹침 효과 등.
  - “조금 어긋난 느낌”을 잘 잡아내므로, px 단위 튜닝에 대비할 것.
- **Figma MCP 활용**
  - 이미 `get_design_context`, `get_screenshot` 를 이용해 여러 섹션 좌표를 가져온 경험 있음.
  - 앞으로도 새로운 섹션 작업 시:
    1. 사용자가 Figma에서 해당 섹션 선택
    2. `get_design_context`로 메타데이터 또는 코드 추출
    3. 거기서 **px/width/height/x/y** 값만 뽑아 Tailwind 레이아웃에 반영

---

## 7. 앞으로의 확장 계획 (참고용)

- **게시판(커뮤니티)**:
  - `/community`, `/community/[id]` 와 같은 라우트 추가 예정.
  - DB(예: Supabase, Planetscale+Prisma 등) 붙여서 글/댓글 저장.
- **쇼핑몰(간식 판매)**:
  - `/shop`, `/shop/[productId]`, `/cart` 등.
  - 결제 연동: Stripe / 토스페이먼츠 / 아임포트 중 하나.
  - 주문 테이블/결제 상태 관리 필요.
- **정리**:
  - 현재 랜딩 구조를 해치지 않는 선에서, 상단 GNB 또는 푸터에 추가 메뉴를 붙이는 식으로 확장할 예정.

---

## 8. Claude에게 바라는 점 요약

1. **Figma와 최대한 똑같이**:  
   - px 단위로 맞출 수 있으면 맞추고, 모호할 땐 MCP로 좌표를 확인한다.
2. **기존 섹션의 레이아웃은 가능하면 유지**:  
   - Hero / Feature / Theme / Process 는 이미 여러 차례 튜닝되었으므로, “전체 구조 변경”보다는 **국소적 수정** 위주로.
3. **이미지 경로/용량에 민감할 것**:  
   - `public/images/...` 외 다른 경로는 쓰지 말고,
   - 원본보다 큰 사이즈로 렌더링하지 않는다.
4. **인터랙션은 Theme/Process 패턴 재사용**:  
   - 슬라이더/드래그/인디케이터 등 새로 만들 때, 기존 구현을 참고해서 UX 일관성을 유지.
5. **에러 로그를 꼼꼼히 본다**:  
   - 특히 `"use client"` 누락, 이미지 404, 타입 에러 등은 터미널 로그에 항상 표시되니, 이상하면 가장 먼저 로그를 확인.

이 가이드를 따르면, GPT와 이미 진행한 스타일/구조를 크게 해치지 않으면서 Claude도 자연스럽게 이어서 작업할 수 있다.

