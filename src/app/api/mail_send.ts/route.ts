import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type AppealPayload = {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  message: string;
  appeal_type?: string;
  answer_type?: string;
};

const APPEAL_TYPE_LABELS: Record<string, string> = {
  appeal: "Обращение",
  claim: "Жалоба",
  corruption: "Сообщение о коррупции",
  rector: "Обращение к ректору",
};

const ANSWER_TYPE_LABELS: Record<string, string> = {
  phone: "По телефону",
  email: "По email",
  no_answer: "Без ответа",
};

function buildAppealHtml(p: AppealPayload): string {
  const fullName = p.fullName ?? p.name ?? "—";
  const appealTypeLabel = (p.appeal_type && APPEAL_TYPE_LABELS[p.appeal_type]) ?? p.appeal_type ?? "—";
  const answerTypeLabel = (p.answer_type && ANSWER_TYPE_LABELS[p.answer_type]) ?? p.answer_type ?? "—";
  const rows = [
    ["Тип обращения", appealTypeLabel],
    ["ФИО", fullName],
    ["Email", p.email ?? "—"],
    ["Телефон", p.phone ?? "—"],
    ["Способ ответа", answerTypeLabel],
    ["Сообщение", p.message || "—"],
  ];
  const body = rows
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(String(value))}</p>`)
    .join("\n");
  return `<h3>Новое обращение с сайта</h3>\n${body}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


async function sendAppealMail(body: AppealPayload) {

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "noreply@abu.edu.kz",
    to: process.env.RESEND_TO ?? "maxat.dzhetenbaev@gmail.com",
    subject: "Alikhan Bokeikhan University — Обращение с сайта",
    html: buildAppealHtml(body),
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AppealPayload;
    if (!body?.message?.trim()) {
      return NextResponse.json(
        { message: "message is required" },
        { status: 400 }
      );
    }
    const data = await sendAppealMail(body);

    return NextResponse.json(
      { message: "Email sent", id: data?.id },
      { status: 200 }
    );
  } catch (e) {
    // eslint-disable-next-line no-console -- log server errors
    console.error(e);
    return NextResponse.json(
      { message: "Error occurred while sending email" },
      { status: 500 }
    );
  }
}