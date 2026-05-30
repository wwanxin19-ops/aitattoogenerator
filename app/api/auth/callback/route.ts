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
    // Call Worker callback - it will process Google OAuth and return session info
    // Use redirect: 'manual' to prevent fetch from following the 302 redirect
    // so we can capture the Set-Cookie header
    const workerUrl = "https://aitattoogenerator.wwanxin19.workers.dev/api/auth/callback";
    const response = await fetch(`${workerUrl}?code=${code}&state=${state}`, {
      redirect: "manual",
      headers: {
        Cookie: `oauth_state=${state}`,
      },
    });

    // Check if Worker returned error redirect
    const location = response.headers.get("location");
    if (location?.includes("error=")) {
      return NextResponse.redirect(new URL(location, request.url));
    }

    // Worker returns redirect with Set-Cookie header
    // With redirect: 'manual', we get the 302 response directly
    // We need to extract ALL cookies from the response
    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    
    // Also try to get single Set-Cookie header as fallback
    const singleCookie = response.headers.get("set-cookie");
    if (singleCookie && !setCookieHeaders.includes(singleCookie)) {
      setCookieHeaders.push(singleCookie);
    }
    
    // Create redirect response to dashboard
    const redirectResponse = NextResponse.redirect(new URL("/dashboard", request.url));

    // Forward all cookies from Worker
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      for (const cookieStr of setCookieHeaders) {
        // Parse cookie name and value
        const match = cookieStr.match(/^([^=]+)=([^;]*)/);
        if (match) {
          const [, name, value] = match;
          // Parse cookie attributes
          const httpOnly = cookieStr.toLowerCase().includes("httponly");
          const secure = cookieStr.toLowerCase().includes("secure");
          const sameSiteMatch = cookieStr.match(/samesite=([^;]+)/i);
          const sameSite = (sameSiteMatch?.[1]?.toLowerCase() as "lax" | "strict" | "none") || "lax";
          const maxAgeMatch = cookieStr.match(/max-age=([^;]+)/i);
          const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : undefined;
          
          redirectResponse.cookies.set(name, decodeURIComponent(value), {
            path: "/",
            httpOnly,
            secure,
            sameSite,
            maxAge,
          });
        }
      }
    }

    return redirectResponse;
  } catch (err) {
    console.error("Auth callback error:", err);
    return NextResponse.redirect(
      new URL(`/?error=auth_failed&details=${encodeURIComponent((err as Error).message)}`, request.url)
    );
  }
}
