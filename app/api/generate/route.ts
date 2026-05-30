import { NextRequest, NextResponse } from "next/server";

const MAX_PROMPT_LENGTH = 1200;

type GeneratePayload = {
  prompt?: string;
  style?: string;
  placement?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: GeneratePayload = await request.json();
    
    // Validate prompt
    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }
    
    if (body.prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Prompt too long" },
        { status: 400 }
      );
    }

    // Forward to backend Worker
    const res = await fetch("https://aitattoogenerator.cc/api/generate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cookie": request.headers.get("cookie") || "",
      },
      body: JSON.stringify({
        prompt: body.prompt,
        style: body.style,
        placement: body.placement,
      }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 202 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to queue generation" },
      { status: 500 }
    );
  }
}
