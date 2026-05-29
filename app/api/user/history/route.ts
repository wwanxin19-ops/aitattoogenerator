import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("https://aitattoogenerator.cc/api/usage", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Please sign in to view your history." } },
        { status: 401 }
      );
    }

    if (!res.ok) {
      throw new Error(`Backend returned ${res.status}`);
    }

    const data = await res.json();
    
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    
    const allGenerations = data.data?.recent_generations || [];
    const total = allGenerations.length;
    const offset = (page - 1) * limit;
    const paginated = allGenerations.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        generations: paginated,
        pagination: {
          page,
          limit,
          total,
          total_pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("History error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to fetch generation history." } },
      { status: 500 }
    );
  }
}
