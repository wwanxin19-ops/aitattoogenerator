import { NextRequest, NextResponse } from "next/server";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_USER_AGENT_LENGTH = 512;
export const MAX_METADATA_BYTES = 4096;

export type ApiErrorResponse<TCode extends string> = {
  success: false;
  error: {
    code: TCode;
    message: string;
  };
};

export function jsonResponse<TBody>(body: TBody, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

export function errorResponse<TCode extends string>(code: TCode, message: string, status: number) {
  return jsonResponse<ApiErrorResponse<TCode>>({ success: false, error: { code, message } }, status);
}

export function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email);
}

export function clientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function userAgent(request: NextRequest) {
  return (request.headers.get("user-agent") ?? "unknown").slice(0, MAX_USER_AGENT_LENGTH);
}

export function supabaseHeaders() {
  const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    apikey: apiKey ?? "",
    Authorization: `Bearer ${apiKey ?? ""}`,
    "Content-Type": "application/json"
  };
}

export function supabaseTableUrl(table: string, path = "") {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return `${supabaseUrl}/rest/v1/${table}${path}`;
}

export function readPositiveIntEnv(name: string, fallback: number) {
  const value = Number(process.env[name] ?? fallback);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export async function countRecentRowsByIp(table: string, ip: string, hours = 1) {
  if (ip === "unknown") return 0;

  const tableUrl = supabaseTableUrl(table);
  if (!tableUrl) throw new Error("Missing Supabase configuration");

  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  const url = new URL(tableUrl);
  url.searchParams.set("ip", `eq.${ip}`);
  url.searchParams.set("created_at", `gte.${since}`);
  url.searchParams.set("select", "id");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...supabaseHeaders(),
      Prefer: "count=exact"
    },
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`Rate limit query failed: ${response.status}`);

  const contentRange = response.headers.get("content-range");
  return Number(contentRange?.split("/")[1] ?? 0);
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function sanitizeMetadata(value: unknown) {
  if (!isPlainRecord(value)) return {};
  const serialized = JSON.stringify(value);
  if (serialized.length > MAX_METADATA_BYTES) {
    return { truncated: true };
  }
  return value;
}
