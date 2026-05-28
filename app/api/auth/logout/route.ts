import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { success: false, error: { code: "LOGOUT_FAILED", message: error.message } },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: { message: "Logged out successfully" } });
}
