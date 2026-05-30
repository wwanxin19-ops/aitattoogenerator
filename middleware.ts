import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle redirects
  if (pathname === "/generate") {
    return NextResponse.redirect(new URL("/ai-tattoo-generator", request.url), 308);
  }
  if (pathname === "/gallery") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }
  if (pathname === "/about") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }
  
  // Default: pass through
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
