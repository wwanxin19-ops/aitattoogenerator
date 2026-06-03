import { NextRequest, NextResponse } from "next/server";
import {
  clientIp,
  countRecentRowsByIp,
  errorResponse,
  jsonResponse,
  readPositiveIntEnv,
  sanitizeMetadata,
  supabaseHeaders,
  supabaseTableUrl,
  userAgent
} from "@/lib/api-utils";

export const runtime = 'edge';

const EVENT_NAMES = new Set(["cta_click", "email_submit", "pricing_click", "generator_use"]);
const DEFAULT_EVENTS_RATE_LIMIT_PER_HOUR = 120;
const MAX_TEXT_LENGTH = 200;

type EventName = "cta_click" | "email_submit" | "pricing_click" | "generator_use";

type EventsPayload = {
  event?: unknown;
  source?: unknown;
  page?: unknown;
  metadata?: unknown;
};

type EventsErrorCode = "INVALID_JSON" | "INVALID_EVENT" | "RATE_LIMITED" | "CONFIG_ERROR" | "SERVER_ERROR";

function normalizeEvent(value: unknown): EventName | null {
  if (typeof value !== "string") return null;
  const event = value.trim().toLowerCase();
  return EVENT_NAMES.has(event) ? (event as EventName) : null;
}

function normalizeOptionalText(value: unknown) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text ? text.slice(0, MAX_TEXT_LENGTH) : null;
}

function eventsRateLimitPerHour() {
  return readPositiveIntEnv("EVENTS_RATE_LIMIT_PER_HOUR", DEFAULT_EVENTS_RATE_LIMIT_PER_HOUR);
}

async function insertEvent(payload: EventsPayload, event: EventName, request: NextRequest) {
  const tableUrl = supabaseTableUrl("analytics_events", "?select=id,event,created_at");
  if (!tableUrl) throw new Error("Missing Supabase configuration");

  const response = await fetch(tableUrl, {
    method: "POST",
    headers: {
      ...supabaseHeaders(),
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      event,
      source: normalizeOptionalText(payload.source),
      page: normalizeOptionalText(payload.page),
      metadata: sanitizeMetadata(payload.metadata),
      ip: clientIp(request),
      user_agent: userAgent(request)
    })
  });

  if (!response.ok) throw new Error(`Insert failed: ${response.status}`);

  const [row] = (await response.json()) as Array<{
    id: string;
    event: EventName;
    created_at: string;
  }>;

  return row;
}

export async function POST(request: NextRequest) {
  let payload: EventsPayload;

  try {
    payload = (await request.json()) as EventsPayload;
  } catch {
    return errorResponse<EventsErrorCode>("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const event = normalizeEvent(payload.event);
  if (!event) {
    return errorResponse<EventsErrorCode>(
      "INVALID_EVENT",
      "event must be cta_click, email_submit, pricing_click, or generator_use.",
      400
    );
  }

  if (!supabaseTableUrl("analytics_events")) {
    return errorResponse<EventsErrorCode>("CONFIG_ERROR", "Event storage is not configured.", 500);
  }

  try {
    const recentEventCount = await countRecentRowsByIp("analytics_events", clientIp(request));
    if (recentEventCount >= eventsRateLimitPerHour()) {
      return errorResponse<EventsErrorCode>("RATE_LIMITED", "Too many events. Please try again later.", 429);
    }

    const row = await insertEvent(payload, event, request);

    return jsonResponse(
      {
        success: true,
        data: {
          id: row.id,
          event: row.event,
          created_at: row.created_at
        }
      },
      201
    );
  } catch (error) {
    console.error("event_track_failed", error);
    return errorResponse<EventsErrorCode>("SERVER_ERROR", "Unable to record event right now.", 500);
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
