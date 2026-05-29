import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Simplified: JWT Cookie auth handled by backend Workers
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
