import { NextRequest, NextResponse } from "next/server";

const SOURCES = new Set(["pro", "studio"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_RATE_LIMIT_PER_HOUR = 5;
const MAX_EMAIL_LENGTH = 254;
const MAX_USER_AGENT_LENGTH = 512;

type WaitlistSource = "pro" | "studio";

type WaitlistPayload = {
  email?: unknown;
  source?: unknown;
};

type SuccessResponse = {
  success: true;
  data: {
    email: string;
    source: WaitlistSource;
    created_at: string;
  };
};

type ErrorCode =
  | "INVALID_JSON"
  | "INVALID_EMAIL"
  | "INVALID_SOURCE"
  | "RATE_LIMITED"
  | "ALREADY_JOINED"
  | "CONFIG_ERROR"
  | "SERVER_ERROR";

type ErrorResponse = {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
  };
};

function jsonResponse(body: SuccessResponse | ErrorResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function errorResponse(code: ErrorCode, message: string, status: number) {
  return jsonResponse({ success: false, error: { code, message } }, status);
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return email.length > 0 && email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email);
}

function normalizeSource(value: unknown): WaitlistSource | null {
  if (typeof value !== "string") return null;
  const source = value.trim().toLowerCase();
  return SOURCES.has(source) ? (source as WaitlistSource) : null;
}

function clientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function userAgent(request: NextRequest) {
  return (request.headers.get("user-agent") ?? "unknown").slice(0, MAX_USER_AGENT_LENGTH);
}

function supabaseHeaders() {
  const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    apikey: apiKey ?? "",
    Authorization: `Bearer ${apiKey ?? ""}`,
    "Content-Type": "application/json"
  };
}

function supabaseTableUrl(path = "") {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return `${supabaseUrl}/rest/v1/waitlist_signups${path}`;
}

function rateLimitPerHour() {
  const value = Number(process.env.WAITLIST_RATE_LIMIT_PER_HOUR ?? DEFAULT_RATE_LIMIT_PER_HOUR);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_RATE_LIMIT_PER_HOUR;
}

async function countRecentSubmissions(ip: string) {
  if (ip === "unknown") return 0;

  const tableUrl = supabaseTableUrl();
  if (!tableUrl) throw new Error("Missing Supabase configuration");

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
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

async function hasExistingSignup(email: string, source: WaitlistSource) {
  const tableUrl = supabaseTableUrl();
  if (!tableUrl) throw new Error("Missing Supabase configuration");

  const url = new URL(tableUrl);
  url.searchParams.set("email", `eq.${email}`);
  url.searchParams.set("source", `eq.${source}`);
  url.searchParams.set("select", "id");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    method: "GET",
    headers: supabaseHeaders(),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`Duplicate query failed: ${response.status}`);

  const rows = (await response.json()) as unknown[];
  return rows.length > 0;
}

async function insertSignup(email: string, source: WaitlistSource, request: NextRequest) {
  const tableUrl = supabaseTableUrl("?select=email,source,created_at");
  if (!tableUrl) throw new Error("Missing Supabase configuration");

  const response = await fetch(tableUrl, {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      email,
      source,
      ip: clientIp(request),
      user_agent: userAgent(request)
    })
  });

  if (response.status === 409) {
    return null;
  }

  if (!response.ok) throw new Error(`Insert failed: ${response.status}`);

  const [row] = (await response.json()) as Array<{
    email: string;
    source: WaitlistSource;
    created_at: string;
  }>;

  return row;
}

export async function POST(request: NextRequest) {
  let payload: WaitlistPayload;

  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return errorResponse("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const email = normalizeEmail(payload.email);
  const source = normalizeSource(payload.source);

  if (!isValidEmail(email)) {
    return errorResponse("INVALID_EMAIL", "Please enter a valid email address.", 400);
  }

  if (!source) {
    return errorResponse("INVALID_SOURCE", "source must be either pro or studio.", 400);
  }

  if (!supabaseTableUrl()) {
    return errorResponse("CONFIG_ERROR", "Waitlist storage is not configured.", 500);
  }

  try {
    const recentSubmissionCount = await countRecentSubmissions(clientIp(request));
    if (recentSubmissionCount >= rateLimitPerHour()) {
      return errorResponse("RATE_LIMITED", "Too many submissions. Please try again later.", 429);
    }

    if (await hasExistingSignup(email, source)) {
      return errorResponse("ALREADY_JOINED", "This email is already on this waitlist.", 409);
    }

    const row = await insertSignup(email, source, request);
    if (!row) {
      return errorResponse("ALREADY_JOINED", "This email is already on this waitlist.", 409);
    }

    return jsonResponse(
      {
        success: true,
        data: {
          email: row.email,
          source: row.source,
          created_at: row.created_at
        }
      },
      201
    );
  } catch (error) {
    console.error("waitlist_submit_failed", error);
    return errorResponse("SERVER_ERROR", "Unable to join waitlist right now.", 500);
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
