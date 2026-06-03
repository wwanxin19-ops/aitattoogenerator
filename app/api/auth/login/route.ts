import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  // Auth login endpoint - v2
  const clientId = "442054920982-vnhs59dbe9i8qmgr015i8g6f0ir5e773.apps.googleusercontent.com";
  const redirectUri = "https://aitattoogenerator.cc/api/auth/callback";
  const scope = "openid email profile";

  // Generate random state
  const state = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url.toString());

  // Set state cookie
  response.cookies.set("oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600, // 10 minutes
  });

  return response;
}
