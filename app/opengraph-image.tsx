import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "스낵왕 - 기업 사내 간식 구독 서비스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #02ACEA 0%, #0288D1 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 원들 */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 150,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        {/* 메인 컨텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* 로고 텍스트 */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            스낵왕
          </div>

          {/* 구분선 */}
          <div
            style={{
              width: 60,
              height: 4,
              background: "rgba(255,255,255,0.5)",
              borderRadius: 2,
              marginTop: 8,
              marginBottom: 8,
            }}
          />

          {/* 타이틀 */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            기업 사내 간식 구독 서비스
          </div>

          {/* 설명 */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "-0.5px",
              marginTop: 4,
            }}
          >
            배송부터 진열·관리까지, 맞춤 간식 큐레이션
          </div>

          {/* 태그들 */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            {["방문 관리", "정기 택배", "무인 편의점", "기업 행사"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 50,
                    padding: "10px 24px",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 18,
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "1px",
          }}
        >
          snackwang.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
