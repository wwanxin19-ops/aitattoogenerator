import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
  });

  response.cookies.set("oauth_state", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
}
