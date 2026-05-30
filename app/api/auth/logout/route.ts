import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, data: { message: "Logged out" } });
  
  // Clear the auth_token cookie
  response.cookies.set("auth_token", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
  });
  
  // Also clear oauth_state if present
  response.cookies.set("oauth_state", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
  });
  
  return response;
}
