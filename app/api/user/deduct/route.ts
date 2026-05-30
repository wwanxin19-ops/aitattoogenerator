import { NextRequest, NextResponse } from "next/server";

const WORKER_URL = "https://aitattoogenerator.wwanxin19.workers.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to Worker directly
    const res = await fetch(`${WORKER_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": request.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Deduct error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to process request." } },
      { status: 500 }
    );
  }
}
