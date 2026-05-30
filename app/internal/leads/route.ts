import { NextRequest, NextResponse } from "next/server";
import {
  clientIp,
  countRecentRowsByIp,
  errorResponse,
  isValidEmail,
  jsonResponse,
  normalizeEmail,
  readPositiveIntEnv,
  supabaseHeaders,
  supabaseTableUrl,
  userAgent
} from "@/lib/api-utils";

const LEAD_SOURCES = new Set(["pro", "studio"]);
const DEFAULT_LEADS_RATE_LIMIT_PER_HOUR = 5;

type LeadSource = "pro" | "studio";

type LeadsPayload = {
  email?: unknown;
  source?: unknown;
};

type LeadsErrorCode =
  | "INVALID_JSON"
  | "INVALID_EMAIL"
  | "INVALID_SOURCE"
  | "RATE_LIMITED"
  | "ALREADY_JOINED"
  | "CONFIG_ERROR"
  | "SERVER_ERROR";

function normalizeSource(value: unknown): LeadSource | null {
  if (typeof value !== "string") return null;
  const source = value.trim().toLowerCase();
  return LEAD_SOURCES.has(source) ? (source as LeadSource) : null;
}

function leadsRateLimitPerHour() {
  return readPositiveIntEnv("LEADS_RATE_LIMIT_PER_HOUR", DEFAULT_LEADS_RATE_LIMIT_PER_HOUR);
}

async function hasExistingLead(email: string, source: LeadSource) {
  const tableUrl = supabaseTableUrl("leads");
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

async function insertLead(email: string, source: LeadSource, request: NextRequest) {
  const tableUrl = supabaseTableUrl("leads", "?select=id,email,source,created_at");
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

  if (response.status === 409) return null;
  if (!response.ok) throw new Error(`Insert failed: ${response.status}`);

  const [row] = (await response.json()) as Array<{
    id: string;
    email: string;
    source: LeadSource;
    created_at: string;
  }>;

  return row;
}

export async function POST(request: NextRequest) {
  let payload: LeadsPayload;

  try {
    payload = (await request.json()) as LeadsPayload;
  } catch {
    return errorResponse<LeadsErrorCode>("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const email = normalizeEmail(payload.email);
  const source = normalizeSource(payload.source);

  if (!isValidEmail(email)) {
    return errorResponse<LeadsErrorCode>("INVALID_EMAIL", "Please enter a valid email address.", 400);
  }

  if (!source) {
    return errorResponse<LeadsErrorCode>("INVALID_SOURCE", "source must be either pro or studio.", 400);
  }

  if (!supabaseTableUrl("leads")) {
    return errorResponse<LeadsErrorCode>("CONFIG_ERROR", "Lead storage is not configured.", 500);
  }

  try {
    const recentSubmissionCount = await countRecentRowsByIp("leads", clientIp(request));
    if (recentSubmissionCount >= leadsRateLimitPerHour()) {
      return errorResponse<LeadsErrorCode>("RATE_LIMITED", "Too many submissions. Please try again later.", 429);
    }

    if (await hasExistingLead(email, source)) {
      return errorResponse<LeadsErrorCode>("ALREADY_JOINED", "This email is already on this list.", 409);
    }

    const row = await insertLead(email, source, request);
    if (!row) {
      return errorResponse<LeadsErrorCode>("ALREADY_JOINED", "This email is already on this list.", 409);
    }

    return jsonResponse(
      {
        success: true,
        data: {
          id: row.id,
          email: row.email,
          source: row.source,
          created_at: row.created_at
        }
      },
      201
    );
  } catch (error) {
    console.error("lead_submit_failed", error);
    return errorResponse<LeadsErrorCode>("SERVER_ERROR", "Unable to save lead right now.", 500);
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
