import { NextRequest, NextResponse } from "next/server";
import { errorResponse, jsonResponse, sanitizeMetadata } from "@/lib/api-utils";

const MAX_PROMPT_LENGTH = 1200;
const MAX_OPTION_LENGTH = 120;

type GeneratePayload = {
  prompt?: unknown;
  style?: unknown;
  placement?: unknown;
  size?: unknown;
  color_mode?: unknown;
  metadata?: unknown;
};

type GenerateErrorCode = "INVALID_JSON" | "INVALID_PROMPT" | "INVALID_FIELD" | "SERVER_ERROR";

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (!text) return undefined;
  return text.slice(0, maxLength);
}

function validateOptionalField(name: string, value: unknown) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return `${name} must be a string.`;
  if (value.length > MAX_OPTION_LENGTH) return `${name} is too long.`;
  return null;
}

export async function POST(request: NextRequest) {
  let payload: GeneratePayload;

  try {
    payload = (await request.json()) as GeneratePayload;
  } catch {
    return errorResponse<GenerateErrorCode>("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  const prompt = normalizeText(payload.prompt, MAX_PROMPT_LENGTH);
  if (!prompt || prompt.length < 3) {
    return errorResponse<GenerateErrorCode>("INVALID_PROMPT", "Please describe the tattoo you want to generate.", 400);
  }

  for (const [name, value] of [
    ["style", payload.style],
    ["placement", payload.placement],
    ["size", payload.size],
    ["color_mode", payload.color_mode]
  ] as const) {
    const error = validateOptionalField(name, value);
    if (error) return errorResponse<GenerateErrorCode>("INVALID_FIELD", error, 400);
  }

  const requestId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  try {
    return jsonResponse(
      {
        success: true,
        data: {
          request_id: requestId,
          status: "mocked",
          message: "Mock generator accepted. Real AI generation is not connected yet.",
          created_at: createdAt,
          input: {
            prompt,
            style: normalizeText(payload.style, MAX_OPTION_LENGTH) ?? null,
            placement: normalizeText(payload.placement, MAX_OPTION_LENGTH) ?? null,
            size: normalizeText(payload.size, MAX_OPTION_LENGTH) ?? null,
            color_mode: normalizeText(payload.color_mode, MAX_OPTION_LENGTH) ?? null,
            metadata: sanitizeMetadata(payload.metadata)
          },
          result: {
            image_url: null,
            preview_text: `Mock tattoo concept for: ${prompt}`
          }
        }
      },
      202
    );
  } catch (error) {
    console.error("mock_generate_failed", error);
    return errorResponse<GenerateErrorCode>("SERVER_ERROR", "Unable to submit generator request right now.", 500);
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
