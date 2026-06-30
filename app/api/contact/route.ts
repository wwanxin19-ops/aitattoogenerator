import { NextRequest, NextResponse } from "next/server";
import {
  clientIp,
  errorResponse,
  isPlainRecord,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  userAgent
} from "@/lib/api-utils";

export const runtime = "edge";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_CONTACT_RATE_LIMIT_PER_HOUR = 3;
const MAX_NAME_LENGTH = 80;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_MESSAGE_LENGTH = 10;
const CONTACT_CATEGORIES = new Set(["support", "feedback", "partnership", "billing", "other"]);

const ipSubmissions = new Map<string, number[]>();

type ContactCategory = "support" | "feedback" | "partnership" | "billing" | "other";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

type ContactErrorCode =
  | "INVALID_JSON"
  | "INVALID_NAME"
  | "INVALID_EMAIL"
  | "INVALID_CATEGORY"
  | "INVALID_SUBJECT"
  | "INVALID_MESSAGE"
  | "RATE_LIMITED"
  | "BOT_DETECTED"
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_SEND_FAILED";

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeMessage(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_MESSAGE_LENGTH);
}

function normalizeCategory(value: unknown): ContactCategory {
  if (typeof value !== "string") return "support";
  const category = value.trim().toLowerCase();
  return CONTACT_CATEGORIES.has(category) ? (category as ContactCategory) : "support";
}

function contactRateLimitPerHour() {
  const value = Number(process.env.CONTACT_RATE_LIMIT_PER_HOUR ?? DEFAULT_CONTACT_RATE_LIMIT_PER_HOUR);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_CONTACT_RATE_LIMIT_PER_HOUR;
}

function isRateLimited(ip: string) {
  if (ip === "unknown") return false;

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const recent = (ipSubmissions.get(ip) ?? []).filter((timestamp) => timestamp > oneHourAgo);

  if (recent.length >= contactRateLimitPerHour()) {
    ipSubmissions.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipSubmissions.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderOwnerEmail(input: {
  name: string;
  email: string;
  category: ContactCategory;
  subject: string;
  message: string;
  ip: string;
  userAgentValue: string;
}) {
  const messageHtml = escapeHtml(input.message).replace(/\n/g, "<br />");
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17130f">
      <h2>New AI Tattoo Generator contact request</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Category:</strong> ${escapeHtml(input.category)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
      <hr />
      <p>${messageHtml}</p>
      <hr />
      <p style="color:#7c6c5b;font-size:13px">IP: ${escapeHtml(input.ip)}<br />User-Agent: ${escapeHtml(input.userAgentValue)}</p>
    </div>
  `;
}

function renderAutoReplyEmail(name: string) {
  const safeName = escapeHtml(name);
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17130f">
      <h2>We received your message</h2>
      <p>Hi ${safeName},</p>
      <p>Thanks for contacting AI Tattoo Generator. We received your message and our team will review it soon.</p>
      <p>For account, billing, or generation issues, please reply to this email with any extra context such as your account email, order time, or generation prompt.</p>
      <p>— AI Tattoo Generator Support</p>
    </div>
  `;
}

async function sendEmail(input: {
  apiKey: string;
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html
    })
  });

  const responseBody = await response.text();
  let parsed: unknown = null;

  try {
    parsed = responseBody ? JSON.parse(responseBody) : null;
  } catch {
    parsed = { raw: responseBody.slice(0, 500) };
  }

  if (!response.ok) {
    const message = isPlainRecord(parsed) && typeof parsed.message === "string" ? parsed.message : responseBody;
    throw new Error(`Resend failed ${response.status}: ${message}`);
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse<ContactErrorCode>("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return errorResponse<ContactErrorCode>("BOT_DETECTED", "Unable to submit this message.", 400);
  }

  const name = normalizeText(payload.name, MAX_NAME_LENGTH);
  const email = normalizeEmail(payload.email);
  const category = normalizeCategory(payload.category);
  const subject = normalizeText(payload.subject, MAX_SUBJECT_LENGTH);
  const message = normalizeMessage(payload.message);

  if (name.length < 2) {
    return errorResponse<ContactErrorCode>("INVALID_NAME", "Please enter your name.", 400);
  }

  if (!isValidEmail(email)) {
    return errorResponse<ContactErrorCode>("INVALID_EMAIL", "Please enter a valid email address.", 400);
  }

  if (!CONTACT_CATEGORIES.has(category)) {
    return errorResponse<ContactErrorCode>("INVALID_CATEGORY", "Please choose a valid contact category.", 400);
  }

  if (subject.length < 3) {
    return errorResponse<ContactErrorCode>("INVALID_SUBJECT", "Please enter a subject.", 400);
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return errorResponse<ContactErrorCode>("INVALID_MESSAGE", "Please enter at least 10 characters.", 400);
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return errorResponse<ContactErrorCode>("RATE_LIMITED", "Too many messages. Please try again later.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? "AI Tattoo Generator <support@aitattoogenerator.cc>";
  const supportTo = process.env.CONTACT_TO_EMAIL ?? "support@aitattoogenerator.cc";

  if (!apiKey) {
    return errorResponse<ContactErrorCode>("EMAIL_NOT_CONFIGURED", "Email delivery is not configured.", 503);
  }

  try {
    const ownerEmail = await sendEmail({
      apiKey,
      from,
      to: supportTo.split(",").map((item) => item.trim()).filter(Boolean),
      replyTo: email,
      subject: `[AI Tattoo Generator] ${category}: ${subject}`,
      html: renderOwnerEmail({
        name,
        email,
        category,
        subject,
        message,
        ip,
        userAgentValue: userAgent(request)
      })
    });

    const autoReply = await sendEmail({
      apiKey,
      from,
      to: email,
      replyTo: supportTo.split(",")[0]?.trim() || "support@aitattoogenerator.cc",
      subject: "We received your AI Tattoo Generator message",
      html: renderAutoReplyEmail(name)
    });

    const ownerEmailId = isPlainRecord(ownerEmail) && typeof ownerEmail.id === "string" ? ownerEmail.id : null;
    const autoReplyId = isPlainRecord(autoReply) && typeof autoReply.id === "string" ? autoReply.id : null;

    return jsonResponse(
      {
        success: true,
        data: {
          owner_email_id: ownerEmailId,
          auto_reply_id: autoReplyId
        }
      },
      202
    );
  } catch (error) {
    console.error("contact_email_failed", error);
    return errorResponse<ContactErrorCode>("EMAIL_SEND_FAILED", "Unable to send your message right now.", 502);
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Cache-Control": "no-store"
    }
  });
}
