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
      </body>
    </html>
  );
}
