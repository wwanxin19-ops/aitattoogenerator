import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Please sign in to check your credits." } },
      { status: 401 }
    );
  }

  // Reset daily credits if needed
  await supabase.rpc("reset_daily_credits");

  // Get user profile with credits
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("credits_remaining, plan_type, credits_reset_at")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { success: false, error: { code: "PROFILE_NOT_FOUND", message: "User profile not found." } },
      { status: 404 }
    );
  }

  // Get today's generation count
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count: todayGenerations, error: countError } = await supabase
    .from("generation_requests")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", today.toISOString());

  return NextResponse.json({
    success: true,
    data: {
      credits_remaining: profile.credits_remaining,
      plan_type: profile.plan_type,
      credits_reset_at: profile.credits_reset_at,
      today_generations: countError ? 0 : (todayGenerations ?? 0),
      daily_limit: profile.plan_type === "free" ? 10 : 100,
    },
  });
}
