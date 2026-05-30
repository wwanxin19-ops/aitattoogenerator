import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, data: { message: "Logged out" } });
  
  // Clear the auth_token cookie using headers (more reliable)
  const cookieOptions = "Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  response.headers.set("Set-Cookie", `auth_token=; ${cookieOptions}`);
  response.headers.append("Set-Cookie", `oauth_state=; ${cookieOptions}`);
  
  return response;
}
