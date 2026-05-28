import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // 检查环境变量
  const envCheck = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "MISSING",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + "..."
      : "MISSING",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "SET (hidden)"
      : "MISSING",
  };

  // 测试 Supabase 连接
  let connectionTest;
  try {
    const { data, error } = await supabase.auth.getSession();
    connectionTest = {
      success: !error,
      error: error ? error.message : null,
      hasSession: !!data.session,
    };
  } catch (e: unknown) {
    connectionTest = {
      success: false,
      error: e instanceof Error ? e.message : String(e),
      hasSession: false,
    };
  }

  // 获取最近的 auth 日志（如果有）
  let recentLogs = [];
  try {
    const { data } = await supabase
      .from("auth_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    recentLogs = data || [];
  } catch {
    // auth_logs 表可能不存在
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: envCheck,
    connectionTest,
    recentLogs,
    headers: {
      host: request.headers.get("host"),
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
    },
  });
}
// trigger redeploy 1779969073
