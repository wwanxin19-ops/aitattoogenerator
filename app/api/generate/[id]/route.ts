import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Forward to backend Worker
    const res = await fetch(`https://aitattoogenerator.cc/api/generate/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Cookie": request.headers.get("cookie") || "",
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { success: false, error: error.error || `HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch generation status" },
      { status: 500 }
    );
  }
}
