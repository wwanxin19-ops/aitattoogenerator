import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Please sign in to view your history." } },
      { status: 401 }
    );
  }

  // Parse pagination params
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const offset = (page - 1) * limit;

  // Get generation history
  const { data: generations, error: genError, count } = await supabase
    .from("generation_requests")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (genError) {
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to fetch generation history." } },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      generations: generations || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        total_pages: Math.ceil((count || 0) / limit),
      },
    },
  });
}
