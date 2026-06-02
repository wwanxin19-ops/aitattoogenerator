import { NextRequest, NextResponse } from "next/server";
import { WORKER_ORIGIN } from "@/lib/worker-proxy";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${WORKER_ORIGIN}/api/usage`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });

    if (res.status === 401) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Please sign in to check your credits." } },
        { status: 401 }
      );
    }

    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`);
    }

    const data = await res.json();
    
    if (data.success && data.data) {
      return NextResponse.json({
        success: true,
        data: {
          credits_remaining: data.data.credits?.total ?? 0,
          plan_type: "free",
          credits_reset_at: null,
          today_generations: data.data.recent_generations?.length ?? 0,
          daily_limit: 3,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Credits error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to fetch credits." } },
      { status: 500 }
    );
  }
}
