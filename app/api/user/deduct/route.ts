import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Please sign in to generate tattoos." } },
      { status: 401 }
    );
  }

  // Reset daily credits if needed
  await supabase.rpc("reset_daily_credits");

  // Parse request body
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const { prompt, style, placement, size, color_mode, metadata } = payload;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_PROMPT", message: "Please describe the tattoo you want to generate." } },
      { status: 400 }
    );
  }

  // Deduct credits using database function
  const { data: deductSuccess, error: deductError } = await supabase.rpc(
    "deduct_generation_credits",
    { p_user_id: user.id, p_credits: 1 }
  );

  if (deductError || !deductSuccess) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INSUFFICIENT_CREDITS",
          message: "You've run out of credits. Upgrade to Pro for more generations.",
          upgrade_url: "/pricing",
        },
      },
      { status: 402 }
    );
  }

  // Create generation request record
  const { data: generation, error: genError } = await supabase
    .from("generation_requests")
    .insert({
      user_id: user.id,
      prompt: prompt.trim().slice(0, 1200),
      style: style?.slice(0, 120) || null,
      placement: placement?.slice(0, 120) || null,
      size: size?.slice(0, 120) || null,
      color_mode: color_mode?.slice(0, 120) || null,
      status: "pending",
      credits_used: 1,
      metadata: metadata || {},
    })
    .select()
    .single();

  if (genError || !generation) {
    // Refund credits if generation record creation failed
    await supabase.rpc("add_credits", {
      p_user_id: user.id,
      p_amount: 1,
      p_type: "refund",
      p_description: "Failed to create generation request",
    });

    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Unable to start generation. Credits refunded." } },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      request_id: generation.id,
      status: "pending",
      credits_remaining: null, // Will be fetched by client
      message: "Generation started. Credits deducted.",
    },
  });
}
