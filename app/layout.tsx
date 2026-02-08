import type { Metadata } from "next";
import { Bagel_Fat_One } from "next/font/google";
import "./globals.css";

const bagelFatOne = Bagel_Fat_One({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "스낵왕 - 한입이 필요한 순간",
  description: "출근 견디게 하는 건 결국 한입이었다. 스낵왕으로 간편하게.",
  icons: {
    icon: "/favicon.ico",
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
        {children}
        {/* 채널톡 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){var w=window;if(w.ChannelIO){return}var ch=function(){ch.c(arguments)};ch.q=[];ch.c=function(args){ch.q.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
              ChannelIO('boot',{"pluginKey":"2f3385b2-f49b-40ab-8585-4fa4411d1670"});
            `,
          }}
        />
      </body>
    </html>
  );
}
