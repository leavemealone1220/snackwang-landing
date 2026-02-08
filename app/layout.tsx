import type { Metadata } from "next";
import { Bagel_Fat_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-9NL33ME2V7";

const bagelFatOne = Bagel_Fat_One({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const SITE_URL = "https://snackwang.com";

export const metadata: Metadata = {
  title: {
    default: "스낵왕 - 기업 사내 간식 구독 서비스 | 배송부터 진열까지",
    template: "%s | 스낵왕",
  },
  description:
    "스낵왕은 기업 사내 간식을 배송부터 진열·관리까지 책임지는 구독 서비스입니다. 맞춤 간식 큐레이션, 무인 편의점, 케이터링까지. 지금 무료 상담 신청하세요.",
  keywords: [
    "기업간식",
    "사내간식",
    "간식배송",
    "간식구독",
    "오피스간식",
    "회사간식",
    "복지간식",
    "간식관리",
    "무인편의점",
    "스낵왕",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "스낵왕",
    title: "스낵왕 - 기업 사내 간식 구독 서비스",
    description:
      "배송부터 진열·관리까지 올인원 간식 구독. 맞춤 큐레이션으로 임직원 복지를 간편하게.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "스낵왕 - 기업 사내 간식 구독 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "스낵왕 - 기업 사내 간식 구독 서비스",
    description:
      "배송부터 진열·관리까지 올인원 간식 구독. 맞춤 큐레이션으로 임직원 복지를 간편하게.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7QKqnM2qV9k0yglgPhKsmMrVWHPc7PXg5If2Sw_s-Ew",
    other: {
      "naver-site-verification": "4e0f5eae28a05854277bd2e5f0a95eff567abadd",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${bagelFatOne.variable} font-sans`}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
        {/* 채널톡 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var w=window;if(w.ChannelIO){return}var ch=function(){ch.c(arguments)};ch.q=[];ch.c=function(args){ch.q.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
              ChannelIO('boot',{"pluginKey":"2f3385b2-f49b-40ab-8585-4fa4411d1670","hidePopup":true});
            `,
          }}
        />
      </body>
    </html>
  );
}
