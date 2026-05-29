import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://aitattoogenerator.cc/api/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json(
          { success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } },
          { status: 401 }
        );
      }
      throw new Error(`Backend returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to fetch user info." } },
      { status: 500 }
    );
  }
}
