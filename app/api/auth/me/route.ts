import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.json(
      { success: false, error: "No session" },
      { status: 401 }
    );
  }

  try {
    const workerRes = await fetch(
      "https://aitattoogenerator.wwanxin19.workers.dev/api/auth/me",
      {
        headers: {
          Cookie: `session=${sessionCookie}`,
        },
      }
    );

    if (!workerRes.ok) {
      return NextResponse.json(
        { success: false, error: "Invalid session" },
        { status: 401 }
      );
    }

    const data = await workerRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Auth me error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
