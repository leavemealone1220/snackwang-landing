import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { formType, ...data } = body;

    let subject = "";
    let html = "";

    if (formType === "apply") {
      subject = `[스낵왕] 서비스 신청 - ${data.company}`;
      html = `
        <h2>서비스 신청</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">서비스 형태</td><td style="padding:8px;border:1px solid #ddd;">${data.service}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사명</td><td style="padding:8px;border:1px solid #ddd;">${data.company}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사 주소</td><td style="padding:8px;border:1px solid #ddd;">${data.address || "-"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">담당자</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">연락처</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">이메일</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">월 예산</td><td style="padding:8px;border:1px solid #ddd;">${data.budget}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">임직원 수</td><td style="padding:8px;border:1px solid #ddd;">${data.employees}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">선호 간식</td><td style="padding:8px;border:1px solid #ddd;">${data.snacks?.join(", ") || "-"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">문의 내용</td><td style="padding:8px;border:1px solid #ddd;">${data.inquiry || "-"}</td></tr>
        </table>
      `;
    } else if (formType === "inquiry") {
      subject = `[스낵왕] 이용 문의 - ${data.company}`;
      html = `
        <h2>이용 문의</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">문의 유형</td><td style="padding:8px;border:1px solid #ddd;">${data.type}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사명</td><td style="padding:8px;border:1px solid #ddd;">${data.company}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사 주소</td><td style="padding:8px;border:1px solid #ddd;">${data.address || "-"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">담당자</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">연락처</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">이메일</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">문의 내용</td><td style="padding:8px;border:1px solid #ddd;">${data.inquiry || "-"}</td></tr>
        </table>
      `;
    } else if (formType === "partnership") {
      subject = `[스낵왕] 제휴 문의 - ${data.company}`;
      html = `
        <h2>제휴 문의</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">문의 유형</td><td style="padding:8px;border:1px solid #ddd;">${data.type}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사명</td><td style="padding:8px;border:1px solid #ddd;">${data.company}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">회사 주소</td><td style="padding:8px;border:1px solid #ddd;">${data.address || "-"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">담당자</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">연락처</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">이메일</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">문의 내용</td><td style="padding:8px;border:1px solid #ddd;">${data.inquiry || "-"}</td></tr>
        </table>
      `;
    } else {
      return NextResponse.json({ error: "잘못된 폼 타입입니다." }, { status: 400 });
    }

    const toEmail = formType === "partnership"
      ? "partnership@snackwang.com"
      : "help@snackwang.com";

    const { error } = await resend.emails.send({
      from: "스낵왕 <noreply@snackwang.com>",
      to: toEmail,
      subject,
      html,
    });

    if (error) {
      console.error("이메일 전송 실패:", error);
      return NextResponse.json({ error: "이메일 전송에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API 에러:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
