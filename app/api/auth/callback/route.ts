import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?error=missing_params", request.url));
  }

  // Verify state
  const storedState = request.cookies.get("oauth_state")?.value;
  if (state !== storedState) {
    return NextResponse.redirect(new URL("/?error=invalid_state", request.url));
  }

  try {
    // Exchange code for token with Worker
    const workerUrl = "https://aitattoogenerator.wwanxin19.workers.dev/api/auth/callback";
    const response = await fetch(`${workerUrl}?code=${code}&state=${state}`, {
      headers: {
        Cookie: `oauth_state=${state}`,
      },
    });

    // Get the redirect location and cookies from Worker
    const location = response.headers.get("location");
    const setCookie = response.headers.get("set-cookie");

    if (location?.includes("error=")) {
      return NextResponse.redirect(new URL(location, request.url));
    }

    // Create response with redirect to dashboard
    const redirectResponse = NextResponse.redirect(new URL("/dashboard", request.url));

    // Forward the session cookie from Worker
    if (setCookie) {
      // Parse and set the session cookie
      const sessionMatch = setCookie.match(/session=([^;]+)/);
      if (sessionMatch) {
        redirectResponse.cookies.set("session", decodeURIComponent(sessionMatch[1]), {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 604800, // 7 days
        });
      }

      // Clear oauth_state cookie
      redirectResponse.cookies.set("oauth_state", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
      });
    }

    return redirectResponse;
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(
      new URL(`/?error=auth_failed&details=${encodeURIComponent((err as Error).message)}`, request.url)
    );
  }
}
